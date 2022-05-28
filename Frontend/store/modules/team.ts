import {ActionContext, Module} from 'vuex';
import {addTeamMembersDto, readTeamDto, updateTeamDto} from '~/dto/teams';

import {RootState} from '..';
import {SET_TEAM_DATA, SIGN_OUT} from '../mutationTypes';
import {CardInterface} from './cards';
import {MeetingInterface} from './meeting';
import {OrganisationInterface} from './organisation';
import {ProfileInterface} from './profile';

export interface TeamInterface {
  uuid: string;
  name: string;
  // icon: string;
  organisation: Partial<OrganisationInterface>;
  topics: MeetingInterface[];
  admins: ProfileInterface[];
  users: ProfileInterface[];
  cards: CardInterface[];
}

const initialTeamModuleState = () => ({
  uuid: '',
  name: '',
  // icon: '',
  organisation: {},
  topics: new Array<MeetingInterface>(),
  admins: new Array<ProfileInterface>(),
  users: new Array<ProfileInterface>(),
  cards: new Array<CardInterface>(),
});

type Context = ActionContext<TeamModuleState, RootState>;

export type TeamModuleState = ReturnType<typeof initialTeamModuleState>;

const TeamModule: Module<TeamModuleState, RootState> = {
  namespaced: true,
  state: initialTeamModuleState,

  mutations: {
    [SET_TEAM_DATA](state: TeamModuleState, team: TeamInterface) {
      state.uuid = team.uuid;
      state.name = team.name;
      // state.icon = team.icon;
      state.organisation = team.organisation;
      state.topics = team.topics;
      state.admins = team.admins;
      state.users = team.users;
      state.cards = [].concat.apply(
        team.topics.map((t: MeetingInterface) => t.cards),
      );
    },
    [SIGN_OUT](state: TeamModuleState) {
      Object.assign(state, initialTeamModuleState());
    },
  },
  actions: {
    async readTeam(context: Context, payload: readTeamDto): Promise<any> {
      try {
        const res = await this.$axios.get('/teams', {params: payload});
        if (res.status === 200) {
          context.commit(SET_TEAM_DATA, res.data);
          return true;
        } else {
          console.warn('Something went wrong');
        }
      } catch (err: any) {
        if (err?.response?.status === 400) {
          console.warn('Missing key(s) in body');
        } else if (err?.response?.status === 401) {
          console.warn('Unauthorized');
        } else if (err?.response?.status === 403) {
          console.warn('Forbidden');
        } else if (err?.response?.status === 404) {
          console.warn('Reading team failed');
        } else {
          console.error('There was an error: ' + err);
        }
      }
      return false;
    },
    async updateTeam(context: Context, payload: updateTeamDto): Promise<any> {
      try {
        const res = await this.$axios.put('/teams', payload);
        if (res.status === 200) {
          context.commit(SET_TEAM_DATA, {
            ...res.data,
            organisation: payload.organisation,
          });
          return true;
        } else {
        }
      } catch (err: any) {
        if (err?.response?.status === 400) {
          console.warn('Missing key(s) in body');
        } else if (err?.response?.status === 401) {
          console.warn('Unauthorized');
        } else if (err?.response?.status === 403) {
          console.warn('Forbidden');
        } else if (err?.response?.status === 404) {
          console.warn('Reading team failed');
        } else {
          console.error('There was an error: ' + err);
        }
      }
      return false;
    },
    async addTeamMembers(
      context: Context,
      payload: addTeamMembersDto,
    ): Promise<any> {
      try {
        const res = await this.$axios.put('/teams/addMembers', payload);
        if (res.status === 200) {
          context.commit(SET_TEAM_DATA, {
            ...res.data,
            organisation: payload.organisation,
          });
          return true;
        } else {
          console.warn('Something went wrong');
        }
      } catch (err: any) {
        if (err?.response?.status === 400) {
          console.warn('Missing key(s) in body');
        } else if (err?.response?.status === 401) {
          console.warn('Unauthorized');
        } else if (err?.response?.status === 403) {
          console.warn('Forbidden');
        } else if (err?.response?.status === 404) {
          console.warn('Reading team failed');
        } else {
          console.error('There was an error: ' + err);
        }
      }
      return false;
    },
    async removeTeamMembers(
      context: Context,
      payload: addTeamMembersDto,
    ): Promise<any> {
      try {
        const res = await this.$axios.put('/teams/removeMembers', payload);
        if (res.status === 200) {
          context.commit(SET_TEAM_DATA, {
            ...res.data,
            organisation: payload.organisation,
          });
          return true;
        } else {
          console.warn('Something went wrong');
        }
      } catch (err: any) {
        if (err?.response?.status === 400) {
          console.warn('Missing key(s) in body');
        } else if (err?.response?.status === 401) {
          console.warn('Unauthorized');
        } else if (err?.response?.status === 403) {
          console.warn('Forbidden');
        } else if (err?.response?.status === 404) {
          console.warn('Reading team failed');
        } else {
          console.error('There was an error: ' + err);
        }
      }
      return false;
    },
  },
};

export default TeamModule;
