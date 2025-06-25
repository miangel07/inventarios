import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessDto } from './create-business.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateBusinessDto extends PartialType(CreateBusinessDto) {

    @IsNumber()
    @IsOptional()
    id?: number;

}
