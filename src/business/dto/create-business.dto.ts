import {
    IsString,
    IsNotEmpty,
    IsEnum,
    IsOptional,
    IsDateString,
    ValidateNested,
} from 'class-validator';

import { CreateConfigBusinessDto } from 'src/config-business/dto/create-config-business.dto';
import { Type } from 'class-transformer';
import { BusinessStatus, typeBusiness } from '../types/TypeBusiness';

export class CreateBusinessDto {
    @IsString()
    @IsNotEmpty({ message: 'El nombre del negocio es requerido' })
    name: string;

    @IsString()
    @IsNotEmpty({ message: 'La dirección es requerida' })
    address: string;

    @IsDateString()
    @IsNotEmpty({ message: 'La fecha de creación es requerida' })
    createdAt: string;

    @IsDateString()
    @IsNotEmpty({ message: 'La fecha de renovación es requerida' })
    planRenewalDate: string;

    @IsEnum(BusinessStatus)
    @IsOptional()
    status?: BusinessStatus;

    @IsEnum(typeBusiness)
    @IsOptional()
    typeBusiness?: typeBusiness;

    
    @ValidateNested()
    @Type(() => CreateConfigBusinessDto)
    config: CreateConfigBusinessDto;

}
