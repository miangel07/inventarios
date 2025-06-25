import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { StatusGeneric } from 'src/utils/TypeGeneric';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) { }
  create(createRoleDto: CreateRoleDto) {
    const role = this.roleRepository.create({
      nameRol: createRoleDto.nameRol,
      Status: StatusGeneric.active,
    });
    return this.roleRepository.save(role);
  }
  async findByName(nameRol: string): Promise<Role | null> {
    return this.roleRepository.findOne({ where: { nameRol } });
  }

  findAll() {
    return `This action returns all role`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
