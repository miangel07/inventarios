import { Module } from '@nestjs/common';
import { MeasureUnitService } from './measure-unit.service';
import { MeasureUnitController } from './measure-unit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasureUnit } from './entities/measure-unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MeasureUnit])],
  controllers: [MeasureUnitController],
  providers: [MeasureUnitService],
})
export class MeasureUnitModule { }
