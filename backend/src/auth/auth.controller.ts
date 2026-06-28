import { Controller, Post, Get, Body, UseGuards, Req, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import * as express from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const result = await this.authService.register(registerDto);
    const isProd = process.env.NODE_ENV === 'production';
    const cookieOptions: express.CookieOptions = {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
    };
    res.cookie('teamboard_token', result.token, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return { user: result.user, token: result.token };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const result = await this.authService.login(loginDto);
    const isProd = process.env.NODE_ENV === 'production';
    const cookieOptions: express.CookieOptions = {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
    };
    res.cookie('teamboard_token', result.token, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return { user: result.user, token: result.token };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: express.Response) {
    const isProd = process.env.NODE_ENV === 'production';
    const cookieOptions: express.CookieOptions = {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
    };
    res.clearCookie('teamboard_token', cookieOptions);
    return { message: 'Logged out successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    // req.user is set by Passport JwtStrategy validate method
    return req.user;
  }
}
