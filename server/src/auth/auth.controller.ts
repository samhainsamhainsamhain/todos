import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Routes } from 'src/utils/constants';
import { AuthService } from './auth.service';
import { AuthenticatedGuard, LocalAuthGuard } from './utils/Guards';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Res() response: Response) {
    return response.sendStatus(HttpStatus.OK);
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  async status(@Req() request: Request, @Res() response: Response) {
    response.send(request.user);
  }

  @Post('logout')
  @UseGuards(AuthenticatedGuard)
  logout(@Req() request: Request, @Res() response: Response) {
    request.logout((err) => {
      return err ? response.sendStatus(400) : response.sendStatus(200);
    });
  }
}
