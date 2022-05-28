import {IsString, IsEmail, IsArray} from 'class-validator';
import {Column, Entity, JoinTable, ManyToMany, OneToMany} from 'typeorm';
import {BaseEntity} from './base.entity';
import {Profile} from './profile.entity';
import {Team} from './team.entity';

@Entity({name: 'organisations'})
export class Organisation extends BaseEntity {
  @Column({type: 'varchar', unique: true})
  @IsString()
  name: string;

  @Column({type: 'varchar', nullable: true})
  @IsString()
  contactPerson: string;

  @Column({type: 'varchar', nullable: true})
  @IsEmail()
  contactEmail: string;

  @Column({type: 'varchar', nullable: true})
  domain: string;

  @ManyToMany(() => Profile, (profile: Profile) => profile.organisations, {
    cascade: true,
  })
  @JoinTable()
  users: Partial<Profile>[];

  @ManyToMany(() => Profile, (profile: Profile) => profile.adminOrganisations, {
    cascade: true,
  })
  @JoinTable()
  admins: Partial<Profile>[];

  @OneToMany(() => Team, (team: Team) => team.organisation)
  @IsArray()
  teams: Team[];
}
