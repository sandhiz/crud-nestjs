import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsIn, MinLength } from 'class-validator';

export class RegisterDto {

  @ApiProperty({
    example : "sandhi@gmail.com"
  })
  
  @IsEmail()
  username: string;

  @ApiProperty({
    example : "123"
  })

  @IsString()
  @MinLength(3)
  password: string;

  @ApiProperty({
    example : "admin"
  })
  @IsString()
  @IsIn(['admin', 'user', 'accounting'])
  role: string;
}
