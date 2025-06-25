import { PartialType } from '@nestjs/mapped-types';
import { CreateConfigBusinessDto } from './create-config-business.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateConfigBusinessDto extends PartialType(CreateConfigBusinessDto) {
    @IsNumber()
    @IsOptional()
    id?: number;
}
