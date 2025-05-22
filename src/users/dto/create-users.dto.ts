// create-user.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  username: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
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
