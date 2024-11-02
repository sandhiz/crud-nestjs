import { IsEmail, IsString, IsIn, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  username: string;

  @IsString()
  @MinLength(3)
  password: string;

  @IsString()
  @IsIn(['admin', 'user', 'accounting'])
  role: string;
}
