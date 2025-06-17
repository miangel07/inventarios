import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly ProducRepository: Repository<Product>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) { }

  // falta crear las categorias y la unidad de medida para poder registrar un producto
  async create(createProductDto: CreateProductDto) {
    const {
      measureUnitId,
      categoryId,
      ...rest
    } = createProductDto;

    const measureUnit = await this.ProducRepository.findOneBy({ id: measureUnitId });
    if (!measureUnit) {
      throw new NotFoundException('Unidad de medida no encontrada');
    }


    const newProduct = this.ProducRepository.create({
      ...rest,
      measureUnit,
      categoryId,
    });

    const savedProduct = await this.ProducRepository.save(newProduct);

    return {
      message: 'Producto creado correctamente',
      data: savedProduct,
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
