import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Routes } from 'src/utils/constants';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './utils/Guards';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login() {}

  @Get('status')
  status() {}

  @Post('logout')
  logout() {}
}
