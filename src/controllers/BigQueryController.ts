import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BigQueryService } from '../services/BigQueryService';

@ApiTags('BigQuery')
@Controller('BigQuery')
export class BigQueryController {
  constructor(private bigQueryService: BigQueryService) {}

  @Get(`transaction/google/fetch`)
  @ApiOperation({ description: 'Get a single transaction by ID' })
  async getTransaction() {
    return await this.bigQueryService.getTransactions();
  }

  @Get(`transaction/db/fetch`)
  @ApiOperation({ description: 'Fetch saved transactions from Postgres' })
  async getDbTransactions() {
    return await this.bigQueryService.getDbTransactions();
  }

  @Get(`transaction/create`)
  @ApiOperation({ description: 'Create tables from BigQuery' })
  async saveToDatabase() {
    return await this.bigQueryService.saveToDatabase();
  }
}
