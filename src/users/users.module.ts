import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])], // importa la entidad para el typeOrm 
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
