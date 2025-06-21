import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { Product } from 'src/products/entities/product.entity';
import { Storage } from 'src/storage/entities/storage.entity';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Inventory, // para @InjectRepository(Inventory)
      Product,   // para @InjectRepository(Product)
      Storage    // para @InjectRepository(Storage)
    ]),
    StorageModule
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService],
})
export class InventoryModule { }
