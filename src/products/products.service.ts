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
import { BusinessService } from 'src/business/business.service';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly ProducRepository: Repository<Product>,

    private readonly measureUnitService: MeasureUnitService,
    private readonly businessUnitService: BusinessService,
    private readonly categoryService: CategoryService,
    private readonly inventoryService: InventoryService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) { }

  // falta crear las categorias y la unidad de medida para poder registrar un producto
  async create(createProductDto: CreateProductDto, user: paramsQueryDto) {
    const {
      measureUnitId,
      categoryId,
      businessId,
      storage,
      quantity,
      ...rest
    } = createProductDto;

    // Validar existencia de relaciones
    const measureUnit = await this.measureUnitService.findOne(measureUnitId);
    if (!measureUnit) {
      throw new NotFoundException('Unidad de medida no encontrada');
    }

    const category = await this.categoryService.findOne(categoryId);
    if (!category) {
      throw new NotFoundException('Categoría no encontrada');
    }

    const business = await this.businessUnitService.findOne(businessId);
    if (!business) {
      throw new NotFoundException('Empresa no encontrada');
    }

    // Determinar la bodega
    const storageId = user?.role === 'admin' ? storage : user.storageId;
    if (typeof storageId !== 'number') {
      throw new BadRequestException('No se pudo determinar la bodega (storageId)');
    }

    // Crear el producto
    const newProduct = this.ProducRepository.create({
      ...rest,
      measureUnitId,
      categoryId,
      businessId,
    });

    const savedProduct = await this.ProducRepository.save(newProduct);

    // Crear entrada en inventario
    const inventory = await this.inventoryService.create({
      productId: savedProduct.id,
      storageId,
      quantity,
    });

    await clearCacheByPrefix('products_all_');

    return {
      message: 'Producto creado correctamente',
      data: savedProduct,
      inventory,
    };
  }

  async findAll(
    { page = 1, limit = 10, search = '' }: PaginationQueryDto,
    user: paramsQueryDto
  ) {
    const skip = (page - 1) * limit;
    const searchTerm = `%${search.toLowerCase()}%`;

    const cacheKey = `products_all_${user.businessId}_${user.storageId}_${page}_${limit}_${search.toLowerCase()}`;

    const { entities, total } = await remember(
      this.cacheManager,
      cacheKey,
      60 * 60 * 24 * 7,
      async () => {
        const baseQuery = this.ProducRepository.createQueryBuilder('product')
          .leftJoinAndSelect('product.category', 'category')
          .leftJoinAndSelect('product.measureUnit', 'measureUnit')
          .leftJoinAndSelect('product.business', 'business')
          .leftJoinAndSelect('product.inventories', 'inventories') // trae todas las bodegas
          .where(
            `(LOWER(product.nameProduct) LIKE :search
        OR LOWER(product.description) LIKE :search
        OR LOWER(product.internalCode) LIKE :search
        OR LOWER(category.NameCategory) LIKE :search
        OR LOWER(measureUnit.nameUnit) LIKE :search)`,
            { search: searchTerm }
          )
          .andWhere('product.businessId = :businessId', {
            businessId: user.businessId,
          });

        const total = await baseQuery.clone().getCount();

        const entities = await baseQuery
          .skip(skip)
          .take(limit)
          .orderBy('product.id', 'ASC')
          .getMany();

        return { entities, total };
      }
    );

    const cleanData = entities.map((product) => {
      const currentInventory = product.inventories.find(
        (inv) => inv.storageId === user.storageId
      );

      return {
        ...product,
        quantity: currentInventory?.quantity ?? 0,
        inventories: product.inventories.map((inv) => ({
          storageId: inv.storageId,
          quantity: inv.quantity,
        })),
      };
    });

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

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    user: paramsQueryDto
  ) {
    const {
      measureUnitId,
      categoryId,
      businessId,
      storage,
      quantity,
      ...rest
    } = updateProductDto;

    const product = await this.ProducRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    // Validar existencia de relaciones
    const measureUnit = await this.measureUnitService.findOne(measureUnitId);
    if (!measureUnit) {
      throw new NotFoundException('Unidad de medida no encontrada');
    }

    const category = await this.categoryService.findOne(categoryId);
    if (!category) {
      throw new NotFoundException('Categoría no encontrada');
    }

    const business = await this.businessUnitService.findOne(businessId);
    if (!business) {
      throw new NotFoundException('Empresa no encontrada');
    }

    // Determinar la bodega
    const storageId = user?.role === 'admin' ? storage : user.storageId;
    if (typeof storageId !== 'number') {
      throw new BadRequestException('No se pudo determinar la bodega (storageId)');
    }

    // Actualizar el producto
    await this.ProducRepository.update(id, {
      ...rest,
      measureUnitId,
      categoryId,
      businessId,
    });

    // Actualizar inventario
    const inventory = await this.inventoryService.update({
      productId: id,
      storageId,
      quantity,
    });

    await clearCacheByPrefix('products_all_');

    return {
      message: 'Producto actualizado correctamente',
      data: await this.ProducRepository.findOne({ where: { id } }),
      inventory,
    };
  }




  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
