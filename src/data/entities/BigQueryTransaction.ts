import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Timestamp,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity()
export class BigQueryTransaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  timestamp: string;

  @Column({ nullable: true })
  number: number;

  @Column({ nullable: true })
  block_interval: number;
}
