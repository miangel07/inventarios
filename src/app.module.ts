import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { StorageModule } from './storage/storage.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RoleModule } from './role/role.module';
import { MeasureUnitModule } from './measure-unit/measure-unit.module';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';
import { InventoryModule } from './inventory/inventory.module';
import { CompaniesModule } from './companies/companies.module';
import { LoansModule } from './loans/loans.module';
import { LoanDetailsModule } from './loan-details/loan-details.module';
import { TransfersModule } from './transfers/transfers.module';
import { TransferDetailModule } from './transfer-detail/transfer-detail.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeormConfig from './config/typeorm.config';
import KeyvRedis from '@keyv/redis';




@Module({
  imports: [CacheModule.registerAsync({
    isGlobal: true,
    useFactory: async () => {
      return {
        stores: [
          new KeyvRedis(process.env.REDIS_URL),
        ],
      };
    },
  }), UserModule,

  ConfigModule.forRoot(
    {
      isGlobal: true,
      load: [typeormConfig],//importacion de configuracion de entornos
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }
  ),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) =>
      configService.get<TypeOrmModuleOptions>('typeorm')!,
  }), StorageModule, RoleModule, MeasureUnitModule, CategoryModule, ProductsModule, InventoryModule, CompaniesModule, LoansModule, LoanDetailsModule, TransfersModule, TransferDetailModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
