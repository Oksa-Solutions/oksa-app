import {IsUUID} from 'class-validator';
import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Profile} from './profile.entity';

@Entity({name: 'profile_settings'})
export class ProfileSetting {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  uuid: string;

  @OneToOne(() => Profile, (profile: Profile) => profile.settings)
  profile: Profile;

  @Column({type: 'jsonb'})
  background: {
    start: string;
    end: string;
  };
}
