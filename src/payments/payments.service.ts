import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class PaymentsService {
  constructor(private readonly productsService: ProductsService) {}

  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }

   findAll() {
    const allProduct =  this.productsService.findAll();
    return {
      invoiceno: 'INVOICE/1',
      product: allProduct,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
