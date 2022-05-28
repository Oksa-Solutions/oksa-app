import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  HttpStatus,
  Req,
  UseGuards,
  Query,
  Inject,
  HttpException,
} from '@nestjs/common';
import {Request} from 'express';
import {ApiTags} from '@nestjs/swagger';

import {TokensService} from '../tokens/tokens.service';
import {UserService} from './user.service';

import {JwtAuthGuard} from '../guards/jwtAuth.guard';
import {ApiKeyGuard} from '../guards/apiKey.guard';
import {ApiKeyAuth} from '../utils/decorators.util';

import {createUserDto} from './dto/createUser.dto';
import {readUserDto} from './dto/readUser.dto';
import {updateUserDto} from './dto/updateUser.dto';
import {deleteUserDto} from './dto/deleteUser.dto';
import {updateUserMeetingsDto} from './dto/updateUserMeetings.dto';
import {Public} from 'src/utils/publicDecorator.util';

// const oneYearFromNow = 365 * 24 * 60 * 60 * 1000;

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(TokensService)
    private readonly tokenService: TokensService,
  ) {}

  @Public()
  @UseGuards(ApiKeyGuard)
  @ApiKeyAuth()
  @Post()
  // @createUser()
  async createUser(@Body() post: createUserDto): Promise<any> {
    try {
      const newUser = await this.userService.createUser(post);
      return createUserDto.fromEntity(newUser.data);
    } catch (err) {
      throw new HttpException(
        'User creation failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Public()
  @UseGuards(ApiKeyGuard)
  @ApiKeyAuth()
  @Get()
  // @readUser()
  async readUser(@Query() query: readUserDto): Promise<any> {
    if (query?.uuid) {
      try {
        const user = await this.userService.readUser({uuid: query?.uuid});
        if (user.ok) {
          return user.data;
        } else {
          throw new HttpException(user.data, HttpStatus.NOT_FOUND);
        }
      } catch (err) {
        throw new HttpException('Reading user failed', HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  // @updateUser()
  async updateUser(
    @Body() post: updateUserDto,
    @Req() req: Request,
  ): Promise<any> {
    if (post?.uuid) {
      const lastModifiedBy = this.tokenService.getUuidFromToken(req);
      if (lastModifiedBy === '') {
        throw new HttpException('No UUID in JWT', HttpStatus.NOT_FOUND);
      }
      try {
        const updatedUser = await this.userService.updateUser({
          ...post,
          lastModifiedBy,
        });
        return updateUserDto.fromEntity(updatedUser.data);
      } catch (err) {
        throw new HttpException(
          'Updating user failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }

  @Put('meeting')
  async updateUserMeeting(@Body() post: updateUserMeetingsDto): Promise<any> {
    if (post?.uuid && post?.add !== undefined && post?.meeting?.uuid) {
      try {
        const updatedUser = await this.userService.updateUserMeetings(post);
        return updateUserMeetingsDto.fromEntity(updatedUser.data);
      } catch (err) {
        throw new HttpException(
          "Updating user's meetings failed",
          HttpStatus.NOT_FOUND,
        );
      }
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  // @deleteUser()
  async deleteUser(@Body() post: deleteUserDto): Promise<any> {
    if (post?.uuid) {
      try {
        const deletedUser = await this.userService.deleteUser(post);
        return deletedUser.data;
      } catch (err) {
        throw new HttpException('Deleting user failed', HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }
}
