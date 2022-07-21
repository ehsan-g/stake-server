import { Injectable } from '@nestjs/common';
import { DataFieldsOnly } from '../utils/types';
import { BigQueryTransaction } from '../data/entities/BigQueryTransaction';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BigQueryService {
  constructor(
    @InjectRepository(BigQueryTransaction)
    private bigQueryRepository: Repository<BigQueryTransaction>,
  ) {}

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User Info from Google',
      user: req.user,
    };
  }
  // Create a new  transaction and save it to the database

  async createTransaction(
    transaction: DataFieldsOnly<BigQueryTransaction>,
  ): Promise<BigQueryTransaction> {
    const saved = await this.bigQueryRepository.save(transaction);
    return saved;
  }
}
