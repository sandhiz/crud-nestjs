import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto, username: string): Promise<Product> {
    const product = this.productRepository.create({
      ...createProductDto,
      createBy: username,
      createDate: new Date(),
    });
    return this.productRepository.save(product);
  }

  async findAll(name?: string): Promise<Product[]> {
    const query = this.productRepository.createQueryBuilder('products');
  
    if (name) {
      query.andWhere('products.name LIKE :name', { name: `%${name}%` });
    }
  
    return await query.getMany();
  }
  
  

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Data tidak ada');
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    await this.productRepository.update(id, updateProductDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
