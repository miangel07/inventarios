import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    IsPositive,
    IsInt,
    IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    nameProduct: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    internalCode: string;

    @IsOptional()
    @IsString()
    brand?: string;

    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    quantity: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    stockMax?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    stockMin?: number;

    @IsOptional()
    @IsString()
    img?: string;

    @IsOptional()
    @IsString()
    observations?: string;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsDateString()
    expirationDate?: Date;

    @Type(() => Number)
    @IsInt()
    @IsPositive()
    measureUnitId: number;

    @Type(() => Number)
    @IsInt()
    @IsPositive()
    categoryId: number;

    @Type(() => Number)
    @IsInt()
    @IsPositive()
    businessId: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    storage?: number;
}
