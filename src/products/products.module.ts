import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

import { MeasureUnitModule } from 'src/measure-unit/measure-unit.module';
import { InventoryModule } from 'src/inventory/inventory.module';
import { BusinessModule } from 'src/business/business.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), MeasureUnitModule, InventoryModule, BusinessModule, CategoryModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [
    ProductsService,
    TypeOrmModule.forFeature([Product])
  ]
})
export class ProductsModule { }
