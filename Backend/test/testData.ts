import {Card} from 'src/model/card.entity';
import {Meeting} from 'src/model/meeting.entity';
import {Organisation} from 'src/model/organisation.entity';
import {Profile} from 'src/model/profile.entity';
import {ProfileSetting} from 'src/model/profileSettings.entity';
import {Subscription} from 'src/model/subscription.entity';
import {Team} from 'src/model/team.entity';
import {User} from 'src/model/user.entity';

import {createCardDto} from 'src/cards/dto/createCard.dto';
import {deleteCardDto} from 'src/cards/dto/deleteCard.dto';
import {readCardDto} from 'src/cards/dto/readCard.dto';
import {updateCardDto} from 'src/cards/dto/updateCard.dto';
import {voteCardDto} from 'src/cards/dto/voteCard.dto';
import {createMeetingDto} from 'src/meetings/dto/createMeeting.dto';
import {DeleteCategoryDto} from 'src/meetings/dto/DeleteCategory.dto';
import {deleteMeetingDto} from 'src/meetings/dto/deleteMeeting.dto';
import {readMeetingDto} from 'src/meetings/dto/readMeeting.dto';
import {updateMeetingDto} from 'src/meetings/dto/updateMeeting.dto';
import {createOrganisationDto} from 'src/organisations/dto/createOrganisation.dto';
import {deleteOrganisationDto} from 'src/organisations/dto/deleteOrganisation.dto';
import {readOrganisationDto} from 'src/organisations/dto/readOrganisation.dto';
import {updateOrganisationDto} from 'src/organisations/dto/updateOrganisation.dto';
import {createProfileDto} from 'src/profiles/dto/createProfile.dto';
import {deleteProfileDto} from 'src/profiles/dto/deleteProfile.dto';
import {readProfileDto} from 'src/profiles/dto/readProfile.dto';
import {updateProfileDto} from 'src/profiles/dto/updateProfile.dto';
import {updateProfileSettingDto} from 'src/profileSettings/dto/updateProfileSetting.dto';
import {createTeamDto} from 'src/teams/dto/createTeam.dto';
import {deleteTeamDto} from 'src/teams/dto/deleteTeam.dto';
import {readTeamDto} from 'src/teams/dto/readTeam.dto';
import {updateTeamDto} from 'src/teams/dto/updateTeam.dto';
import {createUserDto} from 'src/user/dto/createUser.dto';
import {deleteUserDto} from 'src/user/dto/deleteUser.dto';
import {readUserDto} from 'src/user/dto/readUser.dto';
import {updateUserDto} from 'src/user/dto/updateUser.dto';
import {updateUserMeetingsDto} from 'src/user/dto/updateUserMeetings.dto';

export const TEST_CARD_UUID = '593400a8-531b-46a9-a65c-84ff799a59df';
export const TEST_MEETING_UUID = '6df81a64-6205-4f27-9c2b-f156727f70b7';
export const TEST_ORGANISATION_UUID = '7e6706e0-bd8f-499b-9d3e-3fdab92ad523';
export const TEST_PROFILE_UUID = 'e88d2f68-d35b-4689-971f-9ecc91a73b5e';
export const TEST_SETTINGS_UUID = 'c9a13d9e-e2bb-4bae-88f4-ed77f2086f06';
export const TEST_SUBSCRIPTION_UUID = '7091f857-bdb8-4e9d-9300-5d13b160c163';
export const TEST_TEAM_UUID = '425ebd1f-a44e-462a-941d-2d27243030e2';
export const TEST_USER_UUID = 'b8b758d8-383e-44f4-b1fc-83a7341d661a';

export const getSampleMeeting = (): Meeting => {
  return Object.assign(new Meeting(), {
    uuid: TEST_MEETING_UUID,
    name: 'Test meeting',
    id: 'abc-123-xyz',
    creatorName: 'Test Person',
    creatorEmail: 'test@email.com',
    creatorPhoneNumber: '0441234567',
    status: 'active',
    categories: [{name: 'Test category', color: '#F9BB22'}],
    password: 'secretpassword',
    authorizedUsers: [],
    cards: [],
    created: new Date(1),
    createdBy: TEST_USER_UUID,
    lastModified: new Date(1),
    lastModifiedBy: TEST_USER_UUID,
  });
};

