import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
@Controller('users')
export class UserController {
  constructor(private readonly catsService: UserService) { }

  @Post()
  async create(@Body() CreateUserDto: CreateUserDto) {
    const Create =  await this.catsService.create(CreateUserDto);
    
      return {
      message: "Usuario creado Correctamente",
      data: Create,
    };
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    

    return this.catsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto) {
    return this.catsService.update(+id, UpdateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }
}
