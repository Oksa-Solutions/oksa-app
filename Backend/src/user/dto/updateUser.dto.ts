import {ApiProperty} from '@nestjs/swagger';
import {IsString, IsUUID} from 'class-validator';
import {readCardDto} from 'src/cards/dto/readCard.dto';
import {readMeetingDto} from 'src/meetings/dto/readMeeting.dto';
import {Card} from 'src/model/card.entity';
import {Meeting} from 'src/model/meeting.entity';
import {Profile} from 'src/model/profile.entity';
import {User} from 'src/model/user.entity';

export class updateUserDto {
  @ApiProperty({required: true})
  @IsUUID()
  uuid: string;

  @ApiProperty({required: true})
  @IsUUID()
  lastModifiedBy: string;

  @ApiProperty({required: false})
  @IsString()
  authToken?: string;

  @ApiProperty({required: false})
  @IsString()
  refreshToken?: string;

  @ApiProperty({required: false})
  profile?: Profile;

  private static from(user: Partial<User>): Partial<User> {
    const newUser = Object.assign(new User(), {
      uuid: user.uuid,
      authToken: user?.authToken || undefined,
      refreshToken: user?.refreshToken || undefined,
      profile: user?.profile || undefined,
    });
    if (user?.meetings) {
      Object.assign(newUser, {
        meetings:
          user?.meetings?.map((m: Meeting) => readMeetingDto.fromEntity(m)) ||
          undefined,
      });
    }
    if (user?.cards) {
      Object.assign(newUser, {
        cards:
          user?.cards
            ?.filter((c: Card) => !c.deleted)
            .map((c: Card) => readCardDto.fromEntity(c)) || undefined,
      });
    }
    return newUser;
  }

  public static fromEntity(user: Partial<User>): Partial<User> {
    return this.from(user);
  }

  public static toEntity(user: updateUserDto, dbUser: User): User {
    const newUser = Object.assign(new User(), {
      uuid: user.uuid,
      authToken: user?.authToken || dbUser.authToken,
      refreshToken: user?.refreshToken || dbUser.refreshToken,
      lastModifiedBy: user.uuid,
      profile: user?.profile || undefined,
    });

    Object.keys(newUser).forEach((key: string) => {
      if (newUser[key] === undefined) {
        delete newUser[key];
      }
    });
    return newUser;
  }
}
