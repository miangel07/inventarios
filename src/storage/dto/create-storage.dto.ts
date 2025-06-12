import { IsEnum, IsNotEmpty, IsString, IsNumber, Validate } from 'class-validator';
import { FieldsGeneric, StatusGeneric } from 'src/utils/TypeGeneric';
import { StorageType } from '../utils/TypeEnum-Storage';
import { IsUniqueStorage } from '../validator/validator-storage';



export class CreateStorageDto {
    @IsString()
    @IsNotEmpty(FieldsGeneric('Nombre de la bodega'))
    @IsUniqueStorage('nameStorage')
    nameStorage: string;

    @IsString()
    @IsNotEmpty(FieldsGeneric('dirreción', 'La '))
    address: string;

    @IsEnum(StorageType, { message: 'El tipo de almacén no es válido.' })
    @IsNotEmpty(FieldsGeneric('tipo de bodega'))
    TypeStorage: StorageType;


    @IsNumber({}, { message: 'Debes seleccionar una opcion valida.' })
    managerId: number;
}
