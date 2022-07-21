import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BigQueryService } from '../services/BigQueryService';
import { AuthGuard } from '@nestjs/passport';

export const VALID_HEALTHCHECK_MESSAGE = 'OK';

@ApiTags('BigQuery')
@Controller('BigQuery')
export class BigQueryController {
  constructor(private bigQueryService: BigQueryService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('transaction')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    console.log(req);
    return this.bigQueryService.googleLogin(req);
  }
}
