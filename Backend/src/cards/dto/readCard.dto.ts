import {ApiProperty} from '@nestjs/swagger';
import {IsString, IsUUID} from 'class-validator';
import {Card} from 'src/model/card.entity';

export class readCardDto implements Readonly<readCardDto> {
  @ApiProperty({required: true})
  @IsString()
  meetingUUID: string;

  @ApiProperty({required: true})
  @IsUUID()
  uuid: string;

  private static from(dto: Card): Partial<Card> {
    const card = Object.assign(new Card(), {
      uuid: dto.uuid,
      author: {uuid: dto.createdBy},
      categories: dto?.categories || [],
      content: dto?.content || '',
      dates: dto?.dates || {startDate: null, endDate: null},
      status: dto?.status || '',
      taskStatus: dto?.taskStatus || '',
      title: dto?.title || '',
      votes: dto?.votes || {yes: [], no: []},
      meeting: {uuid: dto?.meeting?.uuid} || undefined,
    });
    return card;
  }

  public static fromEntity(entity: Card): Partial<Card> {
    return this.from(entity);
  }
}
