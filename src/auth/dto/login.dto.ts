import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Username harus berupa email yang valid' })
  username: string;

  @IsNotEmpty({ message: 'Password harus diisi' })
  password: string;
}
