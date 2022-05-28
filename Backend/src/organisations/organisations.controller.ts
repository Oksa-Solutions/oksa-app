import {
  Controller,
  Req,
  Body,
  Query,
  Post,
  Get,
  Put,
  Delete,
  UseGuards,
  Inject,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import {getRepository} from 'typeorm';
import {ApiTags} from '@nestjs/swagger';
import {Request} from 'express';
import {AdminGuard} from 'src/guards/admin.guard';
import {Profile} from 'src/model/profile.entity';

import {TokensService} from '../tokens/tokens.service';
import {createOrganisationDto} from './dto/createOrganisation.dto';
import {deleteOrganisationDto} from './dto/deleteOrganisation.dto';
import {readOrganisationDto} from './dto/readOrganisation.dto';
import {readOrganisationProfilesDto} from './dto/readOrganisationProfiles.dto';
import {updateOrganisationDto} from './dto/updateOrganisation.dto';
import {OrganisationsService} from './organisations.service';
import {createProfileDto} from 'src/profiles/dto/createProfile.dto';
import {createUserDto} from 'src/user/dto/createUser.dto';
import {User} from 'src/model/user.entity';
import {removeOrganisationUsersDto} from './dto/removeOrganisationUsers.dto';
import {addOrganisationUsersDto} from './dto/addOrganisationUsers.dto';

@ApiTags('Organisation')
@UseGuards(AdminGuard)
@Controller('organisation')
export class OrganisationsController {
  constructor(
    private readonly organisationService: OrganisationsService,
    @Inject(TokensService)
    private readonly tokenService: TokensService,
  ) {}

  @Post()
  async createOrganisation(
    @Body() post: createOrganisationDto,
    @Req() req: Request,
  ): Promise<any> {
    if (post?.name && post?.domain && post?.contactEmail && post?.admins) {
      try {
        const lastModifiedBy = this.tokenService.getUuidFromToken(req);
        // Get users needing new profiles
        const newProfiles = post.admins.filter(
          (a: Profile) => a.uuid === a.email,
        );
        //If there are new users who do not have profile, create a profile for them
        await Promise.all(
          newProfiles.map(async (p: Profile) => {
            const user = await getRepository(User).save(
              createUserDto.toEntity({}, '', ''),
            );
            const idx = post.admins.findIndex(
              (profile: Profile) => profile.email === p.email,
            );
            const prof = await getRepository(Profile).save(
              createProfileDto.toEntity({name: '', email: p.email, user}),
            );
            post.admins[idx] = prof;
          }),
        );
        // Add all users with correct domain to new organisation
        const users = await getRepository(Profile)
          .createQueryBuilder('profile')
          .where('profile.email like :domain', {domain: `%@${post.domain}`})
          .getMany();
        const newOrganisation =
          await this.organisationService.createOrganisation({
            ...post,
            lastModifiedBy,
            users,
          });
        if (newOrganisation.ok) {
          const responses = await Promise.all(
            newProfiles.map(async (p: Profile) => {
              const success =
                await this.organisationService.sendInvitationViaEmail(
                  p.email,
                  post.name,
                );
              return {ok: success, email: p.email};
            }),
          );
          responses.forEach((r: Record<string, any>) => {
            if (!r.ok) console.error(`Sending email to ${r.email} failed`);
          });
          return createOrganisationDto.fromEntity(newOrganisation.data);
        } else {
          throw new HttpException(newOrganisation.data, HttpStatus.NOT_FOUND);
        }
      } catch (err) {
        throw new HttpException(
          'Creating organisation failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async readOrganisation(@Query() query: readOrganisationDto): Promise<any> {
    if (query?.uuid) {
      const organisation = await this.organisationService.readOrganisation(
        query,
      );
      return organisation.ok
        ? readOrganisationDto.fromEntity(organisation.data)
        : organisation.data;
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('profiles')
  async readOrganisationProfiles(
    @Query() query: readOrganisationProfilesDto,
  ): Promise<any> {
    if (query?.uuid) {
      const profiles = await this.organisationService.readOrganisationProfiles(
        query,
      );
      return profiles.ok
        ? readOrganisationProfilesDto.fromEntity(profiles.data)
        : profiles.data;
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  async updateOrganisation(
    @Body() post: updateOrganisationDto,
    @Req() req: Request,
  ): Promise<any> {
    if (post?.uuid) {
      const lastModifiedBy = this.tokenService.getUuidFromToken(req);
      const updatedOrg = await this.organisationService.updateOrganisation({
        ...post,
        lastModifiedBy,
      });
      return updatedOrg.ok
        ? updateOrganisationDto.fromEntity(updatedOrg.data)
        : updatedOrg.data;
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete()
  async deleteOrganisation(@Body() post: deleteOrganisationDto): Promise<any> {
    if (post?.uuid) {
      const deletedOrg = await this.organisationService.deleteOrganisation(
        post,
      );
      return deletedOrg.data;
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/addUsers')
  async addOrganisationUsers(@Body() post: addOrganisationUsersDto, @Req() req: Request): Promise<any> {
    if (post?.uuid) {
      const lastModifiedBy = this.tokenService.getUuidFromToken(req);
      const updatedOrg = await this.organisationService.addOrganisationUsers({...post, lastModifiedBy});
      return updatedOrg.ok ? addOrganisationUsersDto.fromEntity(updatedOrg.data) : updatedOrg.data;
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/removeUsers')
  async removeOrganisationUsers(@Body() post: removeOrganisationUsersDto, @Req() req: Request): Promise<any> {
    if (post?.uuid) {
      const lastModifiedBy = this.tokenService.getUuidFromToken(req);
      const updatedOrg = await this.organisationService.removeOrganisationUsers({...post, lastModifiedBy});
      return updatedOrg.ok ? removeOrganisationUsersDto.fromEntity(updatedOrg.data) : updatedOrg.data;
    } else {
      throw new HttpException('Missing key(s)', HttpStatus.BAD_REQUEST);
    }
  }
}
