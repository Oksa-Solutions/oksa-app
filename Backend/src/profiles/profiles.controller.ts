import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {Request} from 'express';

import {TokensService} from '../tokens/tokens.service';
import {ProfilesService} from './profiles.service';

import {createProfileDto} from './dto/createProfile.dto';
import {readProfileDto} from './dto/readProfile.dto';
import {updateProfileDto} from './dto/updateProfile.dto';
import {deleteProfileDto} from './dto/deleteProfile.dto';

@ApiTags('Profile')
@Controller('profile')
export class ProfilesController {
  constructor(
    private readonly profileService: ProfilesService,
    @Inject(TokensService)
    private readonly tokenService: TokensService,
  ) {}

  @Post()
  async createProfile(
    @Body() req: Request,
    @Body() post: createProfileDto,
  ): Promise<any> {
    if (post?.name && post?.user?.uuid) {
      try {
        const ip = req?.connection?.remoteAddress || req?.ip;
        const profile = await this.profileService.createProfile({...post, ip});
        return createProfileDto.fromEntity(profile.data);
      } catch (err) {
        throw new HttpException(
          'Creating profile failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async readProfile(@Query() query: readProfileDto): Promise<any> {
    if (query?.uuid) {
      try {
        const profile = await this.profileService.readProfile(query);
        return readProfileDto.fromEntity(profile.data);
      } catch (err) {
        throw new HttpException('Reading profile failed', HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  async updateProfile(
    @Req() req: Request,
    @Body() post: updateProfileDto,
  ): Promise<any> {
    if (post?.uuid && post?.user?.uuid) {
      const lastModifiedBy = this.tokenService.getUuidFromToken(req);
      if (lastModifiedBy === '') {
        throw new HttpException('No UUID in JWT', HttpStatus.NOT_FOUND);
      }
      try {
        const profile = await this.profileService.updateProfile({
          ...post,
          lastModifiedBy,
        });
        return updateProfileDto.fromEntity(profile.data);
      } catch (err) {
        throw new HttpException(
          'Updating profile failed',
          HttpStatus.NOT_FOUND,
        );
      }
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  async deleteProfile(@Body() post: deleteProfileDto): Promise<any> {
    if (post?.uuid && post?.user?.uuid) {
      try {
        const profile = await this.profileService.deleteProfile(post);
        return profile.data;
      } catch (err) {
        throw new HttpException(
          'Deleting profile failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }
}
