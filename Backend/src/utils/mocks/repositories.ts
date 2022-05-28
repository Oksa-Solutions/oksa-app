import {createCardDto} from 'src/cards/dto/createCard.dto';
import {readCardDto} from 'src/cards/dto/readCard.dto';
import {createMeetingDto} from 'src/meetings/dto/createMeeting.dto';
import {Card} from 'src/model/card.entity';
import {Meeting} from 'src/model/meeting.entity';
import {Organisation} from 'src/model/organisation.entity';
import {Profile} from 'src/model/profile.entity';
import {ProfileSetting} from 'src/model/profileSettings.entity';
import {Team} from 'src/model/team.entity';
import {User} from 'src/model/user.entity';
import {createOrganisationDto} from 'src/organisations/dto/createOrganisation.dto';
import {createProfileDto} from 'src/profiles/dto/createProfile.dto';
import {readProfileDto} from 'src/profiles/dto/readProfile.dto';
import {updateProfileSettingDto} from 'src/profileSettings/dto/updateProfileSetting.dto';
import {createTeamDto} from 'src/teams/dto/createTeam.dto';
import {readTeamDto} from 'src/teams/dto/readTeam.dto';
import {createUserDto} from 'src/user/dto/createUser.dto';
import {readUserDto} from 'src/user/dto/readUser.dto';
import {
  getSampleCard,
  getSampleMeeting,
  getSampleOrganisation,
  getSampleProfile,
  getSampleTeam,
  getSampleUser,
} from 'test/testData';

export const mockCardRepository = {
  save: jest
    .fn()
    .mockImplementation((dto: createCardDto) =>
      Promise.resolve(Object.assign(new Card(), dto)),
    ),
  findOneOrFail: jest
    .fn()
    .mockImplementation((dto: readCardDto) =>
      Promise.resolve(
        Object.assign(new Card(), {...getSampleCard(), uuid: dto.uuid}),
      ),
    ),
};

export const mockLoginRepository = {};
export const mockMeetingRepository = {
  save: jest
    .fn()
    .mockImplementation((dto: createMeetingDto) =>
      Promise.resolve(Object.assign(new Meeting(), dto)),
    ),
  find: jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve([Object.assign(new Meeting(), getSampleMeeting())]),
    ),
  findOne: jest.fn().mockImplementation(() =>
    Promise.resolve(
      Object.assign(new Meeting(), {
        ...getSampleMeeting(),
        cards: [getSampleCard()],
      }),
    ),
  ),
  findOneOrFail: jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve(Object.assign(new Meeting(), getSampleMeeting())),
    ),
  delete: jest.fn().mockImplementation(() => Promise.resolve({affected: 1})),
};

export const mockOrganisationRepository = {
  save: jest
    .fn()
    .mockImplementation((dto: createOrganisationDto) =>
      Promise.resolve(Object.assign(getSampleOrganisation(), dto)),
    ),
  findOne: jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve(
        Object.assign(new Organisation(), {...getSampleOrganisation()}),
      ),
    ),
  delete: jest.fn().mockImplementation(() => Promise.resolve({affected: 1})),
};

export const mockProfileRepository = {
  save: jest
    .fn()
    .mockImplementation((dto: createProfileDto) =>
      Promise.resolve(Object.assign(new Profile(), dto)),
    ),
  findOne: jest
    .fn()
    .mockImplementation((dto: readProfileDto) =>
      Promise.resolve(
        Object.assign(new Profile(), {...getSampleProfile(), uuid: dto.uuid}),
      ),
    ),
  delete: jest.fn().mockImplementation(() => Promise.resolve({affected: 1})),
};
export const mockProfileSettingsRepository = {
  save: jest
    .fn()
    .mockImplementation((dto: updateProfileSettingDto) =>
      Promise.resolve(Object.assign(new ProfileSetting(), dto)),
    ),
};
export const mockSubscriptionRepository = {};

export const mockUserRepository = {
  save: jest
    .fn()
    .mockImplementation((dto: createUserDto) =>
      Promise.resolve(Object.assign(new User(), dto)),
    ),
  findOne: jest
    .fn()
    .mockImplementation((dto: readUserDto) =>
      Promise.resolve(
        Object.assign(new User(), {...getSampleUser(), uuid: dto.uuid}),
      ),
    ),
  delete: jest.fn().mockImplementation(() => Promise.resolve({affected: 1})),
};

export const mockTeamRepository = {
  save: jest
    .fn()
    .mockImplementation((dto: createTeamDto) =>
      Promise.resolve(Object.assign(new Team(), dto)),
    ),
  findOne: jest
    .fn()
    .mockImplementation((dto: readTeamDto) =>
      Promise.resolve(
        Object.assign(new Team(), {...getSampleTeam(), uuid: dto.uuid}),
      ),
    ),
  delete: jest.fn().mockImplementation(() => Promise.resolve({affected: 1})),
};
