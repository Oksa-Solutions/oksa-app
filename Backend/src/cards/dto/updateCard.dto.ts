import {ApiProperty} from '@nestjs/swagger';
import {IsBoolean, IsString, IsUUID} from 'class-validator';

import {CardDates, CategoryInterface} from '../interfaces/card.interfaces';
import {Card} from 'src/model/card.entity';
import {Meeting} from 'src/model/meeting.entity';

export class updateCardDto implements Readonly<updateCardDto> {
  @ApiProperty({required: true})
  meeting: Meeting;

  @ApiProperty({required: true})
  @IsUUID()
  uuid: string;

  @ApiProperty({required: true})
  @IsUUID()
  lastModifiedBy: string;

  @ApiProperty({required: false})
  categories?: CategoryInterface[];

  @ApiProperty({required: false})
  @IsString()
  title?: string;

  @ApiProperty({required: false})
  @IsString()
  content?: string;

  @ApiProperty({required: false})
  @IsString()
  status?: string;

  @ApiProperty({required: false})
  @IsBoolean()
  deleted?: boolean;

  @ApiProperty({required: false})
  dates?: CardDates;

  private static from(dto: Card): Partial<Card> {
    const card = Object.assign(new Card(), {
      uuid: dto.uuid,
      meeting: {uuid: dto?.meeting?.uuid || undefined},
      title: dto?.title,
      content: dto?.content,
      categories: dto?.categories || undefined,
      dates: dto?.dates || undefined,
      votes: dto?.votes || undefined,
      status: dto?.status || undefined,
      taskStatus: dto?.taskStatus || undefined,
      author: {uuid: dto?.author?.uuid},
    });
    return card;
  }

  public static fromEntity(entity: Card): Partial<Card> {
    return this.from(entity);
  }

  public static toEntity(card: Partial<Card>): Card {
    const updateSet: Card = Object.assign(new Card(), card);
    updateSet.lastModifiedBy = card.lastModifiedBy;
    Object.keys(updateSet).forEach((key: string) => {
      if (updateSet[key] === undefined) {
        delete updateSet[key];
      }
    });
    return updateSet;
  }
}
