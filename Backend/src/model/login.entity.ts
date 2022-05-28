import {IsBoolean, IsDate, IsString, IsUUID} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({name: 'logins'})
export class Login {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  uuid: string;

  @Column({type: 'text'})
  @IsString()
  loginCode: string;

  @Column({type: 'boolean'})
  @IsBoolean()
  codeUsed: boolean;

  @CreateDateColumn({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
  @IsDate()
  createdAt: Date;
}
