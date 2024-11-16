import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Payment } from './entities/payment.entity';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, Product]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, ProductsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
