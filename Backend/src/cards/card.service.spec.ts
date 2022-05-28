import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';

import {Card} from 'src/model/card.entity';
import {Meeting} from 'src/model/meeting.entity';
import {
  mockCardRepository,
  mockMeetingRepository,
} from 'src/utils/mocks/repositories';
import {
  createCardOk,
  deleteCardOk,
  getSampleCard,
  getSampleUser,
  readCardOk,
  updateCardOk,
  voteCardOk,
} from 'test/testData';
import {CardService} from './card.service';

describe('CardService', () => {
  let service: CardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardService,
        {
          provide: getRepositoryToken(Card),
          useValue: mockCardRepository,
        },
        {
          provide: getRepositoryToken(Meeting),
          useValue: mockMeetingRepository,
        },
      ],
    }).compile();

    service = module.get<CardService>(CardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new card', async () => {
    expect(await service.createCard(createCardOk)).toEqual({
      ok: true,
      data: Object.assign(new Card(), {
        ...createCardOk,
        deleted: false,
        categories: [],
        content: '',
        dates: {startDate: null, endDate: null},
        status: 'Waiting',
        taskStatus: '',
        title: '',
        votes: {no: [], yes: []},
        uuid: expect.stringMatching(
          /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
        ),
        createdBy: createCardOk.lastModifiedBy,
      }),
    });
  });

  it('should read a card', async () => {
    expect(await service.readCard(readCardOk)).toEqual({
      ok: true,
      data: getSampleCard(),
    });
  });

  it('should read all cards in a meeting', async () => {
    expect(await service.readAllCards(readCardOk)).toEqual({
      ok: true,
      data: [getSampleCard()],
    });
  });

  it('should update a card', async () => {
    expect(await service.updateCard(updateCardOk)).toEqual({
      ok: true,
      data: updateCardOk,
    });
  });

  it('should delete card', async () => {
    expect(await service.deleteCard(deleteCardOk)).toEqual({
      ok: true,
      data: `Deleted card with UUID ${deleteCardOk.uuid}`,
    });
  });

  it('should add vote to card', async () => {
    expect(await service.voteCard(voteCardOk)).toEqual({
      ok: true,
      data: Object.assign(new Card(), {
        uuid: voteCardOk.uuid,
        meeting: {uuid: voteCardOk.meeting.uuid},
        votes: {yes: [getSampleUser().uuid], no: []},
      }),
    });
  });

  // Failing tests
  it('should fail creating a card', async () => {
    jest
      .spyOn(mockCardRepository, 'save')
      .mockImplementation(() => Promise.reject('Mocked create card failure'));
    expect(await service.createCard(createCardOk)).toEqual({
      ok: false,
      data: 'Creating card failed',
    });
  });

  it('should fail reading a card', async () => {
    jest
      .spyOn(mockCardRepository, 'findOneOrFail')
      .mockImplementation(() => Promise.reject('Mocked read card failure'));
    expect(await service.readCard(readCardOk)).toEqual({
      ok: false,
      data: 'Card not found',
    });
  });

  it('should fail reading all cards', async () => {
    jest
      .spyOn(mockMeetingRepository, 'findOne')
      .mockImplementation(() => Promise.reject('Mocked reading cards failure'));
    expect(await service.readAllCards(readCardOk)).toEqual({
      ok: false,
      data: [],
    });
  });

  it('should fail updating a card', async () => {
    jest
      .spyOn(mockCardRepository, 'save')
      .mockImplementation(() => Promise.reject('Mocked update card failure'));
    expect(await service.updateCard(updateCardOk)).toEqual({
      ok: false,
      data: 'Updating card failed',
    });
  });

  it('should fail deleting a card', async () => {
    jest
      .spyOn(mockCardRepository, 'save')
      .mockImplementation(() => Promise.reject('Mocked delete card failure'));
    expect(await service.deleteCard(deleteCardOk)).toEqual({
      ok: false,
      data: 'Deleting card failed',
    });
  });

  it('should fail voting on a card', async () => {
    jest
      .spyOn(mockCardRepository, 'save')
      .mockImplementation(() => Promise.reject('Mocked voting card failure'));
    expect(await service.voteCard(voteCardOk)).toEqual({
      ok: false,
      data: 'Voting failed',
    });
  });
});
