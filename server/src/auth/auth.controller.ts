import { Controller, Get, Post } from '@nestjs/common';
import { Routes } from 'src/utils/constants';
import { AuthService } from './auth.service';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login() {}

  @Get('status')
  status() {}

  @Post('logout')
  logout() {}
}
