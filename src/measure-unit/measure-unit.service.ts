import { Injectable } from '@nestjs/common';
import { CreateMeasureUnitDto } from './dto/create-measure-unit.dto';
import { UpdateMeasureUnitDto } from './dto/update-measure-unit.dto';

@Injectable()
export class MeasureUnitService {
  create(createMeasureUnitDto: CreateMeasureUnitDto) {
    return 'This action adds a new measureUnit';
  }

  findAll() {
    return `This action returns all measureUnit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} measureUnit`;
  }

  update(id: number, updateMeasureUnitDto: UpdateMeasureUnitDto) {
    return `This action updates a #${id} measureUnit`;
  }

  remove(id: number) {
    return `This action removes a #${id} measureUnit`;
  }
}
