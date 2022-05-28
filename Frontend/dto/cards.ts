import {UserInterface} from '../store/modules/user';
import {
  CardInterface,
  CategoryInterface,
  DatesInterface,
  VotesInterface,
} from '../store/modules/cards';
import {MeetingInterface} from '~/store/modules/meeting';

export interface createCardDto {
  meeting: MeetingInterface;
  author: UserInterface;
  title?: string;
  content?: string;
  categories?: CategoryInterface[];
  status?: string;
  dates?: DatesInterface;
  votes?: VotesInterface;
}

export interface readCardDto {
  meetingUUID: string;
  uuid?: string;
}

export interface updateCardDto {
  uuid: string;
  meeting: MeetingInterface;
  title?: string;
  categories?: CategoryInterface[];
  content?: string;
  status?: string;
  taskStatus?: string;
  dates?: DatesInterface;
}

export interface deleteCardDto {
  meeting: MeetingInterface;
  uuid: string;
  remover: string;
}

export interface voteCardDto {
  meeting: MeetingInterface;
  uuid: string;
  id: string;
  agree: boolean;
  addVote: boolean;
}
