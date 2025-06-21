import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

import { MeasureUnitModule } from 'src/measure-unit/measure-unit.module';
import { InventoryModule } from 'src/inventory/inventory.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), MeasureUnitModule, InventoryModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [
    ProductsService,
    TypeOrmModule.forFeature([Product])
  ]
})
export class ProductsModule { }
