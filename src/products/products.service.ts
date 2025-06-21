import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { MeasureUnitService } from 'src/measure-unit/measure-unit.service';
import { InventoryService } from 'src/inventory/inventory.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly ProducRepository: Repository<Product>,

    private readonly measureUnitService: MeasureUnitService,

    private readonly inventoryService: InventoryService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) { }

  // falta crear las categorias y la unidad de medida para poder registrar un producto
  async create(createProductDto: CreateProductDto) {
    const {
      measureUnitId,
      categoryId,
      storage,
      quantity,
      ...rest
    } = createProductDto;

    const measureUnit = await this.measureUnitService.findOne(measureUnitId);
    if (!measureUnit) {
      throw new NotFoundException('Unidad de medida no encontrada');
    }

    const newProduct = this.ProducRepository.create({
      ...rest,
      measureUnit,
      categoryId,
    });

    const savedProduct = await this.ProducRepository.save(newProduct);


    const inventory = await this.inventoryService.create({
      productId: savedProduct.id,
      storageId: storage,
      quantity: quantity,
    });

    return {
      message: 'Producto creado correctamente',
      data: savedProduct,
      Datainventory: inventory,
    };
  }


  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
