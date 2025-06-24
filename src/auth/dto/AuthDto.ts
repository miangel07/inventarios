import { IsString, Length } from "class-validator";


export class AuthDto {

    @IsString()
    @Length(3, 20)
    username: string;

    @IsString()
    @Length(3, 20)
    password: string;
}