// create-user.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsNumber,
  ValidationArguments,
  Validate
} from 'class-validator';
import { IsUnique } from '../validator/Validator-user';

export class CreateUserDto {
  @IsString()
  @Validate(IsUnique)
  @Length(3, 20)
  username: string;

  @IsString()
  @IsNotEmpty({
    message: "El Apellido es obligatorio"
  })
  lastname: string;

  @IsString()
  @Validate(IsUnique)
  phone: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  identificationNumber: string;

  @IsNumber()
  addres: number;

  @IsEmail()
  email: string;

}
