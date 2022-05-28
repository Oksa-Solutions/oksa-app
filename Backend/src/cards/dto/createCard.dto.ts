import {ApiProperty} from '@nestjs/swagger';
import {IsString, IsUUID} from 'class-validator';
import {v4 as uuidv4} from 'uuid';

import {Card} from 'src/model/card.entity';
import {Meeting} from 'src/model/meeting.entity';
import {User} from 'src/model/user.entity';
import {
  CardDates,
  CategoryInterface,
  VoteInterface,
} from '../interfaces/card.interfaces';

export class createCardDto implements Readonly<createCardDto> {
  @ApiProperty({required: true})
  meeting: Meeting;

  @ApiProperty({required: true})
  @IsUUID()
  lastModifiedBy: string;

  @ApiProperty({required: true})
  author: User;

  @ApiProperty({required: false})
  @IsString()
  title?: string;

  @ApiProperty({required: false})
  @IsString()
  content?: string;

  @ApiProperty({required: false})
  categories?: CategoryInterface[];

  @ApiProperty({required: false})
  dates?: CardDates;

  @ApiProperty({required: false})
  votes?: VoteInterface;

  @ApiProperty({required: false})
  @IsString()
  status?: string;

  @ApiProperty({required: false})
  @IsString()
  taskStatus?: string;

  private static from(dto: Card): Partial<Card> {
    const card = Object.assign(new Card(), {
      uuid: dto.uuid,
      meeting: {
        uuid: dto?.meeting?.uuid || undefined,
      },
      author: {
        uuid: dto.author.uuid,
      },
      title: dto?.title || '',
      content: dto?.content || '',
      categories: dto?.categories || [],
      dates: dto?.dates || {startDate: null, endDate: null},
      votes: dto?.votes || {yes: [], no: []},
      status: dto?.status || '',
      taskStatus: dto?.taskStatus || '',
    });
    return card;
  }

  public static fromEntity(entity: Card): Partial<Card> {
    return this.from(entity);
  }

  public static toEntity(card: createCardDto): Card {
    const newCard = new Card();
    newCard.uuid = uuidv4();
    newCard.meeting = card.meeting;
    newCard.createdBy = card.lastModifiedBy;
    newCard.lastModifiedBy = card.lastModifiedBy;
    newCard.author = card.author;
    newCard.title = card?.title || '';
    newCard.content = card?.content || '';
    newCard.categories = card?.categories || [];
    newCard.dates = card?.dates || {startDate: null, endDate: null};
    newCard.votes = card?.votes || {yes: [], no: []};
    newCard.status = card?.status || 'Waiting';
    newCard.taskStatus = card?.taskStatus || '';
    newCard.deleted = false;
    return newCard;
  }
}
