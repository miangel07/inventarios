import { Inject, Injectable } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';
import { Repository } from 'typeorm';
import { ConfigBusiness } from 'src/config-business/entities/config-business.entity';
import { PaginationQueryDto } from 'src/utils/TypeGeneric';
import { remember } from 'src/utils/CacheStores.utils';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
    @InjectRepository(ConfigBusiness)
    private readonly configBusinessRepository: Repository<ConfigBusiness>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) { }

  async findByName(name: string) {
    return this.businessRepository.findOne({ where: { name } });
  }
  // src/business/business.service.ts
  async create(createBusinessDto: CreateBusinessDto) {
    const { config, ...businessData } = createBusinessDto;

    const newBusiness = this.businessRepository.create({
      ...businessData,
      createdAt: new Date(businessData.createdAt),
      planRenewalDate: new Date(businessData.planRenewalDate),
    });

    const savedBusiness = await this.businessRepository.save(newBusiness);

    const newConfig = this.configBusinessRepository.create({
      ...config,
      Business: savedBusiness,
    });

    await this.configBusinessRepository.save(newConfig);

    return {
      message: 'Negocio Creado Correctamente',
      data: savedBusiness,
    };
  }


  async findAll(
    { page = 1, limit = 10, search = '' }: PaginationQueryDto,
    user: { storageId: number },
  ) {
    const skip = (page - 1) * limit;
    const searchTerm = `%${search.toLowerCase()}%`;

    const cacheKey = `business_all_${page}_${limit}_${search.toLowerCase()}`;

    const { entities, total } = await remember(
      this.cacheManager,
      cacheKey,
      60 * 60 * 24 * 7, 
      async () => {
        const baseQuery = this.businessRepository
          .createQueryBuilder('business')
          .leftJoinAndSelect('business.user', 'user')
          .leftJoinAndSelect('business.config', 'config')
          .where(
            `LOWER(business.name) LIKE :search
           OR LOWER(business.address) LIKE :search`,
            { search: searchTerm },
          );

        const total = await baseQuery.clone().getCount();

        const result = await baseQuery
          .orderBy('business.id', 'ASC')
          .skip(skip)
          .take(limit)
          .getMany();

        return {
          entities: result,
          total,
        };
      },
    );

    return {
      message:
        entities.length > 0
          ? 'Negocios listados correctamente'
          : 'No hay negocios registrados',
      data: entities,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    };
  }


  findOne(id: number) {
    return `This action returns a #${id} business`;
  }

  update(id: number, updateBusinessDto: UpdateBusinessDto) {
    return `This action updates a #${id} business`;
  }

  remove(id: number) {
    return `This action removes a #${id} business`;
  }
}
