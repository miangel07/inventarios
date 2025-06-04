import { IsEnum, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { FieldsGeneric, StatusGeneric } from 'src/utils/TypeGeneric';
import { StorageType } from '../utils/TypeEnum-Storage';


export class CreateStorageDto {
    @IsString()
    @IsNotEmpty(FieldsGeneric('Nombre de la bodega'))
    nameStorage: string;

    @IsString()
    @IsNotEmpty(FieldsGeneric('dirreción', 'La '))
    address: string;

    @IsEnum(StorageType, { message: 'El tipo de almacén no es válido.' })
    @IsNotEmpty(FieldsGeneric('tipo de bodega'))
    TypeStorage: StorageType;

    @IsEnum(StatusGeneric, { message: 'El estado no es válido.' })
    Status: StatusGeneric;

    @IsNumber({}, { message: 'Debes seleccionar una opcion valida.' })
    managerId: number;
}
