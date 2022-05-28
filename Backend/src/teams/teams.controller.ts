import {
  HttpException,
  HttpStatus,
  Inject,
  Controller,
  Get,
  Post,
  Body,
  Put,
  Query,
  Delete,
  Req,
} from '@nestjs/common';
import {Request} from 'express';

import {TeamsService} from './teams.service';
import {createTeamDto} from './dto/createTeam.dto';
import {readTeamDto} from './dto/readTeam.dto';
import {updateTeamDto} from './dto/updateTeam.dto';
import {deleteTeamDto} from './dto/deleteTeam.dto';
import {TokensService} from 'src/tokens/tokens.service';
import {Team} from 'src/model/team.entity';
import {addTeamMembersDto} from './dto/addTeamMembers.dto';

@Controller('teams')
export class TeamsController {
  constructor(
    private readonly teamsService: TeamsService,
    @Inject(TokensService)
    private readonly tokenService: TokensService,
  ) {}

  @Post()
  async createTeam(
    @Req() req: Request,
    @Body() post: createTeamDto,
  ): Promise<any> {
    if (post?.name && post?.organisation?.uuid) {
      try {
        const lastModifiedBy = this.tokenService.getUuidFromToken(req);
        const team = await this.teamsService.createTeam({
          ...post,
          lastModifiedBy,
        });
        if (team.ok) {
          return createTeamDto.fromEntity(<Team>team.data);
        } else {
          throw new HttpException(team.data, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      } catch (err) {
        throw new HttpException(
          'Creating team failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }

  // @Get()
  // async findAllTeams(): Promise<any> {
  //   return await this.teamsService.findAllTeams();
  // }

  @Get()
  async findOneTeam(@Query() query: readTeamDto): Promise<any> {
    if (query?.uuid) {
      try {
        const team = await this.teamsService.findOneTeam(query);
        if (team.ok) {
          return team.data;
        } else {
          throw new HttpException(team.data, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      } catch (err) {
        throw new HttpException(
          'Reading team failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  async updateTeam(
    @Req() req: Request,
    @Body() post: updateTeamDto,
  ): Promise<any> {
    if (post?.uuid) {
      try {
        const lastModifiedBy = this.tokenService.getUuidFromToken(req);
        const team = await this.teamsService.updateTeam({
          ...post,
          lastModifiedBy,
        });
        if (team.ok) {
          return updateTeamDto.fromEntity(<Team>team.data);
        } else {
          throw new HttpException(team.data, HttpStatus.NOT_FOUND);
        }
      } catch (err) {
        throw new HttpException(
          'Updating team failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  async deleteTeam(@Body() post: deleteTeamDto): Promise<any> {
    if (post?.uuid) {
      try {
        const team = await this.teamsService.deleteTeam(post);
        if (team.ok) {
          return team.data;
        } else {
          throw new HttpException(team.data, HttpStatus.NOT_FOUND);
        }
      } catch (err) {
        throw new HttpException(
          'Deleting team failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }

  @Put('addMembers')
  async addTeamMembers(
    @Body() post: addTeamMembersDto,
    @Req() req: Request,
  ): Promise<any> {
    if (post) {
      try {
        const lastModifiedBy = this.tokenService.getUuidFromToken(req);
        const team = await this.teamsService.addTeamMembers({
          ...post,
          lastModifiedBy,
        });
        if (team.ok) {
          return team.data;
        } else {
          throw new HttpException(team.data, HttpStatus.NOT_FOUND);
        }
      } catch (err) {
        throw new HttpException(
          'Adding members to team failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }

  @Put('removeMembers')
  async removeTeamMembers(
    @Body() post: addTeamMembersDto,
    @Req() req: Request,
  ): Promise<any> {
    if (post) {
      try {
        const lastModifiedBy = this.tokenService.getUuidFromToken(req);
        const team = await this.teamsService.removeTeamMembers({
          ...post,
          lastModifiedBy,
        });
        if (team.ok) {
          return team.data;
        } else {
          throw new HttpException(team.data, HttpStatus.NOT_FOUND);
        }
      } catch (err) {
        throw new HttpException(
          'Removing members from team failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }
}
