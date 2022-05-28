import {Test, TestingModule} from '@nestjs/testing';
import {JwtService} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';
import {Request} from 'express';

import {TokensService} from '../../src/tokens/tokens.service';
import {mockedConfigService} from '../../src/utils/mocks/config.service';
import {mockedJwtService} from '../../src/utils/mocks/jwt.service';
import {mockedMeetingService} from '../../src/utils/mocks/meeting.service';
import {MeetingController} from './meeting.controller';
import {MeetingService} from './meeting.service';
import {getSampleMeeting} from 'test/testData';
import {mockedTokensService} from 'src/utils/mocks/tokens.service';
import {Meeting} from 'src/model/meeting.entity';
import {readMeetingDto} from './dto/readMeeting.dto';

describe('MeetingController', () => {
  let controller: MeetingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeetingController],
      providers: [
        MeetingService,
        {
          provide: TokensService,
          useValue: mockedTokensService,
        },
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
      ],
    })
      .overrideProvider(MeetingService)
      .useValue(mockedMeetingService)
      .compile();

    controller = module.get<MeetingController>(MeetingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a meeting', async () => {
    const mockReq = {
      body: {
        name: 'Test meeting',
        password: 'secretpassword',
        creatorName: 'Test creator',
        creatorEmail: 'test@email.com',
      },
    } as Request;
    expect(await controller.createMeeting(mockReq.body, mockReq)).toEqual(
      Object.assign(new Meeting(), {
        uuid: expect.stringMatching(
          /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
        ),
        id: expect.stringMatching(
          /^[0-9a-zA-Z]{3}\b-[0-9a-zA-Z]{3}\b-[0-9a-zA-Z]{3}$/,
        ),
        name: mockReq.body.name,
        password: mockReq.body.password,
        status: 'active',
      }),
    );
  });

  it('should read a meeting', async () => {
    const meetingUUID = getSampleMeeting().uuid;
    expect(await controller.readMeeting({meetingUUID})).toEqual(
      Object.assign(new Meeting(), {
        uuid: meetingUUID,
        name: getSampleMeeting().name,
        id: getSampleMeeting().id,
        status: getSampleMeeting().status,
        categories: getSampleMeeting().categories,
        authorizedUsers: getSampleMeeting().authorizedUsers,
        cards: getSampleMeeting().cards,
      }),
    );
  });

  it('should update a meeting', async () => {
    const mockReq = {
      body: {
        meeting: {
          uuid: getSampleMeeting().uuid,
          id: getSampleMeeting().id,
          name: 'Updated meeting',
          status: 'Done',
        },
      },
    } as Request;
    expect(await controller.updateMeeting(mockReq.body, mockReq)).toEqual(
      Object.assign(new Meeting(), {
        uuid: mockReq.body.meeting.uuid,
        id: mockReq.body.meeting.id,
        name: mockReq.body.meeting.name,
        status: mockReq.body.meeting.status,
        authorizedUsers: getSampleMeeting().authorizedUsers,
        categories: getSampleMeeting().categories,
      }),
    );
  });

  it('should update categories', async () => {
    const mockReq = {
      body: {
        categories: [],
        meeting: {
          uuid: getSampleMeeting().uuid,
        },
      },
    } as Request;
    expect(await controller.deleteCategories(mockReq.body, mockReq)).toEqual(
      Object.assign(new Meeting(), {
        uuid: getSampleMeeting().uuid,
        id: getSampleMeeting().id,
        name: getSampleMeeting().name,
        status: getSampleMeeting().status,
        authorizedUsers: getSampleMeeting().authorizedUsers,
        categories: [],
      }),
    );
  });

  it('should delete a meeting', async () => {
    const mockReq = {
      body: {
        meeting: {
          uuid: getSampleMeeting().uuid,
          id: getSampleMeeting().id,
        },
      },
    } as Request;
    expect(await controller.deleteMeeting(mockReq.body)).toEqual(
      `Deleted meeting with ID ${mockReq.body.meeting.id}`,
    );
  });

  // Failing cases when missing keys
  it('should fail creating meeting wit "Missing key(s)"', async () => {
    const mockReq = {
      body: {},
    } as Request;
    await expect(
      controller.createMeeting(mockReq.body, mockReq),
    ).rejects.toThrowError('Missing key(s)');
  });

  it('should fail reading user with "Missing key(s)"', async () => {
    const mockReq: readMeetingDto = {
      meetingUUID: '',
    };
    await expect(controller.readMeeting(mockReq)).rejects.toThrowError(
      'Missing key(s)',
    );
  });

  it('should fail updating user with "Missing key(s)"', async () => {
    const mockReq = {
      body: {},
    } as Request;
    await expect(
      controller.updateMeeting(mockReq.body, mockReq),
    ).rejects.toThrowError('Missing key(s)');
  });

  it('should fail deleting user with "Missing key(s)"', async () => {
    const mockReq = {
      body: {},
    } as Request;
    await expect(controller.deleteMeeting(mockReq.body)).rejects.toThrowError(
      'Missing key(s)',
    );
  });

  it('should fail updating meetings of a user with "Missing key(s)"', async () => {
    const mockReq = {
      body: {},
    } as Request;
    await expect(
      controller.deleteCategories(mockReq.body, mockReq),
    ).rejects.toThrowError('Missing key(s)');
  });
});
