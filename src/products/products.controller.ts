import { Controller, Get, Post, Body, Put, Param, Delete, Request, UseGuards, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { AuthorGuard } from '../auth/author.guard';

@Controller('products')
@ApiTags('products')
@ApiBearerAuth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles('admin', 'user')
  @ApiOperation({ summary: 'Buat produk baru' })
  @ApiResponse({ status: 201, description: 'Produk berhasil dibuat.' })
  async create(@Body() createProductDto: CreateProductDto, @Request() req): Promise<Product> {
    const username = req.user.username;
    return this.productsService.create(createProductDto, username);
  }

  @Get()
  @Roles('admin', 'user')
  @ApiOperation({ summary: 'Cari semua produk' })
  @ApiResponse({ status: 200, description: 'Berhasil mengambil semua produk.' })
  @ApiQuery({ name: 'name', required: false, description: 'Nama produk untuk dicari' }) //optional aja
  async findAll(
    @Query('name') name?: string,
  ): Promise<Product[]> {
    return this.productsService.findAll(name);
  }

  @Get(':id')
  @Roles('admin', 'user')
  @ApiOperation({ summary: 'Cari Produk By ID' })
  @ApiResponse({ status: 200, description: 'Berhasil mengambil produk.' })
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Put(':id')
  @Roles('admin', 'user')
  @UseGuards(AuthorGuard)
  @ApiOperation({ summary: 'Update Produk' })
  @ApiResponse({ status: 200, description: 'Produk berhasil diperbarui.' })
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @Roles('admin', 'user')
  @UseGuards(AuthorGuard)
  @ApiOperation({ summary: 'Hapus produk By ID' })
  @ApiResponse({ status: 200, description: 'Produk berhasil dihapus.' })
  async remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
