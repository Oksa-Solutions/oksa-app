import {ActionContext, Module} from 'vuex';

import {UserInterface} from './user';
import {OrganisationInterface} from './organisation';
import {RootState} from '..';
import {
  ADD_TEAM,
  SET_PROFILE,
  SIGN_OUT,
  UPDATE_PROFILE_SETTINGS,
} from '../mutationTypes';
import {
  createProfileDto,
  readProfileDto,
  updateProfileDto,
} from '~/dto/profiles';
import {createTeamDto} from '~/dto/teams';
import {TeamInterface} from './team';

export interface SettingsInterface {
  uuid: string;
  background: {start: ''; end: ''};
}

export interface ProfileInterface {
  uuid: string;
  name: string;
  email: string;
  phoneNumber: string;
  organisations: OrganisationInterface[];
  teams: TeamInterface[];
  notifications: string[];
  settings: SettingsInterface;
}

const initialProfileState = () => ({
  uuid: '',
  name: '',
  email: '',
  phoneNumber: '',
  user: {uuid: ''},
  organisations: new Array<OrganisationInterface>(),
  teams: new Array<TeamInterface>(),
  notifications: [],
  settings: {
    uuid: '',
    background: {start: 'var(--v-yellow-base)', end: 'var(--v-carrot-base)'},
  },
});

type Context = ActionContext<ProfileModuleState, RootState>;
export type ProfileModuleState = ReturnType<typeof initialProfileState>;

const ProfileModule: Module<ProfileModuleState, RootState> = {
  namespaced: true,
  state: initialProfileState,

  mutations: {
    [SET_PROFILE](state: ProfileModuleState, data: ProfileModuleState) {
      state.uuid = data.uuid;
      state.name = data.name;
      state.email = data?.email || '';
      state.phoneNumber = data?.phoneNumber || '';
      state.user = data.user;
      state.organisations = data?.organisations || [];
      state.teams = data?.teams || [];
      state.settings = data?.settings || state.settings;
    },
    [ADD_TEAM](state: ProfileModuleState, data: TeamInterface) {
      const idx = state.organisations.findIndex(
        (o: OrganisationInterface) => o.uuid === data.organisation.uuid,
      );
      state.organisations[idx].teams.push(data);
    },
    [UPDATE_PROFILE_SETTINGS](
      state: ProfileModuleState,
      data: SettingsInterface,
    ) {
      state.settings.uuid = data?.uuid || state.settings.uuid;
      state.settings.background = data?.background || state.settings.background;
    },
    [SIGN_OUT](state: ProfileModuleState) {
      Object.assign(state, initialProfileState());
    },
  },
  actions: {
    async create(context: Context, data: createProfileDto): Promise<Boolean> {
      return true;
    },
    async read(context: Context, params: readProfileDto): Promise<Boolean> {
      try {
        const res = await this.$axios.get('/profile', {params});
        if (res.status === 200) {
          context.commit(SET_PROFILE, res.data);
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
          console.warn('Reading profile failed');
        } else {
          console.error('There was an error: ' + err);
        }
      }
      return false;
    },
    async update(context: Context, data: updateProfileDto): Promise<any> {
      try {
        const res = await this.$axios.put('/profile', data);
        if (res.status === 200) {
          context.commit(SET_PROFILE, {...res.data, user: data.user});
          return true;
        } else {
          console.warn('Something went wrong');
        }
      } catch (err: any) {
        console.error(err);
        if (err?.response?.status === 400) {
          console.warn('Missing key(s) in body');
        } else if (err?.response?.status === 401) {
          console.warn('Unauthorized');
        } else if (err?.response?.status === 403) {
          console.warn('Forbidden');
        } else if (err?.response?.status === 404) {
          console.warn('Reading profile failed');
        } else {
          console.error('There was an error: ' + err);
        }
      }
      return false;
    },
    async createTeam(context: Context, data: createTeamDto): Promise<any> {
      try {
        const res = await this.$axios.post('/teams', data);
        if (res.status === 201) {
          context.commit(ADD_TEAM, res.data);
          return true;
        } else {
          console.warn('Something went wrong');
        }
      } catch (err: any) {
        console.error(err);
        if (err?.response?.status === 400) {
          console.warn('Missing key(s) in body');
        } else if (err?.response?.status === 401) {
          console.warn('Unauthorized');
        } else if (err?.response?.status === 403) {
          console.warn('Forbidden');
        } else if (err?.response?.status === 404) {
          console.warn('Reading profile failed');
        } else {
          console.error('There was an error: ' + err);
        }
      }
      return false;
    },
  },
};

export default ProfileModule;
