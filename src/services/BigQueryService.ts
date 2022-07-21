import { Injectable } from '@nestjs/common';
import { DataFieldsOnly } from '../utils/types';
import { BigQueryTransaction } from '../data/entities/BigQueryTransaction';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class BigQueryService {
  constructor(
    @InjectRepository(BigQueryTransaction)
    private bigQueryRepository: Repository<BigQueryTransaction>,
  ) {}

  // Create a new  transaction and save it to the database

  async createTransaction(
    transaction: DataFieldsOnly<BigQueryTransaction>,
  ): Promise<BigQueryTransaction> {
    const saved = await this.bigQueryRepository.save(transaction);
    return saved;
  }

  // Get all the transactions

  async getTransactions(
    transactionStatuses?: string,
  ): Promise<BigQueryTransaction[]> {
    if (transactionStatuses) {
      const statuses = transactionStatuses.split(',');

      return await this.bigQueryRepository.find({
        where: {
          transactionStatus: In(statuses),
        },
      });
    } else {
      return await this.bigQueryRepository.find();
    }
  }
}
