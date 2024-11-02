// payments.controller.ts
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Roles } from '../auth/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@Controller('payments')
@ApiTags('payments')
@ApiBearerAuth()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @Roles('accounting')
  @ApiOperation({ summary: 'Tambah Payment' })
  @ApiResponse({ status: 201, description: 'Payment berhasil ditambah.' })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  @Roles('admin', 'accounting')
  @ApiOperation({ summary: 'cari Payment' })
  @ApiResponse({ status: 200, description: 'Payment berhasil di tampilkan.' })
  findAll() {
    return this.paymentsService.findAll();
  }
}
