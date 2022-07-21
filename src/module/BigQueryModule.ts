import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BigQueryTransaction } from '../data/entities/BigQueryTransaction';
import { BigQueryController } from '../controllers/BigQueryController';
import { BigQueryService } from '../services/BigQueryService';
import { GoogleStrategy } from 'src/strategy/GoogleStrategy';
import { AuthController } from 'src/controllers/AuthController';

@Module({
  imports: [TypeOrmModule.forFeature([BigQueryTransaction])],
  controllers: [AuthController, BigQueryController],
  providers: [BigQueryService, GoogleStrategy],
})
export class BigQueryModule {}
