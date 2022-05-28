import {Inject, Injectable, HttpException, HttpStatus} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, getRepository} from 'typeorm';
import {SES} from 'aws-sdk';
import {SendEmailRequest} from 'aws-sdk/clients/ses';

import {Organisation} from 'src/model/organisation.entity';
import {createOrganisationDto} from './dto/createOrganisation.dto';
import {readOrganisationDto} from './dto/readOrganisation.dto';
import {updateOrganisationDto} from './dto/updateOrganisation.dto';
import {deleteOrganisationDto} from './dto/deleteOrganisation.dto';
import {readOrganisationProfilesDto} from './dto/readOrganisationProfiles.dto';
import {Profile} from 'src/model/profile.entity';
import {addOrganisationUsersDto} from './dto/addOrganisationUsers.dto';
import {removeOrganisationUsersDto} from './dto/removeOrganisationUsers.dto';
import {ProfilesService} from 'src/profiles/profiles.service';
import {UserService} from 'src/user/user.service';

@Injectable()
export class OrganisationsService {
  constructor(
    @InjectRepository(Organisation)
    private readonly organisationRepository: Repository<Organisation>,
    @Inject(ProfilesService)
    private readonly profileService: ProfilesService,
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}
  async createOrganisation(post: createOrganisationDto): Promise<any> {
    try {
      const newOrg = await this.organisationRepository.save(
        createOrganisationDto.toEntity(post),
      );
      return {ok: true, data: newOrg};
    } catch (err) {
      if (err.detail === `Key (name)=(${post.name}) already exists.`) {
        return {
          ok: false,
          data: `Organisation with name ${post.name} already exists`,
        };
      }
    }
    return {ok: false, data: 'Creating organisation failed'};
  }

  async readOrganisation(query: readOrganisationDto): Promise<any> {
    try {
      const org = await this.organisationRepository.findOne({
        where: {uuid: query.uuid},
        relations: ['admins', 'users', 'teams'],
      });
      return {ok: true, data: org};
    } catch (err) {
      return {ok: false, data: 'Reading organisation failed'};
    }
  }

  async readOrganisationProfiles(
    query: readOrganisationProfilesDto,
  ): Promise<any> {
    try {
      const profiles = await getRepository(Profile)
        .createQueryBuilder()
        .relation(Organisation, 'users')
        .of(query.uuid)
        .loadMany();
      return {ok: true, data: profiles};
    } catch (err) {
      return {ok: false, data: 'Reading organisation profiles failed'};
    }
  }

  async updateOrganisation(post: updateOrganisationDto): Promise<any> {
    try {
      const uOrg = await this.organisationRepository.save(
        updateOrganisationDto.toEntity(post),
      );
      return {ok: true, data: uOrg};
    } catch (err) {
      return {ok: false, data: 'Updating organisation failed'};
    }
  }

  async deleteOrganisation(post: deleteOrganisationDto): Promise<any> {
    try {
      const dOrg = await this.organisationRepository.delete({uuid: post.uuid});
      if (dOrg.affected > 0) {
        return {ok: true, data: `Deleted organisation with UUID ${post.uuid}`};
      } else {
        return {ok: true, data: `No organisation with UUID ${post.uuid}`};
      }
    } catch (err) {
      return {ok: false, data: 'Deleting organisation failed'};
    }
  }

  async addOrganisationUsers(
    post: addOrganisationUsersDto,
  ): Promise<any> {
    try {
      const oldOrg = await this.readOrganisation({uuid: post.uuid});
      if (oldOrg.ok) {
        const existingUsers = (oldOrg.data as Organisation).users;
        const newUsers = [];
        for (const i in post.users) {
          if (
            !existingUsers
              .map((u: Profile) => u.uuid)
              .includes(post.users[i].uuid)
          ) {
            // If user exists get information, otherwise create new profile
            const u = await getRepository(Profile).createQueryBuilder('profile').where("profile.email = :email", {email: post.users[i].email}).getOne();
            if (u) {
              newUsers.push(u);
              existingUsers.push(u);
            } else {
              const newUser = await this.userService.createUser({});
              if (!newUser.ok) {
                throw new HttpException('Adding users to organisation failed', HttpStatus.INTERNAL_SERVER_ERROR);
              }
              const newProfile = await this.profileService.createProfile({name: 'default', user: newUser.data, email: post.users[i].email});
              if (!newProfile.ok) {
                throw new HttpException('Adding users to organisation failed', HttpStatus.INTERNAL_SERVER_ERROR);
              }
              existingUsers.push(newProfile.data);
            }
          }
        }
        const res = await this.updateOrganisation({
          uuid: post.uuid,
          lastModifiedBy: post.lastModifiedBy,
          users: existingUsers,
        });
        await Promise.all(newUsers.map(async (p: Profile) => {
          await this.sendInvitationViaEmail(
            p.email,
            oldOrg.data.name,
          );
        }));
        if (res.ok) {
          return {
            ok: true,
            data: res.data,
          };
        }
      }
      return {ok: false, data: 'Adding users to organisation failed'};
    } catch (err) {}
    throw new HttpException('Adding users to organisation failed', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async removeOrganisationUsers(post: removeOrganisationUsersDto): Promise<any> {
    try {
      const oldOrg = await this.readOrganisation({uuid: post.uuid});
      if (oldOrg.ok) {
        const existingUsers = (oldOrg.data as Organisation).users;
        const newUsers = existingUsers.filter((u: Profile) => !post.users.map((user: Profile) => user.uuid).includes(u.uuid));
        const res = await this.updateOrganisation({
          uuid: post.uuid,
          lastModifiedBy: post.lastModifiedBy,
          users: newUsers,
        });
        if (!res.ok) {
          throw new HttpException('Removing users from organisation failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return {ok: true, data: res.data};
      }
      return {ok: false, data: 'Removing users from organisation failed'};
    } catch (err) { }
    throw new HttpException('Removing users from organisation failed', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  sendInvitationViaEmail = async (email: string, organisationName: string) => {
    const to = [email];
    const msg = `You have been invited to organisation ${organisationName} at Oksa.\n\nYou can login at https://oksa.io/signin with your email address ${email}`;

    const params: SendEmailRequest = {
      Source: 'no-reply@oksa.io',
      Destination: {
        ToAddresses: to,
      },
      Message: {
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: msg,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `[Oksa] You have been invited to collaborate at Oksa by ${organisationName}`,
        },
      },
    };

    const ses = new SES();
    ses.sendEmail(params, (err: any, data: any) => {
      if (err) console.log(err)
      else console.log(data)
    });
  };
}
