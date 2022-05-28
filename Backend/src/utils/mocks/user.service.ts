import {Meeting} from 'src/model/meeting.entity';
import {User} from 'src/model/user.entity';
import {createUserDto} from 'src/user/dto/createUser.dto';
import {deleteUserDto} from 'src/user/dto/deleteUser.dto';
import {readUserDto} from 'src/user/dto/readUser.dto';
import {updateUserDto} from 'src/user/dto/updateUser.dto';
import {updateUserMeetingsDto} from 'src/user/dto/updateUserMeetings.dto';
import {getSampleUser} from 'test/testData';
import {v4 as uuidv4} from 'uuid';

export const mockedUserService = {
  createUser: jest.fn().mockImplementation((dto: createUserDto) => {
    return {
      ok: true,
      data: Object.assign(new User(), {
        uuid: uuidv4(),
        profile: dto?.profile || undefined,
        authToken: 'InitialTestAuthToken',
        refreshToken: 'InitialTestRefreshToken',
        cards: [],
        meetings: [],
      }),
    };
  }),
  readUser: jest.fn().mockImplementation((dto: readUserDto) => {
    return {
      ok: true,
      data: Object.assign(new User(), {
        ...getSampleUser(),
        uuid: dto.uuid,
      }),
    };
  }),

  updateUser: jest.fn().mockImplementation((dto: updateUserDto) => {
    return {
      ok: true,
      data: Object.assign(getSampleUser(), dto),
    };
  }),

  updateUserMeetings: jest
    .fn()
    .mockImplementation((dto: updateUserMeetingsDto) => {
      const user = Object.assign(new User(), getSampleUser());
      const meetings = user.meetings.filter((m: Meeting) => {
        m.uuid !== dto.meeting.uuid;
      });
      if (dto.add) {
        meetings.push(dto.meeting);
      }
      user.meetings = meetings;
      return {
        ok: true,
        data: user,
      };
    }),

  deleteUser: jest.fn().mockImplementation((dto: deleteUserDto) => {
    return {
      ok: true,
      data: `Deleted user with UUID ${dto.uuid}`,
    };
  }),
};
