import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from './public.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({ status: 200, description: 'Login berhasil' })
  @ApiResponse({ status: 401, description: 'Login gagal' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register user baru' })
  @ApiResponse({ status: 201, description: 'User berhasil didaftarkan.' })
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    return this.authService.register(registerDto);
  }
}
