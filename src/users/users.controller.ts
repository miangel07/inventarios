import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { PaginationQueryDto, StatusGeneric } from 'src/utils/TypeGeneric';
import { CreateUserStorageDto } from './dto/create-userStorage';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
@UseGuards(JwtAuthGuard, RolesGuard)

@Controller('users')
export class UserController {
  constructor(private readonly UserService: UserService) { }
  @Roles('admin', 'super_admin')
  @Post()
  async create(@Body() CreateUserDto: CreateUserDto, @Req() req: any,) {
    const Create = await this.UserService.create(CreateUserDto, req.user);
    return Create;
  }

  @Roles('admin', 'super_admin')
  @Post('createUserStorage')
  async createUserStorage(@Body() CreateUserDto: CreateUserStorageDto, @Req() req: any,) {
    const Create = await this.UserService.createUserStorage(CreateUserDto, req.user);
    return Create;
  }



  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.UserService.findAll(query);
  }

  /*   @Get(':id')
    findOne(@Param('id') id: string) {
  
  
      return this.UserService.findOne(+id);
    }
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Omit<UpdateUserDto, 'id'>) {
    const dto: UpdateUserDto = { ...body, id: +id };
    return this.UserService.update(+id, dto);
  }



  @Patch(':id/status')
  changeStatus(@Param('id') id: string, @Body('status') status: StatusGeneric) {
    return this.UserService.changeStatus(Number(id), status);
  }
}
