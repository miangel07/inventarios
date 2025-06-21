import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Product } from 'src/products/entities/product.entity';
import { Storage } from 'src/storage/entities/storage.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly InventoriRepository: Repository<Inventory>,
    @InjectRepository(Storage)
    private readonly storageRepository: Repository<Storage>,
    @InjectRepository(Product)
    private readonly ProducRepository: Repository<Product>,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) { }
  async create(createInventoryDto: CreateInventoryDto): Promise<Inventory | boolean> {
    const { productId, storageId, quantity } = createInventoryDto;

    // Verifica si el producto existe
    const product = await this.ProducRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${productId} no encontrado`);
    }

    // Verifica si la bodega (storage) existe
    const storage = await this.storageRepository.findOne({ where: { id: storageId } });
    if (!storage) {
      throw new NotFoundException(`Bodega con ID ${storageId} no encontrada`);
    }

    // Crea el inventario
    const inventory = this.InventoriRepository.save({
      quantity,
      product: { id: product.id },
      storage: { id: storage.id },
    });

    if (inventory) {

      return inventory;
    }
    return false;
  }


  findAll() {
    return `This action returns all inventory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inventory`;
  }

  update(id: number, updateInventoryDto: UpdateInventoryDto) {
    return `This action updates a #${id} inventory`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventory`;
  }
}
