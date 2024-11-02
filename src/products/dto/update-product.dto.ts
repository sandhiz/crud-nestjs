import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
