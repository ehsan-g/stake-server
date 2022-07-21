import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BigQueryTransaction } from '../data/entities/BigQueryTransaction';
import { BigQueryController } from '../controllers/BigQueryController';
import { BigQueryService } from '../services/BigQueryService';

@Module({
  imports: [TypeOrmModule.forFeature([BigQueryTransaction])],
  controllers: [BigQueryController],
  providers: [BigQueryService],
})
export class BigQueryModule {}
