import {IsString, IsUUID} from 'class-validator';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';

import {Profile} from './profile.entity';

@Entity({name: 'subscriptions'})
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  uuid: string;

  @Column({type: 'varchar'})
  @IsString()
  subscription: string;

  @OneToMany(() => Profile, (profile: Profile) => profile.subscription)
  profile: Profile;
}
