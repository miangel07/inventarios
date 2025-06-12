import { PartialType } from '@nestjs/mapped-types';
import { CreateStorageDto } from './create-storage.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateStorageDto extends PartialType(CreateStorageDto) {
    @IsNumber()
    @IsOptional()
    id?: number;
}
