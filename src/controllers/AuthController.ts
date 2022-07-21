import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BigQueryService } from '../services/BigQueryService';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('BigQuery')
@Controller()
export class AuthController {
  constructor(private bigQueryService: BigQueryService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    console.log(req);
    return this.bigQueryService.googleLogin(req);
  }
}
