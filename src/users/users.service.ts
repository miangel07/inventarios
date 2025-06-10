import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { Users } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { clearCacheByPrefix, remember } from 'src/utils/CacheStores.utils';
import { PaginationQueryDto } from 'src/utils/TypeGeneric';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly UserRepository: Repository<Users>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) { }

  async findByField(field: string, value: string): Promise<Users | null> {
    return this.UserRepository.findOne({ where: { [field]: value } });
  }


  async create(CreateUserDto: CreateUserDto) {
    const savedCat = await this.UserRepository.save({ ...CreateUserDto, createDate: new Date() });
    if (!savedCat) {
      throw new BadRequestException('Error al crear el usuario.');
    }
    await clearCacheByPrefix('users_all');
    return {
      message: "Usuario creado Correctamente",
      data: savedCat,
    };
  }
  // users.service.ts

  async findAll({ page = 1, limit = 10, search = '' }: PaginationQueryDto) {
    const skip = (page - 1) * limit;

    const [data, total] = await remember(
      this.cacheManager,
      `users_all`,
      60,
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

    await this.UserRepository.update(id, updateUserDto);
    const dataUpdate = await this.UserRepository.findOneBy({ id });

    return {
      message: 'Usuario actualizado correctamente',
      data: dataUpdate,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
