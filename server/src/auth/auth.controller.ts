import { Controller, Get, Inject, Post } from '@nestjs/common';
import { IAuthService } from './auth';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private authService: IAuthService) {}

  @Post('login')
  login() {}

  @Get('status')
  status() {}

  @Post('logout')
  logout() {}
}
