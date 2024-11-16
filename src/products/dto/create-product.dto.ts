import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example : "mobil"
  })

  @IsString()
  name: string;

  @ApiProperty({
    example : true
  })
  @IsBoolean()
  isActive: boolean;
}
