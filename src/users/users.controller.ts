import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { PaginationQueryDto } from 'src/utils/TypeGeneric';
@Controller('users')
export class UserController {
  constructor(private readonly UserService: UserService) { }

  @Post()
  async create(@Body() CreateUserDto: CreateUserDto) {
    const Create = await this.UserService.create(CreateUserDto);
    return Create;
  }


  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.UserService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {


    return this.UserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    updateUserDto.id = +id;
    return this.UserService.update(+id, updateUserDto);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.UserService.remove(+id);
  }
}
