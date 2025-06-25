import { IsBoolean, IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateConfigBusinessDto {
    @IsOptional()
    @IsBoolean()
    infinty?: boolean;

    @IsOptional()
    @IsInt()
    @Min(0)
    cuantityUsers?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    maxStorage?: number;

}



