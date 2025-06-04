import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
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
  }), StorageModule, RoleModule, MeasureUnitModule, CategoryModule, ProductsModule, InventoryModule, CompaniesModule, LoansModule, LoanDetailsModule, TransfersModule, TransferDetailModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
