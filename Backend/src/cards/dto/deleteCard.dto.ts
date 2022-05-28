import {ApiProperty} from '@nestjs/swagger';
import {IsUUID} from 'class-validator';

import {Card} from 'src/model/card.entity';
import {Meeting} from 'src/model/meeting.entity';

export class deleteCardDto implements Readonly<deleteCardDto> {
  @ApiProperty({required: true})
  meeting: Meeting;

  @ApiProperty({required: true})
  @IsUUID()
  uuid: string;

  @ApiProperty({required: true})
  @IsUUID()
  remover: string;

  public static toEntity(card: deleteCardDto): Card {
    const cardObj: Card = Object.assign(new Card(), {
      ...card,
      deleted: true,
      deletedAt: new Date(),
    });
    Object.keys(cardObj).forEach((key: string) => {
      if (cardObj[key] === undefined) {
        delete cardObj[key];
      }
    });
    return cardObj;
  }
}
