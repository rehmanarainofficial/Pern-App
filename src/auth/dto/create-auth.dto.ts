import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.replace(/\s+/g, '').toLowerCase().trim())
  username!: string;

  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  password!: string;
}
