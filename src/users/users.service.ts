import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { Users } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { remember } from 'src/utils/CacheStores.utils';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly UserRepository: Repository<Users>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }
  async findByField(field: string, value: any): Promise<Users | null> {
    return this.UserRepository.findOne({ where: { [field]: value } });
  }


  async create(CreateUserDto: CreateUserDto) {
    const savedCat = await this.UserRepository.save({ ...CreateUserDto, createDate: new Date() });
    if (!savedCat) {
      throw new BadRequestException('Error al crear el usuario.');
    }
    this.cacheManager.del('users_all')
    return {
      message: "Usuario creado Correctamente",
      data: savedCat,
    };
  }
  async findAll() {
    const data = await remember(this.cacheManager, 'users_all', 60, async () => {
      return this.UserRepository.find();
    });

    return {
      message: 'Usuarios listados correctamente',
      data,
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
