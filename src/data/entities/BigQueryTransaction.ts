import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity()
export class BigQueryTransaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  number: number;

  @Column({ nullable: true })
  block_interval: number;
}
