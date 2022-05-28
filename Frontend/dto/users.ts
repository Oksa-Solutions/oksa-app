import {MeetingInterface} from '~/store/modules/meeting';
import {ProfileInterface} from '~/store/modules/profile';

export interface createUserDto {
  uuid: string;
  authToken: string;
  refreshToken: string;
  profile: ProfileInterface;
}

export interface readUserDto {
  uuid: string;
}

export interface updateUserDto {
  uuid: string;
  profile?: ProfileInterface;
}

export interface updateUserMeetingsDto {
  uuid: string;
  add: boolean;
  meeting: MeetingInterface;
}

export interface deleteUserDto {
  uuid: string;
}

export interface getUsersMeetings {
  uuid: string;
}
