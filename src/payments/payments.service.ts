import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly productsService: ProductsService, 
  ) {}

  async create(createPaymentDto: CreatePaymentDto, createBy: string): Promise<Payment> {
    const productExists = await this.productsService.findOne(createPaymentDto.productid);
    if (!productExists) {
      throw new NotFoundException(`Product with ID ${createPaymentDto.productid} does not exist.`);
    }

    const payment = this.paymentRepository.create({
      ...createPaymentDto,
      createDate: new Date(), 
      createBy, 
    });

    return this.paymentRepository.save(payment);
  }

  
  async findAll(): Promise<any[]> {
    const payments = await this.paymentRepository.find({
      relations: ['product'],
      select: ['id', 'supplier', 'productid', 'amount', 'createDate', 'createBy'],
    });
  
    return payments.map(payment => ({
      id: payment.id,
      supplier: payment.supplier,
      productid: payment.productid,
      amount: payment.amount,
      createDate: payment.createDate,
      createBy: payment.createBy,
      product_name: payment.product?.name, // Mengakses nama produk dari relasi
    }));
  }
  
  
  
}
