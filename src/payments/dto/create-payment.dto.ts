import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  supplier: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  productid: number;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  amount: number;
}
