import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { PaginationQueryDto, StatusGeneric } from 'src/utils/TypeGeneric';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { clearCacheByPrefix, remember } from 'src/utils/CacheStores.utils';
import { Cache } from 'cache-manager';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    const savedCategory = await this.categoryRepository.save(category);
    if (!savedCategory) {
      throw new Error('Error al crear la categoría.');
    }
    await clearCacheByPrefix('storage_all');
    return {
      message: 'Categoría creada correctamente',
      data: savedCategory,
    };
  }
  async findAll({ page = 1, limit = 10, search = '' }: PaginationQueryDto) {


    const skip = (page - 1) * limit;
    const [data, total] = await remember(
      this.cacheManager,
      `category_all`,
      60 * 60 * 24 * 7,
      async () => {
        const query = this.categoryRepository.createQueryBuilder('Category')




        if (search) {
          query.where(
            `LOWER(Category.NameCategory) LIKE :search
             OR LOWER(Category.Status) LIKE :search`,
            { search: `%${search.toLowerCase()}%` },
          );
        }

        query.skip(skip).take(limit).orderBy('Category.id', 'ASC');

        return query.getManyAndCount();
      },

    );


    return {
      message: data.length > 0 ? 'Categorias listadas correctamente' : 'No hay Categorias registradas',
      data,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    };
  }


  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<{ message: string; data: Category }> {
    const category = await this.categoryRepository.preload({
      id,
      ...updateCategoryDto,
    });

    if (!category) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }

    const updatedCategory = await this.categoryRepository.save(category);

    await clearCacheByPrefix('category_all');

    return {
      message: 'Categoría actualizada correctamente',
      data: updatedCategory,
    };
  }
  async updateStatus(id: number, status: StatusGeneric): Promise<{ message: string }> {
    const measure = await this.categoryRepository.findOneBy({ id });
    if (!measure) {
      throw new NotFoundException('Usuario no encontrado');
    }

    measure.Status = status;

    await this.categoryRepository.save(measure);

    await clearCacheByPrefix('category_all');

    return { message: `Estado de la categoria actualizado correctamente` };
  }


}


