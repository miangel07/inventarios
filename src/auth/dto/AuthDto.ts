import { IsString, Length } from "class-validator";


export class AuthDto {

    @IsString()
    @Length(3, 20)
    email: string;

    @IsString()
    @Length(3, 20)
    password: string;
}