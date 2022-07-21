import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BigQueryService } from '../services/BigQueryService';

export const VALID_HEALTHCHECK_MESSAGE = 'OK';

@ApiTags('BigQuery')
@Controller('BigQuery')
export class BigQueryController {
  constructor(private bigQueryService: BigQueryService) {}

  @Get(`transaction/:id`)
  async getTransaction(@Param('id') id: string) {
    // FIXME - Done
    return await this.bigQueryService.getTransactions(id);
  }
}
