import {ActionContext, ActionTree, Module} from 'vuex';

import {RootState} from '../index';
import {
  SET_AUTH_TOKEN,
  SET_CARD_DATA,
  SET_ORGANISATION_DATA,
  SET_PROFILE,
  SET_REFRESH_TOKEN,
  SET_USER_DATA,
  SIGN_OUT,
  UPDATE_USER_DATA,
  UPDATE_USER_MEETING,
} from '../mutationTypes';
import {ProfileInterface} from './profile';
import {
  createUserDto,
  deleteUserDto,
  getUsersMeetings,
  readUserDto,
  updateUserDto,
} from '~/dto/users';
import {MeetingInterface} from './meeting';
import {CardInterface} from './cards';
import {OrganisationInterface} from './organisation';

const initialUserModuleState = () => ({
  uuid: '',
  cards: new Array<CardInterface>(),
  meetings: new Array<MeetingInterface>(),
});

export interface UserInterface {
  uuid: string;
  authToken: string;
  refreshToken: string;
  profile?: ProfileInterface;
  meetings?: MeetingInterface[];
}

export type UserModuleState = ReturnType<typeof initialUserModuleState>;
type Context = ActionContext<UserModuleState, RootState>;

const UserModule: Module<UserModuleState, RootState> = {
  namespaced: true,
  state: initialUserModuleState,

  mutations: {
    [SET_USER_DATA](state: UserModuleState, data: UserModuleState) {
      state.uuid = data?.uuid || state.uuid;
      state.cards = data.cards || state.cards;
      state.meetings = data?.meetings || state.meetings;
    },
    [UPDATE_USER_MEETING](state: UserModuleState, data: MeetingInterface) {
      const idx = state.meetings.findIndex((m: MeetingInterface) => m.uuid === data.uuid);
      const updatedMeeting = Object.assign(state.meetings[idx], {...data});
      state.meetings = [...state.meetings.slice(0, idx), updatedMeeting, ...state.meetings.slice(idx + 1,)];
    },
    [SIGN_OUT](state: UserModuleState) {
      Object.assign(state, initialUserModuleState());
    },
  },
  getters: {
    getUserUUID: (state: UserModuleState, getters: any) => {
      return state.uuid;
    },
    getMeeting: (state: UserModuleState, getters: any) => (uuid: string) => {
      return state.meetings.find((m: MeetingInterface) => m.uuid === uuid);
    },
    getCard: (state: UserModuleState, getters: any) => (uuid: string) => {
      const meeting = state.meetings.find((m: MeetingInterface) => m.cards.map((c: CardInterface) => c.uuid).includes(uuid));
      return {meeting: {uuid: meeting?.uuid}, ...state.meetings.map((m: MeetingInterface) => m.cards.find((c: CardInterface) => c.uuid === uuid)).find((c: CardInterface | undefined) => c?.uuid === uuid)};
    }
  },
  actions: {
    async create(context: Context, data: createUserDto): Promise<boolean> {
      try {
        const res = await this.$axios.post('/user', data, {
          headers: {'x-api-key': process.env.apiKey},
        });
        if (res?.status === 201) {
          context.commit(SET_USER_DATA, res.data);
          this.$axios.setToken(res.data.authToken, 'Bearer');
          context.commit(`modules/auth/${SET_AUTH_TOKEN}`, res.data.authToken, {
            root: true,
          });
          context.commit(
            `modules/auth/${SET_REFRESH_TOKEN}`,
            res.data.refreshToken,
            {root: true},
          );
          return true;
        } else {
          console.warn('Something went wrong');
        }
      } catch (err: any) {
        if (err?.response?.status === 400) {
          console.warn('Missing key(s) in body');
        } else if (err?.response?.status === 404) {
          console.warn('Creation failed');
        } else {
          console.error('There was an error: ' + err);
        }
      }
      return false;
    },
    async read(context: Context | any, params: readUserDto): Promise<boolean> {
      try {
        const res = await this.$axios.get('/user', {
          params,
          headers: {'x-api-key': process.env.apiKey},
        });
        if (res?.status === 200) {
          context.commit(SET_USER_DATA, {...res.data});
          this.$axios.setToken(res.data.authToken, 'Bearer');
          context.commit(`modules/auth/${SET_AUTH_TOKEN}`, res.data.authToken, {
            root: true,
          });
          context.commit(
            `modules/auth/${SET_REFRESH_TOKEN}`,
            res.data.refreshToken,
            {root: true},
          );
          context.commit(
            `modules/profile/${SET_PROFILE}`,
            {...res.data.profile, user: {uuid: res.data.uuid}, organisations: res.data.organisations, teams: res.data.teams},
            {root: true},
          );
          if (res?.data?.organisations?.length > 0) {
            const idx = res.data.organisations.findIndex(
              (o: OrganisationInterface) =>
                o.uuid === context?.rootState?.modules?.organisation?.uuid,
            );
            context.commit(
              `modules/organisation/${SET_ORGANISATION_DATA}`,
              res.data.organisations[idx === -1 ? 0 : idx],
              {root: true},
            );
          }

          res.data.cards.map((c: CardInterface) => {
            context.commit(`modules/cards/${SET_CARD_DATA}`, c, {root: true});
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
          console.warn('Read failed');
        } else {
          console.error('There was an error: ' + err);
        }
      }
      return false;
    },
    async update(context: Context, payload: updateUserDto) {
      try {
        const res = await this.$axios.put('/user', payload);
        if (res?.status === 200) {
          context.commit(SET_USER_DATA, res.data);
          context.commit(`modules/auth/${SET_AUTH_TOKEN}`, res.data.authToken, {
            root: true,
          });
          context.commit(
            `modules/auth/${SET_REFRESH_TOKEN}`,
            res.data.refreshToken,
            {root: true},
          );
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
          console.warn('Update failed');
        } else {
          console.error('There was an error: ' + err);
        }
      }
      return false;
    },
    async delete(context: Context, data: deleteUserDto) {
      try {
        const res = await this.$axios.delete('/user', {data});
        if (res?.status === 200) {
          context.commit(SET_USER_DATA, initialUserModuleState);
          context.commit(`modules/auth/${SET_AUTH_TOKEN}`, '', {root: true});
          context.commit(`modules/auth/${SET_REFRESH_TOKEN}`, '', {
            root: true,
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
          console.warn('Delete failed');
        } else {
          console.error('There was an error: ' + err);
        }
      }
      return false;
    },
    async getMeetings(context: Context, params: getUsersMeetings) {
      try {
        const res = await this.$axios.get('/meeting/user', {params});
        if (res?.status === 200) {
          context.commit(SET_USER_DATA, {meetings: res.data});
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
          context.commit(SET_USER_DATA, {meetings: []});
          return true;
        } else {
          console.error('There was an error: ' + err);
        }
      }
      return false;
    },
  },
};

export default UserModule;
