import { IsDate, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { FieldsGeneric } from "src/utils/TypeGeneric";
import { IsUniqueProduct } from "../validation/validation-products";
import { IsNull } from "typeorm";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty(FieldsGeneric('Nombre del producto'))
    nameProduct: string;

    @IsString()
    @IsNotEmpty(FieldsGeneric('Descripción del producto', 'La'))

    description: string;
    @IsString()
    @IsNotEmpty(FieldsGeneric('Codigo'))
    @IsUniqueProduct('internalCode')
    internalCode: string;

    @IsOptional()
    @IsString()
    brand?: string;

    @IsNumber()
    @IsNotEmpty(FieldsGeneric('Cantidad', 'La'))
    stock: number;

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
    @IsDate()
    expirationDate?: Date

    @IsInt()
    @IsPositive()
    measureUnitId: number;
  
    @IsInt()
    @IsPositive()
    categoryId: number;


}
