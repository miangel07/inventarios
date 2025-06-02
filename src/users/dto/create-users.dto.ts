// create-user.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsNumber,
  Validate,
  isNumber,
  IsOptional
} from 'class-validator';
import { IsUnique } from '../validator/Validator-user';
import { FieldsGeneric } from 'src/utils/TypeGeneric';

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
  @Validate(IsUnique)
  phone: string;

  @IsNumber()
  @IsNotEmpty(FieldsGeneric('Numero de identificacion'))
  @Validate(IsUnique)
  identificationNumber: number;

  @IsString()
  addres: string;

  @IsEmail({},
    {
      message: 'El correo electrónico no es válido',
    })

  @Validate(IsUnique)
  email: string;

}
