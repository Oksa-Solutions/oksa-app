import {IsArray, IsPhoneNumber, IsString} from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  Index,
} from 'typeorm';
import {BaseEntity} from './base.entity';
import {Organisation} from './organisation.entity';
import {ProfileSetting} from './profileSettings.entity';
import {Subscription} from './subscription.entity';
import {Team} from './team.entity';
import {User} from './user.entity';

@Entity({name: 'profiles'})
export class Profile extends BaseEntity {
  @Column({type: 'varchar', length: 300})
  @IsString()
  name: string;

  @Column({type: 'text', nullable: true, unique: true})
  @IsString()
  email: string;

  @Column({type: 'text', nullable: true, unique: true})
  @IsPhoneNumber('ZZ')
  phoneNumber: string;

  @OneToOne(() => User, (user: User) => user.profile)
  @JoinColumn()
  user: User;

  @Column({type: 'simple-array', nullable: true})
  @IsArray()
  ip: string[];

  @ManyToMany(
    () => Organisation,
    (organisation: Organisation) => organisation.users,
  )
  @IsArray()
  organisations: Organisation[];

  @ManyToMany(
    () => Organisation,
    (organisation: Organisation) => organisation.admins,
  )
  @IsArray()
  adminOrganisations: Organisation[];

  @ManyToMany(() => Team, (team: Team) => team.users)
  @IsArray()
  teams: Team[];

  @ManyToMany(() => Team, (team: Team) => team.admins)
  @IsArray()
  adminTeams: Team[];

  @OneToOne(
    () => ProfileSetting,
    (settings: ProfileSetting) => settings.profile,
  )
  @JoinColumn()
  settings: ProfileSetting;

  @Index()
  @ManyToOne(
    () => Subscription,
    (subscription: Subscription) => subscription.profile,
  )
  @IsString()
  subscription: Subscription;
}
