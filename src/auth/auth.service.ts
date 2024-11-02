import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { username, password, role } = registerDto;

    const existingUser = await this.userRepository.findOneBy({ username });
    if (existingUser) {
      throw new ConflictException('User sudah terdaftar');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      role,
    });
    return this.userRepository.save(user);
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new UnauthorizedException('Login gagal, User Tidak Ditemukan');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Login gagal, Password salah');
    }

    const payload = { username: user.username, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
