import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {CardService} from 'src/cards/card.service';

import {Meeting} from 'src/model/meeting.entity';
import {User} from 'src/model/user.entity';
import {UserService} from 'src/user/user.service';
import {mockedCardService} from 'src/utils/mocks/card.service';
import {
  mockMeetingRepository,
  mockUserRepository,
} from 'src/utils/mocks/repositories';
import {mockedUserService} from 'src/utils/mocks/user.service';
import {
  createMeetingOk,
  deleteCategoryOk,
  deleteMeetingOk,
  getSampleCard,
  getSampleMeeting,
  getUsersMeetingsOk,
  readMeetingOk,
  updateMeetingOk,
} from 'test/testData';
import {MeetingService} from './meeting.service';

describe('MeetingService', () => {
  let service: MeetingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MeetingService,
        {
          provide: getRepositoryToken(Meeting),
          useValue: mockMeetingRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: UserService,
          useValue: mockedUserService,
        },
        {
          provide: CardService,
          useValue: mockedCardService,
        },
      ],
    }).compile();

    service = module.get<MeetingService>(MeetingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a meeting', async () => {
    jest.spyOn(service as any, 'sendTopicDetail').mockImplementation(() => {});
    expect(await service.createMeeting(createMeetingOk)).toEqual({
      ok: true,
      data: Object.assign(new Meeting(), {
        ...createMeetingOk,
        uuid: expect.stringMatching(
          /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
        ),
        id: expect.stringMatching(
          /^[0-9a-zA-Z]{3}\b-[0-9a-zA-Z]{3}\b-[0-9a-zA-Z]{3}$/,
        ),
        authorizedUsers: [],
        categories: [],
        creatorPhoneNumber: undefined,
        lastModifiedBy: createMeetingOk.createdBy,
        status: 'active',
      }),
    });
  });

  it('should read a meeting', async () => {
    expect(await service.readMeeting(readMeetingOk)).toEqual({
      ok: true,
      data: Object.assign(new Meeting(), {
        ...getSampleMeeting(),
        cards: [getSampleCard()],
      }),
    });
  });

  it('should update a meeting', async () => {
    expect(await service.updateMeeting(updateMeetingOk)).toEqual({
      ok: true,
      data: Object.assign(new Meeting(), {
        uuid: getSampleMeeting().uuid,
        id: 'abc-123-xyz',
        name: 'Modified test meeting',
        status: getSampleMeeting().status,
        lastModifiedBy: updateMeetingOk.lastModifiedBy,
        categories: [{name: 'Test category', color: '#F9BB22'}],
        authorizedUsers: [],
      }),
    });
  });

  it("should read user's meetings", async () => {
    expect(await service.getUsersMeetings(getUsersMeetingsOk)).toEqual({
      ok: true,
      data: [getSampleMeeting()],
    });
  });

  it('should delete a meeting', async () => {
    expect(await service.deleteMeeting(deleteMeetingOk)).toEqual({
      ok: true,
      data: `Deleted meeting with ID ${deleteMeetingOk.meeting.id}`,
    });
  });

  it('should delete category from meeting', async () => {
    expect(await service.deleteCategory(deleteCategoryOk)).toEqual({
      ok: true,
      data: Object.assign(new Meeting(), {
        ...getSampleMeeting(),
        categories: [],
        cards: [getSampleCard()],
      }),
    });
  });

  // Failing tests
  it('should fail creating a meeting', async () => {
    jest
      .spyOn(mockMeetingRepository, 'save')
      .mockRejectedValue('Mocked create meeting failure');
    expect(await service.createMeeting(createMeetingOk)).toEqual({
      ok: false,
      data: 'Creating meeting failed',
    });
  });

  it('should fail creating a meeting, because id exists', async () => {
    const id = '123-abc-456';
    jest.spyOn(service as any, 'createNewID').mockReturnValue(id);
    jest
      .spyOn(mockMeetingRepository, 'save')
      .mockImplementation(() =>
        Promise.reject({detail: `Key (id)=(${id}) already exists.`}),
      );

    expect(await service.createMeeting(createMeetingOk)).toEqual({
      ok: false,
      data: 'Could not create unique ID',
    });
  }, 60000);

  it('should fail reading a meeting', async () => {
    jest
      .spyOn(mockMeetingRepository, 'findOne')
      .mockImplementation(() => Promise.reject('Mocked read meeting failure'));
    expect(await service.readMeeting(readMeetingOk)).toEqual({
      ok: false,
      data: 'Reading meeting failed',
    });
  });

  it("should fail getting user's meetings", async () => {
    jest
      .spyOn(mockUserRepository, 'findOne')
      .mockImplementation(() =>
        Promise.reject('Mocked reading meetings failure'),
      );
    expect(await service.getUsersMeetings(getUsersMeetingsOk)).toEqual({
      ok: false,
      data: 'Reading meetings failed',
    });
  });

  it('should fail updating a meeting', async () => {
    jest
      .spyOn(mockMeetingRepository, 'save')
      .mockImplementation(() =>
        Promise.reject('Mocked update meeting failure'),
      );
    expect(await service.updateMeeting(updateMeetingOk)).toEqual({
      ok: false,
      data: 'Updating meeting failed',
    });
  });

  it('should fail deleting a meeting since it does not exist', async () => {
    jest
      .spyOn(mockMeetingRepository, 'delete')
      .mockResolvedValue({affected: 0});
    expect(await service.deleteMeeting(deleteMeetingOk)).toEqual({
      ok: true,
      data: `No meeting with ID ${deleteMeetingOk.meeting.id}`,
    });
  });

  it('should fail deleting a meeting', async () => {
    jest
      .spyOn(mockMeetingRepository, 'delete')
      .mockImplementation(() =>
        Promise.reject('Mocked delete meeting failure'),
      );
    expect(await service.deleteMeeting(deleteMeetingOk)).toEqual({
      ok: false,
      data: 'Deleting meeting failed',
    });
  });

  it('should fail deleting category on a meeting', async () => {
    jest
      .spyOn(mockMeetingRepository, 'save')
      .mockImplementation(() =>
        Promise.reject('Mocked voting meeting failure'),
      );
    expect(await service.deleteCategory(deleteCategoryOk)).toEqual({
      ok: false,
      data: 'Updating categories failed',
    });
  });
});
