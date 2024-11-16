// author.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { ProductsService } from '../products/products.service';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(private readonly productsService: ProductsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const productId = +request.params.id;

    const product = await this.productsService.findOne(productId);
    if (!product) {
      throw new ForbiddenException('Produk tidak ditemukan');
    }

    if (product.createBy !== user.username) {
      throw new ForbiddenException('Anda tidak diizinkan untuk mengakses resource ini');
    }

    return true;
  }
}
