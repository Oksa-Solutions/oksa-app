import {ApiProperty} from '@nestjs/swagger';
import {Profile} from 'src/model/profile.entity';
import {User} from 'src/model/user.entity';

export class createUserDto implements Readonly<createUserDto> {
  @ApiProperty({required: false})
  profile?: Profile;

  private static from(user: User): Partial<User> {
    const userObj = Object.assign(new User(), {
      uuid: user.uuid,
      authToken: user.authToken,
      refreshToken: user.refreshToken,
      profile: user?.profile || undefined,
      cards: user.cards,
      meetings: user.meetings,
    });
    Object.keys(userObj).forEach((key: string) => {
      if (userObj[key] === undefined) {
        delete userObj[key];
      }
    });
    return userObj;
  }

  public static fromEntity(user: User): Partial<User> {
    return this.from(user);
  }

  public static toEntity(
    user: createUserDto,
    authToken: string,
    refreshToken: string,
  ): User {
    const newUser: User = Object.assign(new User(), {
      ...user,
      authToken: authToken,
      refreshToken: refreshToken,
      cards: [],
      meetings: [],
      profile: user?.profile || null,
    });
    return newUser;
  }
}
