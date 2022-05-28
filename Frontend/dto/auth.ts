import {MeetingInterface} from '~/store/modules/meeting';

export interface authMeetingDto {
  uuid: string;
  meeting: MeetingInterface;
  password: string;
}
