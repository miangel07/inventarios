import { Injectable } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';
import { Repository } from 'typeorm';
import { ConfigBusiness } from 'src/config-business/entities/config-business.entity';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
    @InjectRepository(ConfigBusiness)
    private readonly configBusinessRepository: Repository<ConfigBusiness>
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


  findAll() {
    return `This action returns all business`;
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
