import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import * as redis from 'redis';

import {cardsChannel} from 'src/utils/constants.util';
import {Card} from 'src/model/card.entity';

import {createCardDto} from './dto/createCard.dto';
import {readCardDto} from './dto/readCard.dto';
import {updateCardDto} from './dto/updateCard.dto';
import {deleteCardDto} from './dto/deleteCard.dto';
import {voteCardDto} from './dto/voteCard.dto';
import {VoteInterface} from './interfaces/card.interfaces';
import {Meeting} from 'src/model/meeting.entity';

@Injectable()
export class CardService {
  private readonly cardsRedisClient: redis.RedisClient;
  private cs: ConfigService;
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
    @InjectRepository(Meeting)
    private meetingsRepository: Repository<Meeting>,
  ) {
    this.cardsRedisClient = redis.createClient({
      url: `redis://${process.env.REDIS_URL}`,
    });
    this.cs = new ConfigService();
  }

  createCard = async (card: createCardDto): Promise<any> => {
    try {
      const res = await this.cardsRepository.save(createCardDto.toEntity(card));
      this.cardsRedisClient.publish(
        cardsChannel,
        JSON.stringify({
          ...createCardDto.fromEntity(res),
          actionType: 'Create',
        }),
      );
      return {
        ok: true,
        data: res,
      };
    } catch (err) {
      return {
        ok: false,
        data: 'Creating card failed',
      };
    }
  };

  readCard = async (card: readCardDto): Promise<any> => {
    try {
      const res = await this.cardsRepository.findOneOrFail({uuid: card.uuid});
      return {
        ok: true,
        data: res,
      };
    } catch (err) {
      return {
        ok: false,
        data: 'Card not found',
      };
    }
  };

  readAllCards = async (card: Partial<readCardDto>): Promise<any> => {
    try {
      const allCards =
        (
          await this.meetingsRepository.findOne(
            {uuid: card.meetingUUID},
            {relations: ['cards']},
          )
        ).cards || new Array<Card>();
      return {
        ok: true,
        data: allCards,
      };
    } catch (err) {
      return {ok: false, data: []};
    }
  };

  updateCard = async (card: updateCardDto): Promise<any> => {
    try {
      const updateSet: Partial<Card> = updateCardDto.toEntity(card);
      const res = await this.cardsRepository.save(updateSet);
      this.cardsRedisClient.publish(
        cardsChannel,
        JSON.stringify({
          ...updateCardDto.fromEntity(res),
          actionType: 'Update',
        }),
      );
      return {
        ok: true,
        data: res,
      };
    } catch (err) {
      return {
        ok: false,
        data: 'Updating card failed',
      };
    }
  };

  deleteCard = async (card: deleteCardDto): Promise<any> => {
    try {
      const cardObj: Partial<Card> = deleteCardDto.toEntity(card);
      const res = await this.cardsRepository.save(cardObj);
      this.cardsRedisClient.publish(
        cardsChannel,
        JSON.stringify({
          ...cardObj,
          meeting: card.meeting,
          actionType: 'Delete',
        }),
      );
      return {
        ok: true,
        data: `Deleted card with UUID ${res.uuid}`,
      };
    } catch (err) {
      return {
        ok: false,
        data: 'Deleting card failed',
      };
    }
  };

  voteCard = async (card: voteCardDto): Promise<any> => {
    try {
      const originalVotes: VoteInterface = (
        await this.cardsRepository.findOneOrFail({
          uuid: card.uuid,
          meeting: card.meeting,
        })
      ).votes;
      const votes: VoteInterface = voteCardDto.toEntity(card, originalVotes);
      const cardObj: Partial<Card> = {
        meeting: card.meeting,
        uuid: card.uuid,
        votes,
      };

      const res = await this.cardsRepository.save(cardObj);
      this.cardsRedisClient.publish(
        cardsChannel,
        JSON.stringify({
          ...voteCardDto.fromEntity(cardObj),
          actionType: 'Vote',
        }),
      );
      return {
        ok: true,
        data: voteCardDto.fromEntity(res),
      };
    } catch (err) {
      return {
        ok: false,
        data: 'Voting failed',
      };
    }
  };
}
