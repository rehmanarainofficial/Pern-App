import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsStrongPassword({ minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1, minLowercase: 1 })
    @IsNotEmpty()
    password!: string;
}