export const getSampleProfile = (): Profile => {
  return Object.assign(new Profile(), {
    uuid: TEST_PROFILE_UUID,
    name: 'Test Person',
    email: 'test@email.com',
    phoneNumber: '0441234567',
    ip: [],
    created: new Date(1),
    createdBy: TEST_USER_UUID,
    lastModified: new Date(1),
    lastModifiedBy: TEST_USER_UUID,
    organisations: [],
    settings: getSampleProfileSettings(),
    user: {
      uuid: TEST_USER_UUID,
    },
    adminOrganisations: [],
    subscription: getSampleSubscription(),
  });
};

export const getSampleSubscription = (): Subscription => {
  return {
    uuid: TEST_SUBSCRIPTION_UUID,
    subscription: 'EARLY BIRD',
    profile: Object.assign(new Profile(), {
      uuid: TEST_PROFILE_UUID,
    }),
  };
};

export const getSampleCard = (): Card => {
  return Object.assign(new Card(), {
    uuid: TEST_CARD_UUID,
    author: {
      uuid: TEST_USER_UUID,
    },
    categories: [],
    content: 'Test content',
    title: 'Test title',
    meeting: {uuid: TEST_MEETING_UUID},
    votes: {no: [], yes: []},
    dates: {startDate: new Date(1), endDate: new Date(1)},
    deleted: false,
    status: '',
    taskStatus: '',
    remover: null,
    deletedAt: null,
    created: new Date(1),
    createdBy: TEST_USER_UUID,
    lastModified: new Date(1),
    lastModifiedBy: TEST_USER_UUID,
  });
};

export const getSampleUser = (): User => {
  return Object.assign(new User(), {
    uuid: TEST_USER_UUID,
    authToken: 'InitialTestAuthToken',
    refreshToken: 'InitialTestRefreshToken',
    cards: [getSampleCard()],
    meetings: [getSampleMeeting()],
    profile: Object.assign(new Profile(), {
      uuid: TEST_PROFILE_UUID,
      name: 'Test Person',
      email: 'test@email.com',
      phoneNumber: '0441234567',
      organisations: [],
      settings: getSampleProfileSettings(),
      subscription: getSampleSubscription(),
    }),
    created: new Date(1),
    createdBy: TEST_USER_UUID,
    lastModified: new Date(1),
    lastModifiedBy: TEST_USER_UUID,
  });
};

export const getSampleProfileSettings = (): ProfileSetting => {
  return {
    uuid: TEST_SETTINGS_UUID,
    profile: Object.assign(new Profile(), {
      uuid: TEST_PROFILE_UUID,
    }),
    background: {
      start: '#F9BB22',
      end: '#FF7B3D',
    },
  };
};

export const getSampleOrganisation = (): Organisation => {
  return Object.assign(new Organisation(), {
    uuid: TEST_ORGANISATION_UUID,
    name: 'Test organisation',
    contactPerson: 'Test Contact',
    contactEmail: 'test@organisation.com',
    admins: [],
    users: [],
    teams: [],
    created: new Date(1),
    createdBy: TEST_USER_UUID,
    lastModified: new Date(1),
    lastModifiedBy: TEST_USER_UUID,
  });
};

export const getSampleTeam = (): Team => {
  return Object.assign(new Team(), {
    uuid: TEST_TEAM_UUID,
    name: 'Test team',
    created: new Date(1),
    lastModified: new Date(1),
    createdBy: getSampleProfile().uuid,
    lastModifiedBy: TEST_USER_UUID,
    admins: [],
    users: [],
    topics: [],
    organisation: getSampleOrganisation(),
    archived: false,
  });
};

/*
 *    CARD
 */
export const createCardOk: createCardDto = {
  meeting: getSampleMeeting(),
  lastModifiedBy: TEST_USER_UUID,
  author: getSampleUser(),
};

export const readCardOk: readCardDto = {
  meetingUUID: getSampleMeeting().uuid,
  uuid: getSampleCard().uuid,
};

export const updateCardOk: updateCardDto = {
  uuid: getSampleCard().uuid,
  meeting: getSampleMeeting(),
  lastModifiedBy: getSampleUser().uuid,
  title: 'Modified test title',
  content: 'Modified test content',
};

export const deleteCardOk: deleteCardDto = {
  uuid: getSampleCard().uuid,
  meeting: getSampleMeeting(),
  remover: getSampleUser().uuid,
};

export const voteCardOk: voteCardDto = {
  uuid: getSampleCard().uuid,
  meeting: getSampleMeeting(),
  id: getSampleUser().uuid,
  agree: true,
  addVote: true,
};

