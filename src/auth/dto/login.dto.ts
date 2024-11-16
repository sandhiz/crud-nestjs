import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  
  @ApiProperty({
    example : "sandhi@gmail.com"
  })
  @IsEmail({}, { message: 'Username harus berupa email yang valid' })
  username: string;

  @ApiProperty({
    example : "123"
  })
  @IsNotEmpty({ message: 'Password harus diisi' })
  password: string;
}
