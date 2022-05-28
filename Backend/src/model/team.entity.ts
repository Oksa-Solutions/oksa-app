import {IsString} from 'class-validator';
import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Index,
} from 'typeorm';

import {BaseEntity} from './base.entity';
import {Meeting} from './meeting.entity';
import {Organisation} from './organisation.entity';
import {Profile} from './profile.entity';

@Entity({name: 'teams'})
export class Team extends BaseEntity {
  @Column({type: 'varchar'})
  @IsString()
  name: string;

  @Index()
  @ManyToOne(
    () => Organisation,
    (organisation: Organisation) => organisation.teams,
  )
  organisation: Organisation;

  @OneToMany(() => Meeting, (meeting: Meeting) => meeting.team)
  topics: Meeting[];

  @ManyToMany(() => Profile, (profile: Profile) => profile.teams, {
    cascade: true,
  })
  @JoinTable()
  users: Profile[];

  @ManyToMany(() => Profile, (profile: Profile) => profile.adminTeams, {
    cascade: true,
  })
  @JoinTable()
  admins: Profile[];

  @Column({type: 'boolean', default: false})
  archived: boolean;
}
