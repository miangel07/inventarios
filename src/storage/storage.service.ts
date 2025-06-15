import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Storage } from './entities/storage.entity';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/utils/TypeGeneric';
import { clearCacheByPrefix, remember } from 'src/utils/CacheStores.utils';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(Storage)
    private readonly StorageRepository: Repository<Storage>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) { }
  async findByField(field: string, value: string): Promise<Storage | null> {
    return this.StorageRepository.findOne({ where: { [field]: value } });
  }
  async create(createStorageDto: CreateStorageDto) {
    const saveStorege = await this.StorageRepository.save({ ...createStorageDto, createDate: new Date() })
    if (!saveStorege) {
      throw new BadRequestException('Error al crear la bodega.');
    }
    await clearCacheByPrefix('storage_all');
    return {
      message: "Bodega creada Correctamente",
      data: saveStorege,
    };
  }
  async findAll({ page = 1, limit = 10, search = '' }: PaginationQueryDto) {
    const skip = (page - 1) * limit;
    const [data, total] = await remember(
      this.cacheManager,
      `storage_all`,
      60 * 60 * 24 * 7,
      async () => {
        const query = this.StorageRepository.createQueryBuilder('storage')
          .leftJoin('storage.manager', 'manager');

        if (search) {
          query.where(
            ` LOWER(storage.nameStorage) LIKE :search
    OR LOWER(storage.address) LIKE :search
    OR LOWER(storage.TypeStorage) LIKE :search
    OR LOWER(storage.Status) LIKE :search
    OR CAST(storage.managerId AS CHAR) LIKE :search
    OR LOWER(manager.username) LIKE :search
    OR LOWER(manager.lastname) LIKE :search,
    OR LOWER(manager.identificationNumber AS CHAR) LIKE :search`,
            { search: `%${search.toLowerCase()}%` },
          );
        }

        query.skip(skip).take(limit).orderBy('storage.id', 'ASC');

        return query.getManyAndCount();
      },

    );
    return {
      message: data.length > 0 ? 'bodegas listadas correctamente' : 'No hay bodegas registradas',
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
    return `This action returns a #${id} storage`;
  }

  async update(id: number, updateStorageDto: UpdateStorageDto) {

    const existingStorage = await this.StorageRepository.findOneBy({ id });

    if (!existingStorage) {
      throw new NotFoundException(`No se encontró la bodega con id ${id}`);
    }

    const updated = await this.StorageRepository.save({
      ...existingStorage,
      ...updateStorageDto,
      updateDate: new Date(),
    });

    if (!updated) {
      throw new BadRequestException('Error al actualizar la bodega.');
    }
    await clearCacheByPrefix('storage_all');
    return {
      message: "Bodega actualizada correctamente",
      data: updated,
    };


  }

  remove(id: number) {
    return `This action removes a #${id} storage`;
  }
}
