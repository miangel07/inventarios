import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { MeasureUnitService } from 'src/measure-unit/measure-unit.service';
import { InventoryService } from 'src/inventory/inventory.service';
import { clearCacheByPrefix, remember } from 'src/utils/CacheStores.utils';
import { PaginationQueryDto, paramsQueryDto } from 'src/utils/TypeGeneric';

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
  async create(createProductDto: CreateProductDto, user: paramsQueryDto) {
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

    const storageId = user?.role === 'admin' ? storage : user.storageId;

    if (typeof storageId !== 'number') {
      throw new BadRequestException('No se pudo determinar la bodega (storageId)');
    }

    const inventory = await this.inventoryService.create({
      productId: savedProduct.id,
      storageId,
      quantity,
    });
    await clearCacheByPrefix('products_all_');
    return {
      message: 'Producto creado correctamente',
      data: savedProduct,
      Datainventory: inventory,
    };
  }


  async findAll(
    { page = 1, limit = 10, search = '' }: PaginationQueryDto,
    user: { storageId: number },
  ) {
    const skip = (page - 1) * limit;
    const searchTerm = `%${search.toLowerCase()}%`;

    const cacheKey = `products_all_${user.storageId}_${page}_${limit}_${search.toLowerCase()}`;

    const { entities, raw, total } = await remember(
      this.cacheManager,
      cacheKey,
      60 * 60 * 24 * 7,
      async () => {
        const baseQuery = this.ProducRepository.createQueryBuilder('product')
          .innerJoin('product.inventories', 'inventory', 'inventory.storageId = :storageId', {
            storageId: user.storageId,
          })
          .leftJoinAndSelect('product.category', 'category')
          .leftJoinAndSelect('product.measureUnit', 'measureUnit')
          .addSelect('inventory.quantity', 'inventory_quantity')
          .where(
            `(LOWER(product.nameProduct) LIKE :search
          OR LOWER(product.description) LIKE :search
          OR LOWER(product.internalCode) LIKE :search
          OR LOWER(category.NameCategory) LIKE :search
          OR LOWER(measureUnit.nameUnit) LIKE :search)`,
            { search: searchTerm }
          );

        const total = await baseQuery.clone().getCount();

        const result = await baseQuery
          .skip(skip)
          .take(limit)
          .orderBy('product.id', 'ASC')
          .getRawAndEntities();

        return {
          entities: result.entities,
          raw: result.raw,
          total,
        };
      },
    );

    const cleanData = entities.map((product, index) => ({
      ...product,
      quantity: raw[index]?.inventory_quantity ?? 0,
    }));

    return {
      message:
        cleanData.length > 0
          ? 'Productos listados correctamente'
          : 'No hay productos registrados para esta bodega',
      data: cleanData,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    };
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
