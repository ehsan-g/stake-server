import { Injectable } from '@nestjs/common';
import { DataFieldsOnly, DbTransaction } from '../utils/types';
import { BigQueryTransaction } from '../data/entities/BigQueryTransaction';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BigQuery } from '@google-cloud/bigquery';

@Injectable()
export class BigQueryService {
  constructor(
    @InjectRepository(BigQueryTransaction)
    private bigQueryRepository: Repository<BigQueryTransaction>,
  ) {}

  // get all  available transactions for this Google BigQuery

  async getTransactions(): Promise<DbTransaction[]> {
    // Import the Google Cloud client library using default credentials
    const bigquery = new BigQuery();
    // Queries the U.S. given names dataset for the state of Texas.

    const query = `WITH
    result_set AS (
    SELECT
      number,
      timestamp,
      TIMESTAMP_DIFF(timestamp, LAG(timestamp) OVER (ORDER BY timestamp), SECOND) AS block_interval_in_seconds
    FROM
      bigquery-public-data.crypto_bitcoin.blocks )
    SELECT
      *
    FROM
      result_set
    WHERE
      block_interval_in_seconds > 7200 
    ORDER BY
      timestamp;`;

    // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
    const options = {
      query: query,
      // Location must match that of the dataset(s) referenced in the query.
      location: 'US',
    };

    // Run the query as a job
    const [job] = await bigquery.createQueryJob(options);
    console.log(`Job ${job.id} started.`);

    // Wait for the query to finish
    const [rows] = await job.getQueryResults();

    // results

    const transactions: DbTransaction[] = [];
    for (let i = 0; i < rows.length; i++) {
      const transaction = {
        number: rows[i].number,
        block_interval: rows[i].block_interval_in_seconds,
      };
      transactions.push(transaction);
    }

    return transactions;
  }

  // Create a new  transaction and save it to the database

  async saveToDatabase(): Promise<BigQueryTransaction[]> {
    const transactions = await this.getTransactions();
    // if already saved delete the existing data
    if (transactions) {
      await this.bigQueryRepository.delete({});
    }

    const saved = await this.bigQueryRepository.save(transactions);
    return saved;
  }
}
