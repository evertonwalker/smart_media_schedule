import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtAuthGuard } from './jwt.auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @Post('verify-email')
  async verifyEmail(@Body() emailObj: { email: string}): Promise<boolean> {
    return this.authService.validateEmail(emailObj);
  }


  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(200)
  async verifyToken() {
    return { status: 'ok'};
  }
}