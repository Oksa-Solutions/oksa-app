import {
  Entity,
  Column,
  BeforeInsert,
  OneToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import {IsJWT, IsArray} from 'class-validator';
import {v4 as uuidv4} from 'uuid';

import {BaseEntity} from './base.entity';
import {Profile} from './profile.entity';
import {Card} from './card.entity';
import {Meeting} from './meeting.entity';

@Entity({name: 'users'})
export class User extends BaseEntity {
  @BeforeInsert()
  private createUuid() {
    const uuid = uuidv4();
    this.uuid = uuid;
    this.createdBy = uuid;
    this.lastModifiedBy = uuid;
  }

  @Column({type: 'text', default: ''})
  @IsJWT()
  authToken: string;

  @Column({type: 'text', default: ''})
  @IsJWT()
  refreshToken: string;

  @OneToMany(() => Card, (card: Card) => card.author)
  @IsArray()
  cards: Card[];

  @ManyToMany(() => Meeting, (meeting: Meeting) => meeting.authorizedUsers)
  @IsArray()
  meetings: Meeting[];

  @OneToOne(() => Profile, (profile: Profile) => profile.user, {nullable: true})
  profile: Profile;
}
