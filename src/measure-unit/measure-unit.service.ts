import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMeasureUnitDto } from './dto/create-measure-unit.dto';
import { UpdateMeasureUnitDto } from './dto/update-measure-unit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeasureUnit } from './entities/measure-unit.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PaginationQueryDto } from 'src/utils/TypeGeneric';
import { clearCacheByPrefix, remember } from 'src/utils/CacheStores.utils';


@Injectable()
export class MeasureUnitService {
  constructor(
    @InjectRepository(MeasureUnit)
    private measureUnitRepository: Repository<MeasureUnit>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) { }

  async create(createMeasureUnitDto: CreateMeasureUnitDto): Promise<{ message: string, data: MeasureUnit }> {
    const measureUnit = await this.measureUnitRepository.save(createMeasureUnitDto);
    await clearCacheByPrefix('MeasureUnit_all');
    return {
      message: 'Unidad de medida creada correctamente',
      data: measureUnit,
    }

  }


  async findAll({ page = 1, limit = 10, search = '' }: PaginationQueryDto) {


    const skip = (page - 1) * limit;
    const [data, total] = await remember(
      this.cacheManager,
      `MeasureUnit_all`,
      60 * 60 * 24 * 7,
      async () => {
        const query = this.measureUnitRepository.createQueryBuilder('MeasureUnit')




        if (search) {
          query.where(
            `LOWER(MeasureUnit.nameUnit) LIKE :search
              OR LOWER(MeasureUnit.code) LIKE :search`,
            { search: `%${search.toLowerCase()}%` },
          );
        }

        query.skip(skip).take(limit).orderBy('MeasureUnit.id', 'ASC');

        return query.getManyAndCount();
      },

    );


    return {
      message: data.length > 0 ? 'Unidades de medida listadas correctamente' : 'No hay Unidades de medida registradas',
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
    return `This action returns a #${id} measureUnit`;
  }

  async update(id: number, updateMeasureUnitDto: UpdateMeasureUnitDto): Promise<{ message: string; data: MeasureUnit }> {
    const measureUnit = await this.measureUnitRepository.preload({
      id,
      ...updateMeasureUnitDto,
    });

    if (!measureUnit) {
      throw new NotFoundException(`Unidad de medida con ID ${id} no encontrada`);
    }

    const updated = await this.measureUnitRepository.save(measureUnit);

    await clearCacheByPrefix('MeasureUnit_all');

    return {
      message: 'Unidad de medida actualizada correctamente',
      data: updated,
    };
  }


  remove(id: number) {
    return `This action removes a #${id} measureUnit`;
  }
}
