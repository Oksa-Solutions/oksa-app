import {ApiProperty} from '@nestjs/swagger';
import {IsBoolean, IsUUID} from 'class-validator';
import {Card} from 'src/model/card.entity';
import {Meeting} from 'src/model/meeting.entity';

import {VoteInterface} from '../interfaces/card.interfaces';

export class voteCardDto implements Readonly<voteCardDto> {
  @ApiProperty({required: true})
  meeting: Meeting;

  @ApiProperty({required: true})
  @IsUUID()
  uuid: string;

  @ApiProperty({required: true})
  @IsUUID()
  id: string;

  @ApiProperty({required: true})
  @IsBoolean()
  agree: boolean;

  @ApiProperty({required: true})
  @IsBoolean()
  addVote: boolean;

  private static from(dto: Partial<Card>): Partial<Card> {
    const card = Object.assign(new Card(), {
      meeting: {uuid: dto?.meeting?.uuid || undefined},
      uuid: dto.uuid,
      votes: dto.votes,
    });
    return card;
  }

  public static fromEntity(entity: Partial<Card>): Partial<Card> {
    return this.from(entity);
  }

  public static toEntity(
    card: voteCardDto,
    votes: VoteInterface,
  ): VoteInterface {
    const updatedVotes: string[] = votes[card.agree ? 'yes' : 'no'].filter(
      (voter: string) => voter !== card.id,
    );
    if (card?.addVote) {
      updatedVotes.push(card.id);
      votes[card?.agree ? 'no' : 'yes'] = votes[
        card?.agree ? 'no' : 'yes'
      ].filter((voter: string) => voter !== card.id);
    }
    votes[card?.agree ? 'yes' : 'no'] = updatedVotes;
    return votes;
  }
}
