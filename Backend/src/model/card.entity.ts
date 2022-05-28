import {Entity, Column, Index, ManyToOne} from 'typeorm';

import {BaseEntity} from './base.entity';
import {
  CardDates,
  CategoryInterface,
  VoteInterface,
} from 'src/cards/interfaces/card.interfaces';
import {User} from './user.entity';
import {Meeting} from './meeting.entity';

@Entity({name: 'cards'})
export class Card extends BaseEntity {
  @ManyToOne(() => User, (author: User) => author.cards)
  author: User;

  @Column({type: 'jsonb', nullable: true})
  categories: CategoryInterface[];

  @Column({type: 'text'})
  content: string;

  @Column({type: 'jsonb', nullable: true})
  dates: CardDates;

  @Column({type: 'boolean'})
  deleted: boolean;

  @Index()
  @ManyToOne(() => Meeting, (meeting: Meeting) => meeting.cards)
  meeting: Meeting;

  @Column({type: 'varchar', length: 50})
  status: string;

  @Column({type: 'varchar', length: 50, nullable: true})
  taskStatus: string;

  @Column({type: 'varchar', length: 300})
  title: string;

  @Column({type: 'jsonb', nullable: true})
  votes: VoteInterface;

  @Column({type: 'varchar', length: 36, nullable: true})
  remover: string;

  @Column({type: 'timestamptz', nullable: true})
  deletedAt: Date;
}
