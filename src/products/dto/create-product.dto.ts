import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    IsPositive,
    IsInt,
    IsDateString,
} from 'class-validator';

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

    @IsNumber()
    @IsPositive()

    quantity: number;

    @IsOptional()
    @IsNumber()
    stockMax?: number;

    @IsOptional()
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

    @IsInt()
    @IsPositive()
    measureUnitId: number;

    @IsInt()
    @IsPositive()
    categoryId: number;

    @IsInt()
    @IsPositive()
    businessId: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    storage?: number;
}
