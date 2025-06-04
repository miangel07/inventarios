import { PartialType } from '@nestjs/mapped-types';
import { CreateMeasureUnitDto } from './create-measure-unit.dto';

export class UpdateMeasureUnitDto extends PartialType(CreateMeasureUnitDto) {}
