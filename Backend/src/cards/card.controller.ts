import {
  Controller,
  Post,
  Body,
  HttpStatus,
  UseGuards,
  Get,
  Put,
  Delete,
  Query,
  Req,
  Inject,
  HttpException,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {Request} from 'express';
import {SkipThrottle} from '@nestjs/throttler';

import {MeetingGuard} from '../guards/meeting.guard';
import {Card} from '../model/card.entity';

import {CardService} from './card.service';
import {TokensService} from '../tokens/tokens.service';

import {createCardDto} from './dto/createCard.dto';
import {deleteCardDto} from './dto/deleteCard.dto';
import {readCardDto} from './dto/readCard.dto';
import {updateCardDto} from './dto/updateCard.dto';
import {voteCardDto} from './dto/voteCard.dto';

@ApiTags('Card')
@UseGuards(MeetingGuard)
@Controller('card')
export class CardController {
  constructor(
    private readonly cardService: CardService,
    @Inject(TokensService)
    private readonly tokenService: TokensService,
  ) {}

  @Post()
  async createCard(
    @Body() post: createCardDto,
    @Req() req: Request,
    // @Res() res: Response,
  ): Promise<any> {
    if (post?.meeting?.uuid && post?.author?.uuid) {
      const lastModifiedBy = this.tokenService.getUuidFromToken(req);
      if (lastModifiedBy === '') {
        throw new HttpException('No UUID in JWT', HttpStatus.NOT_FOUND);
      }
      const createdCard = await this.cardService.createCard({
        ...post,
        lastModifiedBy,
      });
      return createCardDto.fromEntity(createdCard.data);
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async readCard(@Query() query: readCardDto): Promise<any> {
    if (query?.uuid && query?.meetingUUID) {
      const card = await this.cardService.readCard(query);
      return readCardDto.fromEntity(card.data);
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('readActive')
  async readAllCards(@Query() query: Partial<readCardDto>): Promise<any> {
    if (query?.meetingUUID) {
      const allCards = await this.cardService.readAllCards(query);
      return allCards.data
        .filter((card: Card) => !card.deleted)
        .map((c: Card) => readCardDto.fromEntity(c));
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('readDeleted')
  async readDeleted(@Query() query: Partial<readCardDto>): Promise<any> {
    if (query?.meetingUUID) {
      const allCards = await this.cardService.readAllCards(query);
      return allCards.data
        .filter((card: Card) => card.deleted)
        .map((c: Card) => readCardDto.fromEntity(c));
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  async updateCard(
    @Body() post: updateCardDto,
    @Req() req: Request,
  ): Promise<any> {
    if (post?.uuid && post?.meeting) {
      const lastModifiedBy = this.tokenService.getUuidFromToken(req);
      if (lastModifiedBy === '') {
        throw new HttpException('No UUID in JWT', HttpStatus.NOT_FOUND);
      }
      const updatedCard = await this.cardService.updateCard({
        ...post,
        lastModifiedBy,
      });
      return updateCardDto.fromEntity(updatedCard.data);
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  async deleteCard(@Body() post: deleteCardDto): Promise<any> {
    if (post?.uuid && post?.meeting && post?.remover) {
      return (await this.cardService.deleteCard(post)).data;
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }

  @Put('vote')
  @SkipThrottle()
  async vote(@Body() post: voteCardDto): Promise<any> {
    if (
      post?.uuid &&
      post?.agree !== undefined &&
      post.addVote !== undefined &&
      post?.id &&
      post?.meeting
    ) {
      return (await this.cardService.voteCard(post)).data;
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }
}
