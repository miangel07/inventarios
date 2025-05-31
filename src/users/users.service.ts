import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { Users } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly UserRepository: Repository<Users>,
  ) { }
  async existsByField(field: string, value: string): Promise<boolean> {
    const user = await this.UserRepository.findOne({ where: { [field]: value } });
    return !!user;
  }

  async create(CreateUserDto: CreateUserDto) {




    const savedCat = await this.UserRepository.save({ ...CreateUserDto, createDate: new Date() });
    return savedCat
  }
  async findAll() {
    return await this.UserRepository.find();
  }

  async findOne(id: number) {
    const cat = await this.UserRepository.findOne({ where: { id } });
    if (!cat) {
      throw new BadRequestException('El gato no existe');
    }
    return await this.UserRepository.findOne({ where: { id } });
  }

  update(id: number, UpdateUserDto: UpdateUserDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
