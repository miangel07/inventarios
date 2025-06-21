import { IsInt, IsNumber, IsPositive } from "class-validator";

export class CreateInventoryDto {
    @IsInt()
    productId: number;

    @IsInt()
    storageId: number;

    @IsNumber()
    @IsPositive()
    quantity: number;
}
