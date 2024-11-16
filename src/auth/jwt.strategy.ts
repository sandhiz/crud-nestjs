import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../redis.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    configService: ConfigService,
    private readonly redisService: RedisService,  
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: { username: string; role: string }) {
    const user = await this.usersRepository.findOne({ where: { username: payload.username } });
    if (!user) {
      return null;
    }

    
    const token = await this.redisService.client.get(payload.username);
    if (!token) {
      throw new UnauthorizedException('Token tidak valid atau sudah kadaluarsa');
    }

    return user;
  }
}
