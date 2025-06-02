import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageModule } from './storage/storage.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RoleModule } from './role/role.module';




@Module({
  imports: [CacheModule.register({
    isGlobal: true
  }), UserModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'miguel',
    password: '123',
    database: 'storehub',
    autoLoadEntities: true,
    synchronize: true,
  }), StorageModule, RoleModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
