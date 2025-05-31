import { IsEnum, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { StatusGeneric } from 'src/utils/TypeGeneric';
import { StorageType } from '../utils/TypeEnum-Storage';


export class CreateStorageDto {
    @IsString()
    @IsNotEmpty({ message: 'El nombre del almacén es obligatorio.' })
    nameStorage: string;

    @IsString()
    @IsNotEmpty({ message: 'La dirección es obligatoria.' })
    address: string;

    @IsEnum(StorageType, { message: 'El tipo de almacén no es válido.' })
    TypeStorage: StorageType;

    @IsEnum(StatusGeneric, { message: 'El estado no es válido.' })
    Status: StatusGeneric;

    @IsNumber({}, { message: 'Debes seleccionar una opcion valida.' })
    managerId: number;
}
