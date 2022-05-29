import {ProfileInterface} from '~/store/modules/profile';

export interface createOrganisationDto {
  name: string;
  contactEmail: string;
  contactPerson: string;
  admins: ProfileInterface[];
}

export interface readOrganisationDto {
  uuid: string;
}

export interface updateOrganisationDto {
  uuid: string;
  name?: string;
  contactEmail?: string;
  contactPerson?: string;
  admins?: ProfileInterface[];
}

export interface deleteOrganisationDto {}

export interface addOrganisationMembersDto {
  uuid: string;
  users: ProfileInterface[];
}
