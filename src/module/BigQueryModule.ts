import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BigQueryTransaction } from '../data/entities/BigQueryTransaction';
import { BigQueryController } from '../controllers/BigQueryController';
import { BigQueryService } from '../services/BigQueryService';
import { GoogleStrategy } from 'src/strategy/GoogleStrategy';
import { AuthController } from 'src/controllers/AuthController';
import { AuthService } from 'src/services/AuthService';

@Module({
  imports: [TypeOrmModule.forFeature([BigQueryTransaction])],
  controllers: [AuthController, BigQueryController],
  providers: [AuthService, BigQueryService, GoogleStrategy],
})
export class BigQueryModule {}
