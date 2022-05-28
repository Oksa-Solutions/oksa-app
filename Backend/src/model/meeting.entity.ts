import {
  Entity,
  Column,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinTable,
  Index,
} from 'typeorm';
import {IsPhoneNumber, IsEmail, IsString, IsArray} from 'class-validator';
import {BaseEntity} from './base.entity';
import {CategoryInterface} from 'src/cards/interfaces/card.interfaces';
import {Card} from './card.entity';
import {User} from './user.entity';
import {Team} from './team.entity';

@Entity({name: 'meetings'})
export class Meeting extends BaseEntity {
  @Column({type: 'varchar', length: 11, unique: true})
  @IsString()
  id: string;

  @Column({type: 'varchar', length: 300})
  @IsString()
  creatorName: string;

  @Column({type: 'varchar', length: 300, nullable: true})
  @IsEmail()
  creatorEmail: string;

  @Column({type: 'varchar', length: 20, nullable: true})
  @IsPhoneNumber('ZZ')
  creatorPhoneNumber: string;

  @Column({type: 'varchar', length: 300})
  @IsString()
  password: string;

  @Column({type: 'varchar', length: 50})
  @IsString()
  status: string;

  @Column({type: 'varchar', length: 300})
  @IsString()
  name: string;

  @Column({type: 'jsonb', nullable: true})
  @IsArray()
  categories: CategoryInterface[];

  @ManyToMany(() => User, (user: User) => user.meetings, {cascade: true})
  @JoinTable()
  @IsArray()
  authorizedUsers: User[];

  @OneToMany(() => Card, (card: Card) => card.meeting)
  @IsArray()
  cards: Card[];

  @Index()
  @ManyToOne(() => Team, (team: Team) => team.topics)
  team: Team;
}
