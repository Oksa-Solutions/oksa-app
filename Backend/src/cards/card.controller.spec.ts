import {Test, TestingModule} from '@nestjs/testing';
import {JwtService} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';
import {Request} from 'express';

import {CardController} from './card.controller';
import {CardService} from './card.service';
import {TokensService} from 'src/tokens/tokens.service';

import {mockedJwtService} from 'src/utils/mocks/jwt.service';
import {mockedConfigService} from 'src/utils/mocks/config.service';
import {mockedCardService} from 'src/utils/mocks/card.service';
import {mockedTokensService} from 'src/utils/mocks/tokens.service';
import {getSampleCard, getSampleMeeting, getSampleUser} from 'test/testData';
import {Card} from 'src/model/card.entity';
import {readCardDto} from './dto/readCard.dto';

describe('CardController', () => {
  let controller: CardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardController],
      providers: [
        CardService,
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
      .overrideProvider(CardService)
      .useValue(mockedCardService)
      .compile();

    controller = module.get<CardController>(CardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a card', async () => {
    const mockReq = {
      // headers: {
      //   authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZWV0aW5ncyI6WyJiNWQ2YzUwMC04OGFlLTQxYWQtYWIzOS05NGI0MzFlMTc2NDgiLCIwODczOTllZi00ZjI5LTQzMjMtYTcwOS1lNWY3YTk0Nzg3NjQiXSwidXVpZCI6ImQzZjQ0ZTA1LWVkZmEtNDA1Yi04ZmY3LWI5NDExYzQ4Zjk4ZiIsIm9yZ2FuaXNhdGlvbnMiOltdLCJpYXQiOjE2MTg0NzA4MDIsImV4cCI6MTYxODQ3MTcwMn0.e3MV2p_ObSXQiNXqS6_JLbpZs7iGMvDI_6TMrIR5gqo',
      // },
      body: {
        meeting: getSampleMeeting(),
        author: getSampleUser(),
        title: 'Test card',
        content: 'Test card content',
        categories: [{color: '#F9BB22', name: 'Test category'}],
      },
    } as Request;
    const res = await controller.createCard(mockReq.body, mockReq);

    expect(res).toEqual(
      Object.assign(new Card(), {
        uuid: expect.stringMatching(
          /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
        ),
        author: {
          uuid: getSampleUser().uuid,
        },
        categories: mockReq.body.categories,
        title: mockReq.body.title,
        content: mockReq.body.content,
        dates: {
          startDate: null,
          endDate: null,
        },
        meeting: {
          uuid: getSampleMeeting().uuid,
        },
        status: 'Waiting',
        taskStatus: '',
        votes: {
          yes: [],
          no: [],
        },
      }),
    );
  });

  it('should read a card', async () => {
    const uuid = getSampleCard().uuid;
    const meetingUUID = getSampleMeeting().uuid;
    expect(await controller.readCard({uuid, meetingUUID})).toEqual(
      Object.assign(new Card(), {
        uuid: uuid,
        meeting: {uuid: getSampleMeeting().uuid},
        author: {uuid: getSampleUser().uuid},
        title: getSampleCard().title,
        content: getSampleCard().content,
        categories: getSampleCard().categories,
        votes: getSampleCard().votes,
        status: getSampleCard().status,
        taskStatus: getSampleCard().taskStatus,
        dates: getSampleCard().dates,
      }),
    );
  });

  it('should read all active cards', async () => {
    const meetingUUID = getSampleMeeting().uuid;
    expect(await controller.readAllCards({meetingUUID})).toEqual([
      Object.assign(new Card(), {
        uuid: getSampleCard().uuid,
        meeting: {uuid: getSampleMeeting().uuid},
        author: {uuid: getSampleUser().uuid},
        title: getSampleCard().title,
        content: getSampleCard().content,
        categories: getSampleCard().categories,
        votes: getSampleCard().votes,
        status: getSampleCard().status,
        taskStatus: getSampleCard().taskStatus,
        dates: getSampleCard().dates,
      }),
    ]);
  });

  it('should read all deleted cards', async () => {
    const meetingUUID = getSampleMeeting().uuid;
    expect(await controller.readDeleted({meetingUUID})).toEqual([]);
  });

  it('should update a card', async () => {
    const mockReq = {
      body: {
        uuid: getSampleCard().uuid,
        meeting: getSampleMeeting(),
        author: getSampleUser(),
        title: 'Test card',
        content: 'Test card content',
        categories: [{color: '#F9BB22', name: 'Test category update'}],
        status: 'Updated test status',
        taskStatus: 'Updated test task status',
      },
    } as Request;
    expect(await controller.updateCard(mockReq.body, mockReq)).toEqual(
      Object.assign(new Card(), {
        uuid: getSampleCard().uuid,
        meeting: {uuid: getSampleMeeting().uuid},
        author: {uuid: getSampleUser().uuid},
        title: mockReq.body.title,
        content: mockReq.body.content,
        categories: mockReq.body.categories,
        votes: getSampleCard().votes,
        status: mockReq.body.status,
        taskStatus: mockReq.body.taskStatus,
        dates: getSampleCard().dates,
      }),
    );
  });

  it('should delete a card', async () => {
    const mockReq = {
      body: {
        uuid: getSampleCard().uuid,
        meeting: {uuid: getSampleMeeting().uuid},
        remover: {uuid: getSampleUser().uuid},
      },
    } as Request;
    expect(await controller.deleteCard(mockReq.body)).toEqual(
      `Deleted card with UUID ${mockReq.body.uuid}`,
    );
  });

  it('should add vote on a card', async () => {
    const mockReq = {
      body: {
        meeting: {uuid: getSampleMeeting().uuid},
        uuid: getSampleCard().uuid,
        id: getSampleUser().uuid,
        agree: true,
        addVote: true,
      },
    } as Request;
    expect(await controller.vote(mockReq.body)).toEqual({
      uuid: getSampleCard().uuid,
      meeting: {uuid: getSampleMeeting().uuid},
      votes: {yes: [mockReq.body.id], no: []},
    });
  });

  // Failing cases when missing keys
  it('should fail creating card with "Missing key(s)"', async () => {
    const mockReq = {
      body: {},
    } as Request;
    await expect(
      controller.createCard(mockReq.body, mockReq),
    ).rejects.toThrowError('Missing key(s)');
  });

  it('should fail reading card with "Missing key(s)"', async () => {
    const mockReq: readCardDto = {
      uuid: '',
      meetingUUID: '',
    };
    await expect(controller.readCard(mockReq)).rejects.toThrowError(
      'Missing key(s)',
    );
  });

  it('should fail reading all cards with "Missing key(s)"', async () => {
    const mockReq: readCardDto = {
      uuid: '',
      meetingUUID: '',
    };
    await expect(controller.readAllCards(mockReq)).rejects.toThrowError(
      'Missing key(s)',
    );
  });

  it('should faild reading deleted cards with "Missing key(s)"', async () => {
    const mockReq: readCardDto = {
      uuid: '',
      meetingUUID: '',
    };
    await expect(controller.readDeleted(mockReq)).rejects.toThrowError(
      'Missing key(s)',
    );
  });

  it('should fail updating card with "Missing key(s)"', async () => {
    const mockReq = {
      body: {},
    } as Request;
    await expect(
      controller.updateCard(mockReq.body, mockReq),
    ).rejects.toThrowError('Missing key(s)');
  });

  it('should fail deleting card with "Missing key(s)"', async () => {
    const mockReq = {
      body: {},
    } as Request;
    await expect(controller.deleteCard(mockReq.body)).rejects.toThrowError(
      'Missing key(s)',
    );
  });

  it('should fail voting with "Missing key(s)"', async () => {
    const mockReq = {
      body: {},
    } as Request;
    await expect(controller.vote(mockReq.body)).rejects.toThrowError(
      'Missing key(s)',
    );
  });
});