/*
 *    MEETING
 */
export const createMeetingOk: createMeetingDto = {
  name: 'Test meeting',
  password: 'abc-123-xyz',
  creatorName: 'Test Person',
  creatorEmail: 'test@email.com',
  createdBy: TEST_USER_UUID,
};
export const readMeetingOk: readMeetingDto = {
  meetingUUID: getSampleMeeting().uuid,
};
export const updateMeetingOk: updateMeetingDto = {
  meeting: Object.assign(getSampleMeeting(), {
    name: 'Modified test meeting',
  }),
  lastModifiedBy: getSampleUser().uuid,
};
export const deleteMeetingOk: deleteMeetingDto = {
  uuid: getSampleMeeting().uuid,
  meeting: getSampleMeeting(),
};
export const getUsersMeetingsOk: string = getSampleUser().uuid;
export const deleteCategoryOk: DeleteCategoryDto = {
  meeting: getSampleMeeting(),
  categories: [],
  lastModifiedBy: getSampleUser().uuid,
};

/*
 *     USER
 */
export const createUserOk: createUserDto = {};
export const createUserWithProfileOk: createUserDto = {
  profile: getSampleProfile(),
};
export const readUserOk: readUserDto = {
  uuid: getSampleUser().uuid,
};
export const updateUserOk: updateUserDto = {
  uuid: getSampleUser().uuid,
  lastModifiedBy: getSampleUser().uuid,
  profile: getSampleProfile(),
};
export const updateUserMeetingsOk: updateUserMeetingsDto = {
  uuid: getSampleUser().uuid,
  add: false,
  meeting: getSampleMeeting(),
};
export const deleteUserOk: deleteUserDto = {
  uuid: getSampleUser().uuid,
};

/*
 *     PROFILE
 */
export const createProfileOk: createProfileDto = {
  user: getSampleUser(),
  name: 'Test Profile',
  email: 'test@email.com',
  phoneNumber: '0441234567',
};
export const readProfileOk: readProfileDto = {
  uuid: getSampleProfile().uuid,
};
export const updateProfileOk: updateProfileDto = {
  uuid: getSampleProfile().uuid,
  lastModifiedBy: getSampleUser().uuid,
  user: getSampleUser(),
  name: 'Modified test name',
  email: 'modified@example.com',
  phoneNumber: '7654321044',
};
export const deleteProfileOk: deleteProfileDto = {
  uuid: getSampleProfile().uuid,
  user: getSampleUser(),
};

/*
 *     PROFILE SETTINGS
 */
export const updateProfileSettingsOk: updateProfileSettingDto = {
  profile: getSampleProfile(),
  background: {
    start: '#22BB9F',
    end: '#D3B7FF',
  },
  uuid: getSampleProfileSettings().uuid,
};

/*
 *     ORGANISATION
 */
export const createOrganisationOk: createOrganisationDto = {
  name: 'Test organisation',
  lastModifiedBy: getSampleUser().uuid,
  contactPerson: 'Test Contact',
  contactEmail: 'test@organisation.com',
  domain: 'organisation.com',
  admins: [],
  users: [],
};
export const readOrganisationOk: readOrganisationDto = {
  uuid: getSampleOrganisation().uuid,
};
export const updateOrganisationOk: updateOrganisationDto = {
  uuid: getSampleOrganisation().uuid,
  lastModifiedBy: getSampleUser().uuid,
  name: 'Updated test organisation',
};
export const deleteOrganisationOk: deleteOrganisationDto = {
  uuid: getSampleOrganisation().uuid,
};

/*
 *     TEAM
 */
export const createTeamOk: createTeamDto = {
  name: 'Test team',
  organisation: Object.assign(new Organisation(), {
    uuid: TEST_ORGANISATION_UUID,
  }),
  admins: [getSampleProfile()],
  users: [getSampleProfile()],
  topics: [getSampleMeeting()],
  lastModifiedBy: TEST_USER_UUID,
};

export const readTeamOk: readTeamDto = {
  uuid: TEST_TEAM_UUID,
};

export const updateTeamOk: updateTeamDto = {
  uuid: TEST_TEAM_UUID,
  name: 'Updated team name',
  admins: [getSampleProfile()],
  users: [getSampleProfile()],
  topics: [getSampleMeeting()],
  lastModifiedBy: TEST_USER_UUID,
  archived: false,
};

export const deleteTeamOk: deleteTeamDto = {
  uuid: TEST_TEAM_UUID,
};
