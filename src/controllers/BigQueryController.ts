import { Controller, Get, UseGuards, Req, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BigQueryService } from '../services/BigQueryService';

export const VALID_HEALTHCHECK_MESSAGE = 'OK';

@ApiTags('BigQuery')
@Controller('BigQuery')
export class BigQueryController {
  constructor(private bigQueryService: BigQueryService) {}

  @Get(`transaction/:id`)
  @ApiOperation({ description: 'Get a single transaction by ID' })
  async getTransaction(@Param('id') id: string) {
    // FIXME - Done
    return await this.bigQueryService.getTransaction();
  }
}
