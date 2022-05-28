import {ApiProperty} from '@nestjs/swagger';
import {IsUUID} from 'class-validator';
import {readCardDto} from 'src/cards/dto/readCard.dto';
import {readMeetingDto} from 'src/meetings/dto/readMeeting.dto';
import {Card} from 'src/model/card.entity';
import {Meeting} from 'src/model/meeting.entity';
import {User} from 'src/model/user.entity';
import {readProfileDto} from 'src/profiles/dto/readProfile.dto';

export class readUserDto implements Readonly<readUserDto> {
  @ApiProperty({required: true})
  @IsUUID()
  uuid: string;

  private static from(user: User): Partial<User> {
    const userObj = Object.assign(new User(), {
      uuid: user.uuid,
      cards: user?.cards?.map((c: Card) => readCardDto.fromEntity(c)) || [],
      meetings: user?.meetings || [],
      authToken: user.authToken,
      refreshToken: user.refreshToken,
      profile: user?.profile || undefined,
    });
    return userObj;
  }

  public static fromEntity(user: User): Partial<User> {
    return this.from(user);
  }

  // public static toEntity() {}
}
