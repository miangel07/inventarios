// create-user.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsNumber,
  Validate,
  isNumber,
  IsOptional,
  IsEnum
} from 'class-validator';
import { IsUnique } from '../validator/Validator-user';
import { FieldsGeneric } from 'src/utils/TypeGeneric';
import { TypeDocument } from '../types/TypeUsers';

export class CreateUserDto {
  @IsString()
  @Validate(IsUnique)
  @IsNotEmpty(FieldsGeneric('Nombre de usuario'))
  @Length(3, 20)
  username: string;

  @IsString()
  @IsNotEmpty(FieldsGeneric('Apellido'))
  lastname: string;


  @IsString()
  @IsNotEmpty(FieldsGeneric('contraseña',"la"))
  password: string;

  @IsString()
  @Validate(IsUnique)
  phone: string;

  @IsNumber()
  @IsNotEmpty(FieldsGeneric('Numero de identificacion'))
  @Validate(IsUnique)
  identificationNumber: number;


  @IsEnum(TypeDocument, { message: 'tipo de documento debe ser: cc, ti, ce' })
  typeDocument: TypeDocument;

  @IsString()
  addres: string;

  @IsEmail({},
    {
      message: 'El correo electrónico no es válido',
    })

  @Validate(IsUnique)
  email: string;

}
