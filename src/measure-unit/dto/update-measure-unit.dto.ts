import { PartialType } from '@nestjs/mapped-types';
import { CreateMeasureUnitDto } from './create-measure-unit.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateMeasureUnitDto extends PartialType(CreateMeasureUnitDto) {
    @IsNumber()
    @IsOptional()
    id?: number;
}
