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
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ApiTags} from '@nestjs/swagger';
import {Request} from 'express';

import {MeetingGuard} from 'src/guards/meeting.guard';

import {MeetingService} from './meeting.service';
import {TokensService} from '../tokens/tokens.service';

import {createMeetingDto} from './dto/createMeeting.dto';
import {readMeetingDto} from './dto/readMeeting.dto';
import {updateMeetingDto} from './dto/updateMeeting.dto';
import {deleteMeetingDto} from './dto/deleteMeeting.dto';
import {getUsersMeetingsDto} from './dto/getUsersMeetings.dto';
import {DeleteCategoryDto} from './dto/DeleteCategory.dto';
import {Team} from 'src/model/team.entity';
import {User} from 'src/model/user.entity';
import {Profile} from 'src/model/profile.entity';

@ApiTags('Meeting')
@Controller('meeting')
export class MeetingController {
  constructor(
    private readonly meetingService: MeetingService,
    @Inject(TokensService)
    private readonly tokenService: TokensService,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>
  ) {}

  @Post()
  async createMeeting(
    @Body() post: createMeetingDto,
    @Req() req: Request,
  ): Promise<any> {
    if (
      post?.name &&
      post?.password &&
      post?.creatorName &&
      post?.creatorEmail
    ) {
      if (post?.team?.uuid) {
        const topicTeam = await this.teamRepository.findOne({uuid: post.team.uuid}, {relations: ['users', 'users.user']})
        const authUsers = topicTeam.users.map((u: Profile) => u.user);
        Object.assign(post, {authorizedUsers: authUsers});
      }
      const createdBy = this.tokenService.getUuidFromToken(req);
      const createdMeeting = await this.meetingService.createMeeting({
        ...post,
        createdBy: createdBy,
      });
      if (createdMeeting.ok) {
        return {
          ...createMeetingDto.fromEntity(createdMeeting.data),
          password: createdMeeting.data.password,
        };
      }
      throw new HttpException(createdMeeting.data, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
  }

  @UseGuards(MeetingGuard)
  @Get()
  // @readMeeting()
  async readMeeting(@Query() query: readMeetingDto): Promise<any> {
    if (query?.meetingUUID) {
      const newMeeting = await this.meetingService.readMeeting(query);
      return readMeetingDto.fromEntity(newMeeting.data);
    }
    throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
  }

  @UseGuards(MeetingGuard)
  @Put()
  // @updateMeeting()
  async updateMeeting(
    @Body() post: updateMeetingDto,
    @Req() req: Request,
  ): Promise<any> {
    if (post?.meeting?.uuid && post?.meeting?.id) {
      if (post?.team?.uuid) {
        const topicTeam = await this.teamRepository.findOne({uuid: post.team.uuid}, {relations: ['users']})
        const authUsers = topicTeam.users;
        Object.assign(post.meeting, {authorizedUsers: authUsers});
      }
      const lastModifiedBy = this.tokenService.getUuidFromToken(req);
      if (lastModifiedBy === '') {
        throw new HttpException('No UUID in JWT', HttpStatus.NOT_FOUND);
      }
      const updatedMeeting = await this.meetingService.updateMeeting({
        ...post,
        lastModifiedBy,
      });
      return updateMeetingDto.fromEntity(updatedMeeting.data);
    }
    throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
  }

  @UseGuards(MeetingGuard)
  @Put('deleteCategory')
  async deleteCategories(
    @Body() post: DeleteCategoryDto,
    @Req() req: Request,
  ): Promise<any> {
    if (post?.meeting?.uuid && post?.categories) {
      const lastModifiedBy = this.tokenService.getUuidFromToken(req);
      if (lastModifiedBy === '') {
        throw new HttpException('No UUID in JWT', HttpStatus.NOT_FOUND);
      }
      const updatedMeeting = await this.meetingService.deleteCategory({
        ...post,
        lastModifiedBy,
      });
      return updateMeetingDto.fromEntity(updatedMeeting.data);
    }
    throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
  }

  @UseGuards(MeetingGuard)
  @Delete()
  // @deleteMeeting()
  async deleteMeeting(@Body() post: deleteMeetingDto): Promise<any> {
    if (post?.meeting?.uuid && post?.meeting?.id) {
      const deletedMeeting = await this.meetingService.deleteMeeting(post);
      return deletedMeeting.data;
    }
    throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
  }

  @Get('user')
  async getUsersMeetings(@Query() query: getUsersMeetingsDto): Promise<any> {
    if (query?.uuid) {
      const meetings = await this.meetingService.getUsersMeetings(query.uuid);
      return getUsersMeetingsDto.fromEntity(meetings.data);
    }
    throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
  }
}
