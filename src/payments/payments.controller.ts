import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Roles } from '../auth/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Payment } from './entities/payment.entity';

@Controller('payments')
@ApiTags('payments')
@ApiBearerAuth()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @Roles('accounting')
  @ApiOperation({ summary: 'Tambah Payment' })
  @ApiResponse({ status: 201, description: 'Payment berhasil ditambah.' })
  async create(@Body() createPaymentDto: CreatePaymentDto, @Request() req): Promise<Payment> {
    const username = req.user.username;
    return this.paymentsService.create(createPaymentDto, username);
  }

  @Get()
  @Roles('admin', 'accounting')
  @ApiOperation({ summary: 'Cari semua Payment' })
  @ApiResponse({ status: 200, description: 'Payment berhasil ditampilkan.' })
  async findAll(): Promise<Payment[]> {
    return this.paymentsService.findAll(); 
  }
}
