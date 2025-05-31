import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageModule } from './storage/storage.module';


@Module({
  imports: [UserModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'miguel',
    password: '123',
    database: 'storehub',
    autoLoadEntities: true,
    synchronize: true,
  }), StorageModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
