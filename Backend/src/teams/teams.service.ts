import {Injectable, Inject} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, getRepository, In} from 'typeorm';
import {SES} from 'aws-sdk';
import {SendEmailRequest} from 'aws-sdk/clients/ses';

import {Team} from 'src/model/team.entity';
import {createTeamDto} from './dto/createTeam.dto';
import {deleteTeamDto} from './dto/deleteTeam.dto';
import {readTeamDto} from './dto/readTeam.dto';
import {updateTeamDto} from './dto/updateTeam.dto';
import {Profile} from 'src/model/profile.entity';
import {ProfilesService} from 'src/profiles/profiles.service';
import {UserService} from 'src/user/user.service';
import {addTeamMembersDto} from './dto/addTeamMembers.dto';
import {OrganisationsService} from 'src/organisations/organisations.service';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(ProfilesService)
    private readonly profileService: ProfilesService,
    @Inject(OrganisationsService)
    private readonly organisationService: OrganisationsService,
  ) {}
  async createTeam(team: createTeamDto) {
    try {
      const res = await this.teamRepository.save(createTeamDto.toEntity(team));
      return {
        ok: true,
        data: res,
      };
    } catch (err) {}
    return {
      ok: false,
      data: 'Creating team failed',
    };
  }

  // async findAllTeams() {
  //   return `This action returns all teams`;
  // }

  async findOneTeam(team: readTeamDto) {
    try {
      const t = await this.teamRepository
        .createQueryBuilder('team')
        .select([
          'team.uuid',
          'team.name',
          'organisation.uuid',
          'organisation.name',
          'admin.uuid',
          'admin.name',
          'admin.email',
          'user.uuid',
          'user.name',
          'user.email',
          'topic.uuid',
          'topic.name',
          'topic.id',
          'topic.status',
          'topic.lastModified',
          'topic.categories',
          'card.uuid',
          'card.title',
          'card.categories',
          'card.content',
          'card.dates',
          'card.status',
          'card.taskStatus',
          'card.votes',
        ])
        .leftJoin('team.organisation', 'organisation')
        .leftJoin('team.admins', 'admin')
        .leftJoin('team.users', 'user')
        .leftJoin('team.topics', 'topic')
        .leftJoin('topic.cards', 'card', 'card.deleted = :deleted', {
          deleted: false,
        })
        .where('team.uuid = :uuid', {uuid: team.uuid})
        .getOne();
      return {
        ok: true,
        data: t,
      };
    } catch (err) {}
    return {
      ok: false,
      data: 'Reading team failed',
    };
  }

  async updateTeam(team: updateTeamDto) {
    try {
      const orgTeam = await this.findOneTeam({uuid: team.uuid});
      if (orgTeam.ok) {
        const res = await this.teamRepository.save(
          updateTeamDto.toEntity(team, <Team>orgTeam.data),
        );
        return {
          ok: true,
          data: res,
        };
      }
    } catch (err) {}
    return {
      ok: false,
      data: 'Updating team failed',
    };
  }

  async deleteTeam(team: deleteTeamDto) {
    try {
      const res = await this.teamRepository.delete({uuid: team.uuid});
      if (res.affected > 0) {
        return {
          ok: true,
          data: `Deleted team with UUID ${team.uuid}`,
        };
      } else {
        return {
          ok: false,
          data: `No team with UUID ${team.uuid}`,
        };
      }
    } catch (err) {}
    throw new Error('Deleting team failed');
  }

  async addTeamMembers(team: addTeamMembersDto) {
    try {
      // Check who have used platform earlier and have a profile
      const emails = team.users.map((u: Profile) => u.email);
      const existingUsers = await getRepository(Profile).find({
        email: In(emails),
      });
      const newUsers = team.users.filter(
        (u: Profile) =>
          !existingUsers.map((p: Profile) => p.email).includes(u.email),
      );
      // Create new profiles for those who have not yet used the platform
      const profiles = await Promise.all(
        newUsers.map(async (u: Profile) => {
          const user = this.userService.createUser({});
          const profile = (
            await this.profileService.createProfile({
              user: (await user).data,
              name: 'default',
              email: u.email,
            })
          ).data;
          return profile;
        }),
      );

      // Create an array of users belonging to the team after update
      const updatedUsers = profiles.concat(...existingUsers);

      // Check who are added to the team and send emails to them after successful update
      const existingTeam = await this.findOneTeam({uuid: team.uuid});
      let sendInviteUsers = [];
      if (existingTeam.ok) {
        const oldTeamUsers = (existingTeam.data as Team).users;
        sendInviteUsers = updatedUsers.filter(
          (u: Profile) =>
            !oldTeamUsers.map((p: Profile) => p.email).includes(u.email),
        );
      }

      // Update users belonging to the team and to the organisation
      const updatedTeam = await this.updateTeam({
        uuid: team.uuid,
        lastModifiedBy: team.lastModifiedBy,
        users: updatedUsers,
      });
      const updatedOrg =
        await this.organisationService.addOrganisationUsers({
          uuid: team.organisation.uuid,
          lastModifiedBy: team.lastModifiedBy,
          users: updatedUsers,
        });
      if (updatedTeam.ok) {
        // Send invitation emails and return
        await Promise.all(
          sendInviteUsers.map(async (p: Profile) => {
            await this.sendInvitationViaEmail(
              p.email,
              team.organisation.name,
              team.name,
            );
          }),
        );
        return {ok: true, data: updatedTeam.data};
      }
    } catch (err) {}
    return {
      ok: false,
      data: 'Adding team members failed',
    };
  }

  async removeTeamMembers(team: addTeamMembersDto) {
    try {
      const existingTeam = await this.findOneTeam({uuid: team.uuid});
      if (existingTeam.ok) {
        const admins = (existingTeam.data as Team).admins;
        const users = (existingTeam.data as Team).users;
        const updatedAdmins = admins.filter(
          (p: Profile) =>
            !team.users.map((u: Profile) => u.uuid).includes(p.uuid),
        );
        const updatedUsers = users.filter(
          (p: Profile) =>
            !team.users.map((u: Profile) => u.uuid).includes(p.uuid),
        );
        const updatedTeam = await this.updateTeam({
          uuid: team.uuid,
          lastModifiedBy: team.lastModifiedBy,
          users: updatedUsers,
          admins: updatedAdmins,
        });
        if (updatedTeam.ok) {
          return {ok: true, data: updatedTeam.data};
        }
      }
    } catch (err) {}
    return {
      ok: false,
      data: 'Removing team members failed',
    };
  }

  private sendInvitationViaEmail = async (
    email: string,
    organisationName: string,
    teamName: string,
  ) => {
    const to = [email];
    const msg = `You have been invited to collaborate at Oksa in team ${teamName} from ${organisationName}.\n\nYou can login at https://oksa.io/signin with your email address ${email}`;

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
