import { Injectable } from '@nestjs/common';
import { CreateConfigBusinessDto } from './dto/create-config-business.dto';
import { UpdateConfigBusinessDto } from './dto/update-config-business.dto';

@Injectable()
export class ConfigBusinessService {
  create(createConfigBusinessDto: CreateConfigBusinessDto) {
    return 'This action adds a new configBusiness';
  }

  findAll() {
    return `This action returns all configBusiness`;
  }

  findOne(id: number) {
    return `This action returns a #${id} configBusiness`;
  }

  update(id: number, updateConfigBusinessDto: UpdateConfigBusinessDto) {
    return `This action updates a #${id} configBusiness`;
  }

  remove(id: number) {
    return `This action removes a #${id} configBusiness`;
  }
}
