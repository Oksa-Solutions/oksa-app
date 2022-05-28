import {CategoryInterface} from '~/store/modules/cards';
import {MeetingInterface} from '../store/modules/meeting';

export interface createMeetingDto {
  name: string;
  password: string;
  createdBy: string;
  creatorName: string;
  creatorEmail: string;
  creatorPhoneNumber?: string;
}

export interface readMeetingDto {
  meetingUUID: string;
}

export interface updateMeetingDto {
  meeting: MeetingInterface;
}

export interface deleteCategoryDto {
  meeting: {
    uuid: string;
  };
  categories: CategoryInterface[];
}

export interface deleteMeetingDto {
  meeting: MeetingInterface;
  uuid: string;
}
