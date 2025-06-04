import { Module } from '@nestjs/common';
import { MeasureUnitService } from './measure-unit.service';
import { MeasureUnitController } from './measure-unit.controller';

@Module({
  controllers: [MeasureUnitController],
  providers: [MeasureUnitService],
})
export class MeasureUnitModule {}
