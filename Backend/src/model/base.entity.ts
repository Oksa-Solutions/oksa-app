import {
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {IsDate, IsUUID} from 'class-validator';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  uuid: string;

  @CreateDateColumn({
    type: 'timestamptz',
    update: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  @IsDate()
  created: Date;

  @Column({type: 'uuid', update: false})
  @IsUUID()
  createdBy: string;

  @UpdateDateColumn({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
  @IsDate()
  lastModified: Date;

  @Column({type: 'uuid'})
  @IsUUID()
  lastModifiedBy: string;
}
