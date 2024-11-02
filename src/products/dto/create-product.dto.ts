import { IsString, IsBoolean } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsBoolean()
  isActive: boolean;
}
