import {createCardDto} from 'src/cards/dto/createCard.dto';
import {deleteCardDto} from 'src/cards/dto/deleteCard.dto';
import {readCardDto} from 'src/cards/dto/readCard.dto';
import {updateCardDto} from 'src/cards/dto/updateCard.dto';
import {voteCardDto} from 'src/cards/dto/voteCard.dto';
import {VoteInterface} from 'src/cards/interfaces/card.interfaces';
import {Card} from 'src/model/card.entity';
import {getSampleCard, getSampleUser} from 'test/testData';
import {v4 as uuidv4} from 'uuid';

export const mockedCardService = {
  createCard: jest.fn().mockImplementation((dto: createCardDto) => {
    return {
      ok: true,
      data: Object.assign(new Card(), {
        ...dto,
        uuid: uuidv4(),
        status: 'Waiting',
      }),
    };
  }),

  readCard: jest.fn().mockImplementation((dto: readCardDto) => {
    return {
      ok: true,
      data: Object.assign(new Card(), {
        ...getSampleCard(),
        meeting: {uuid: dto.meetingUUID},
        author: {uuid: getSampleUser().uuid},
      }),
    };
  }),

  readAllCards: jest.fn().mockImplementation((dto: Partial<readCardDto>) => {
    return {
      ok: true,
      data: [
        Object.assign(new Card(), {
          ...getSampleCard(),
          meeting: {uuid: dto.meetingUUID},
          author: {uuid: getSampleUser().uuid},
        }),
      ],
    };
  }),

  updateCard: jest.fn().mockImplementation((dto: updateCardDto) => {
    return {
      ok: true,
      data: Object.assign(getSampleCard(), dto),
    };
  }),

  deleteCard: jest.fn().mockImplementation((dto: deleteCardDto) => {
    return {
      ok: true,
      data: `Deleted card with UUID ${dto.uuid}`,
    };
  }),

  voteCard: jest.fn().mockImplementation((dto: voteCardDto) => {
    const votes: VoteInterface = {
      yes: dto.agree ? [dto.id] : [],
      no: dto.agree ? [] : [dto.id],
    };
    return {
      ok: true,
      data: {
        meeting: {uuid: dto.meeting.uuid},
        uuid: getSampleCard().uuid,
        votes,
      },
    };
  }),
};
