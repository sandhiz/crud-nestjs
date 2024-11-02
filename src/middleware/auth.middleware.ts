import { Injectable, NestMiddleware, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

export interface ExpressRequest extends Request {
  user?: any;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    if (req.url === '/auth/login') {
      return next(); 
    }

    const authHeader = req.headers.authorization;
    const bearer = authHeader && authHeader.split(' ')[0];
    const token = authHeader && authHeader.split(' ')[1];

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Token Expired Silakan Login Lagi');
    }
    let user
    try {
       user = await this.jwtService.verify(token);
      req.user = user; 
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token sudah expired');
      }
     throw new UnauthorizedException('Token Tidak Berlaku'); 
    }

   
    if (user.role === 'admin') {
      return next();
    } else if (user.role === 'user' && req.path.startsWith('/products')) {
      return next();
    } else if (user.role === 'accounting' && req.path.startsWith('/payments')) {
      return next();
    } else {
      throw new ForbiddenException('Akses Ditolak');
    }
  }
}
