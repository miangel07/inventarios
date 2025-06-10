import { Type } from 'class-transformer';
import { IsOptional, IsPositive, IsString } from 'class-validator';
export enum StatusGeneric {
    active = "active",
    inactive = "inactive"
}
export const ObjetGenericStatus = (): {
    type: "enum";
    enum: typeof StatusGeneric;
    default: StatusGeneric;
} => {
    return {
        type: "enum",
        enum: StatusGeneric,
        default: StatusGeneric.active
    };
};

export const FieldsGeneric = (fiels: string, isNull?: string): { message: string } => {
    const data = {
        message: `${isNull ? isNull : 'El'} ${fiels} es obligatorio`
    }
    return data
}

export class PaginationQueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    limit?: number = 10;

    @IsOptional()
    @IsString()
    search?: string;
}