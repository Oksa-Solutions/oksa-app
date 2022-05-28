import {OrganisationInterface} from '~/store/modules/organisation';
import {ProfileInterface} from '~/store/modules/profile';

export interface createTeamDto {
  name: string;
  admins?: Partial<ProfileInterface>[];
  users?: Partial<ProfileInterface>[];
  organisation: OrganisationInterface;
}

export interface readTeamDto {
  uuid: string;
}

export interface updateTeamDto {
  uuid: string;
  organisation: OrganisationInterface;
  name?: string;
  admins?: Partial<ProfileInterface>[];
}

export interface addTeamMembersDto {
  uuid: string;
  organisation: OrganisationInterface;
  users: Partial<ProfileInterface>[];
}
