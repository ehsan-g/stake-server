import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config';
import { BigQueryTransaction } from './data/entities/BigQueryTransaction';
import { BigQueryModule } from './module/BigQueryModule';

const imports = [
  LoggerModule.forRoot(),
  TypeOrmModule.forRoot({
    ...config().db,
    entities: [BigQueryTransaction],
  }),
  BigQueryModule,
];

@Module({
  imports: imports,
  controllers: [],
  providers: [],
})
export class AppModule {}
