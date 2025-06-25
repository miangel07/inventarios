import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { Users } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import * as bcrypt from 'bcrypt';
import { clearCacheByPrefix, remember } from 'src/utils/CacheStores.utils';
import { PaginationQueryDto, StatusGeneric } from 'src/utils/TypeGeneric';
import { Role } from 'src/role/entities/role.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly UserRepository: Repository<Users>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) { }

  async findByField(field: string, value: string): Promise<Users | null> {
    return this.UserRepository.findOne({ where: { [field]: value } });
  }


  async create(CreateUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(CreateUserDto.password, 10);
    const role = await this.roleRepository.findOneBy({ id: CreateUserDto.Rol });

    if (!role) {
      throw new NotFoundException('Rol no encontrado');
    }
    const savedUsers = await this.UserRepository.save({
      ...CreateUserDto,
      Rol: role,

      password: hashedPassword,
      createDate: new Date(),
    });

    if (!savedUsers) {
      throw new BadRequestException('Error al crear el usuario.');
    }

    await clearCacheByPrefix('users_all_');
    return {
      message: 'Usuario creado Correctamente',
      data: savedUsers,
    };
  }


  async findAll({ page = 1, limit = 10, search = '' }: PaginationQueryDto) {
    const skip = (page - 1) * limit;

    const [data, total] = await remember(
      this.cacheManager,
      `users_all_${page}_${limit}_${search.toLowerCase()}`,
      60 * 60 * 24 * 7,
      async () => {
        const query = this.UserRepository.createQueryBuilder('user');

        if (search) {
          query.where(
            `LOWER(user.username) LIKE :search
     OR LOWER(user.lastname) LIKE :search
     OR LOWER(user.email) LIKE :search
     OR LOWER(user.address) LIKE :search
     OR LOWER(user.Status) LIKE :search
     OR LOWER(user.typeDocument) LIKE :search
     OR CAST(user.phone AS CHAR) LIKE :search
     OR CAST(user.identificationNumber AS CHAR) LIKE :search`,
            { search: `%${search.toLowerCase()}%` },
          );
        }

        query.skip(skip).take(limit).orderBy('user.id', 'ASC');

        return query.getManyAndCount();
      },
    );

    return {
      message: 'Usuarios listados correctamente',
      data,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    };
  }


  async findByUsername(email: string) {
   
    return this.UserRepository.findOne({
      where: { email: email },
      relations: ['managedStorages', 'Rol'],
    });
  }



  async findOne(id: number) {
    const user = await this.UserRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('El usuario no existe');
    }

    return await this.UserRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.UserRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    const { Rol, ...rest } = updateUserDto;

    let dataToUpdate: any = { ...rest };

    if (Rol !== undefined) {
      const roleEntity = await this.roleRepository.findOneBy({ id: Rol });
      if (!roleEntity) {
        throw new NotFoundException(`Rol con id ${Rol} no encontrado`);
      }
      dataToUpdate.Rol = roleEntity;
    }

    await this.UserRepository.update(id, dataToUpdate);

    const dataUpdate = await this.UserRepository.findOne({
      where: { id },
      relations: ['Rol'],
    });

    await clearCacheByPrefix('users_all');

    return {
      message: 'Usuario actualizado correctamente',
      data: dataUpdate,
    };
  }


  async changeStatus(id: number, status: StatusGeneric) {
    const user = await this.UserRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    user.Status = status;
    await this.UserRepository.save(user);
    await clearCacheByPrefix('users_all');
    return { message: `Estado del usuario actualizado a ${status}` };
  }
}
