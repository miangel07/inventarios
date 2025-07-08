import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsNumber()
    @IsOptional()
    id?: number;

    @IsNumber()
    @IsOptional()
    quantity: number;

    @IsNumber()
    @IsOptional()
    businessId: number

    @IsNumber()
    @IsOptional()
    categoryId: number
    @IsNumber()
    @IsOptional()
    measureUnitId: number


}
