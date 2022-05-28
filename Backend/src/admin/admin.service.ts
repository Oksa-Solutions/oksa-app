import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, getRepository} from 'typeorm';

import {Organisation} from 'src/model/organisation.entity';
import {Profile} from 'src/model/profile.entity';
import {User} from 'src/model/user.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
    @InjectRepository(Organisation)
    private readonly organisationsRepository: Repository<Organisation>,
  ) {}

  // TODO Pagination and load new items
  getOrganisations = async (
    superAdmin: boolean,
    adminUserUuid: string,
    skip?: number,
  ): Promise<any> => {
    try {
      const adminProfileUuid = (
        await getRepository(Profile)
          .createQueryBuilder()
          .relation(User, 'profile')
          .of(adminUserUuid)
          .loadOne()
      ).uuid;
      if (!superAdmin) {
        const res = await this.organisationsRepository.find({
          relations: ['users', 'users.user', 'admins'],
        });
        // Organisation users are profiles of people
        const users: User[] = new Array<User>();
        const profiles: Profile[] = new Array<Profile>();
        const organisations: Organisation[] = new Array<Organisation>();
        // Create array of users
        res.map((o: Organisation) => {
          o.users.map((p: Profile) =>
            users.map((user: User) => user.uuid).includes(p.user.uuid)
              ? null
              : users.push(p.user),
          );
        });
        // Create array of profiles
        res.map((o: Organisation) => {
          o.users.map((profile: Profile) =>
            profiles.map((p: Profile) => p.uuid).includes(profile.uuid)
              ? null
              : profiles.push(profile),
          );
          delete o.users;
        });
        // Create array of organisations
        res.map((o: Organisation) => {
          o.admins
            .map((admin: Profile) => admin.uuid)
            .includes(adminProfileUuid)
            ? organisations.push(o)
            : null;
          // delete o.admins
        });
        return {ok: true, data: {organisations, users, profiles}};
      } else {
        const organisations = await this.organisationsRepository.find({
          relations: ['users', 'users.user', 'admins'],
        });
        const users = await this.usersRepository.find();
        const profiles = await this.profilesRepository.find();
        return {ok: true, data: {organisations, users, profiles}};
      }
    } catch (err) {
      console.error(err);
      return {ok: false, data: 'Getting users failed'};
    }
  };
}
