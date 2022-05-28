import {SettingsInterface} from '~/store/modules/profile';
import {UserInterface} from '~/store/modules/user';

export interface createProfileDto {
  user: UserInterface;
  name: string;
  email?: string;
  phoneNumber?: string;
}

export interface readProfileDto {
  uuid: string;
}

export interface updateProfileDto {
  uuid: string;
  user: UserInterface;
  name?: string;
  email?: string;
  phoneNumber?: string;
  settings?: SettingsInterface;
}

export interface deleteProfileDto {
  uuid: string;
  user: UserInterface;
}
