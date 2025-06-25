import {
    IsString,
    IsNotEmpty,
    IsEnum,
    IsOptional,
    IsDateString,
} from 'class-validator';
import { BusinessStatus } from '../entities/business.entity';

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

    @IsString()
    @IsOptional()
    notes?: string;

    @IsNotEmpty({ message: 'La configuración es requerida' })
    config: number; 
}
