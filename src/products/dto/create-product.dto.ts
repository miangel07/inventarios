import { IsNotEmpty, IsString } from "class-validator";
import { FieldsGeneric } from "src/utils/TypeGeneric";
import { IsUniqueProduct } from "../validation/validation-products";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty(FieldsGeneric('Nombre del producto'))
    @IsUniqueProduct('nameProduct')
    nameProduct: string;


}
