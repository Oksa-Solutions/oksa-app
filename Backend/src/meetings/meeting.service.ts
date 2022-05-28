import {Inject, Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import * as redis from 'redis';
import {SES} from 'aws-sdk';
import {SendEmailRequest} from 'aws-sdk/clients/ses';

import {meetingChannel} from 'src/utils/constants.util';
import {Meeting} from 'src/model/meeting.entity';

import {createMeetingDto} from './dto/createMeeting.dto';
import {readMeetingDto} from './dto/readMeeting.dto';
import {updateMeetingDto} from './dto/updateMeeting.dto';
import {deleteMeetingDto} from './dto/deleteMeeting.dto';
import {User} from 'src/model/user.entity';
import {UserService} from 'src/user/user.service';
import {DeleteCategoryDto} from './dto/DeleteCategory.dto';
import {Card} from 'src/model/card.entity';
import {CategoryInterface} from 'src/cards/interfaces/card.interfaces';
import {CardService} from 'src/cards/card.service';

@Injectable()
export class MeetingService {
  private readonly meetingRedisClient: redis.RedisClient;
  private cs: ConfigService;
  constructor(
    @InjectRepository(Meeting)
    private meetingsRepository: Repository<Meeting>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(CardService)
    private readonly cardService: CardService,
  ) {
    this.meetingRedisClient = redis.createClient({
      url: `redis://${process.env.REDIS_URL}`,
    });
    this.cs = new ConfigService();
  }

  private createNewID = (): string => {
    let ID = '';
    for (let i = 1; i < 12; i++) {
      if (i % 4 === 0) {
        ID += '-';
      } else {
        ID += Math.random().toString(36).substr(2, 1);
      }
    }
    return ID;
  };

  private sendTopicDetail = (
    to: string,
    topic: string,
    pw: string,
    name: string,
  ): void => {
    // Send topic details with email
    const ses = new SES();
    const params: SendEmailRequest = {
      Source: 'no-reply@oksa.io',
      Destination: {
        ToAddresses: [to.toLowerCase()],
      },
      Message: {
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: `Awesome you have created Oksa topic!\n\nHere is the link to your newly created topic: https://oksa.io/m/${topic}?pw=${pw}.\n\nShare the link with anyone you want to collaborate. Remember that the link let's anyone access your topic`,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `[Oksa] Welcome to your new topic: ${name}`,
        },
      },
    };
    ses.sendEmail(params, (err: any, data: any) => {
      if (err) console.error(err);
      else console.log(data);
    });
  };

  createMeeting = async (meeting: createMeetingDto): Promise<any> => {
    let uniqueID = false;
    let i = 0;
    while (!uniqueID) {
      const id: string = this.createNewID();
      try {
        const res = await this.meetingsRepository.save(
          await createMeetingDto.toEntity(meeting, id),
        );
        uniqueID = true;
        this.sendTopicDetail(
          meeting.creatorEmail,
          id,
          meeting.password,
          meeting.name,
        );
        return {
          ok: true,
          data: {...res, password: meeting.password},
        };
      } catch (err) {
        if (err.detail === `Key (id)=(${id}) already exists.`) {
          i++;
          if (i > 100) {
            uniqueID = true;
            return {
              ok: false,
              data: 'Could not create unique ID',
            };
          }
        } else {
          // Break loop since we're dealing with some unexpected error
          uniqueID = true;
        }
      }
    }
    return {
      ok: false,
      data: 'Creating meeting failed',
    };
  };

  readMeeting = async (meeting: readMeetingDto): Promise<any> => {
    try {
      const res = await this.meetingsRepository.findOne(
        {uuid: meeting.meetingUUID},
        {relations: ['cards', 'cards.meeting', 'authorizedUsers']},
      );
      return {
        ok: true,
        data: res,
      };
    } catch (err) {
      return {
        ok: false,
        data: 'Reading meeting failed',
      };
    }
  };

  updateMeeting = async (meeting: updateMeetingDto): Promise<any> => {
    try {
      const currentMeeting: Meeting =
        await this.meetingsRepository.findOneOrFail(
          {uuid: meeting.meeting.uuid},
          {relations: ['authorizedUsers']},
        );
      const updateSet = updateMeetingDto.toEntity(meeting, currentMeeting);
      const res = await this.meetingsRepository.save(updateSet);

      this.meetingRedisClient.publish(
        meetingChannel,
        JSON.stringify({
          meeting: updateMeetingDto.fromEntity(res),
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
        data: 'Updating meeting failed',
      };
    }
  };

  deleteCategory = async (meeting: DeleteCategoryDto): Promise<any> => {
    try {
      const thisMeeting: Meeting = await this.meetingsRepository.findOne(
        {uuid: meeting.meeting.uuid},
        {relations: ['cards', 'authorizedUsers']},
      );
      thisMeeting.categories = meeting.categories;
      thisMeeting.cards
        .filter((c: Card) => !c.deleted)
        .map(async (card: Card) => {
          const updatedCategories = card?.categories.filter(
            (c: CategoryInterface) =>
              meeting.categories
                .map((cat: CategoryInterface) => cat.name)
                .includes(c.name),
          );
          // Update cards containing the category
          await this.cardService.updateCard({
            meeting: thisMeeting,
            ...card,
            categories: updatedCategories,
            lastModifiedBy: meeting.lastModifiedBy,
          });
        });
      const updatedMeeting = await this.meetingsRepository.save(
        DeleteCategoryDto.toEntity(meeting),
      );
      this.meetingRedisClient.publish(
        meetingChannel,
        JSON.stringify({
          meeting: updateMeetingDto.fromEntity(updatedMeeting),
          actionType: 'Update',
        }),
      );
      return {
        ok: true,
        data: thisMeeting,
      };
    } catch (err) {
      return {
        ok: false,
        data: 'Updating categories failed',
      };
    }
  };

  deleteMeeting = async (meeting: deleteMeetingDto): Promise<any> => {
    try {
      const res = await this.meetingsRepository.delete({
        uuid: meeting.meeting.uuid,
      });
      if (res.affected > 0) {
        // Remove meeting from token
        await this.userService.updateUserMeetings({
          uuid: meeting.meeting.uuid,
          add: false,
          meeting: meeting.meeting,
        });
        return {
          ok: true,
          data: `Deleted meeting with ID ${meeting.meeting.id}`,
        };
      } else {
        return {
          ok: true,
          data: `No meeting with ID ${meeting.meeting.id}`,
        };
      }
    } catch (err) {
      return {
        ok: false,
        data: 'Deleting meeting failed',
      };
    }
  };

  getUsersMeetings = async (uuid: string): Promise<any> => {
    try {
      const res =
        (await this.usersRepository.findOne({uuid}, {relations: ['meetings']}))
          ?.meetings || new Array<Meeting>();
      return {
        ok: res.length > 0 ? true : false,
        data: res,
      };
    } catch (err) {
      return {
        ok: false,
        data: 'Reading meetings failed',
      };
    }
  };
}
