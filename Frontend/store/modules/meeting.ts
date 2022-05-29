import {ActionContext, Module} from 'vuex';
import {
  createMeetingDto,
  deleteCategoryDto,
  deleteMeetingDto,
  readMeetingDto,
  updateMeetingDto,
} from '~/dto/meetings';

import {RootState} from '..';
import {
  AUTH_MEETING,
  DELETE_MEETING_DATA,
  SET_CARD_DATA,
  READ_MEETING_DATA,
  SET_MEETING_DATA,
  SIGN_OUT,
  UPDATE_MEETING_DATA,
} from '../mutationTypes';
import {CardInterface, CategoryInterface} from './cards';
import {TeamInterface} from './team';
import {UserInterface} from './user';

const initialMeetingModuleState = () => ({
  uuid: '',
  id: '',
  name: '',
  password: '',
  status: '',
  categories: new Array<CategoryInterface>(),
  authorizedUsers: new Array<UserInterface>(),
  teamUuid: '',
  cards: new Array<CardInterface>(),
  team: {uuid: '', name: ''},
});

export interface MeetingInterface {
  uuid: string;
  id: string;
  name: string;
  password: string;
  status: string;
  categories: CategoryInterface[];
  authorizedUsers: UserInterface[];
  cards: CardInterface[];
  teamUuid: string;
  team: Partial<TeamInterface>;
}

type Context = ActionContext<MeetingModuleState, RootState>;
export type MeetingModuleState = ReturnType<typeof initialMeetingModuleState>;

const MeetingModule: Module<MeetingModuleState, RootState> = {
  namespaced: true,
  state: initialMeetingModuleState,

  mutations: {
    [SET_MEETING_DATA](state: MeetingModuleState, payload: MeetingModuleState) {
      state.uuid = payload.uuid;
      state.name = payload.name;
      state.id = payload.id;
      state.password = payload?.password || state.password;
      state.status = payload.status;
      state.teamUuid = payload.teamUuid;
      state.cards = payload?.cards || state.cards;
      state.team = payload?.team || state.team;
    },
    [READ_MEETING_DATA](
      state: MeetingModuleState,
      payload: MeetingModuleState,
    ) {
      state.uuid = payload.uuid;
      state.id = payload.id;
      state.name = payload.name;
      state.status = payload.status;
      state.categories = payload.categories;
      state.teamUuid = payload.teamUuid;
      state?.categories?.sort((a: CategoryInterface, b: CategoryInterface) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
    },
    [UPDATE_MEETING_DATA](
      state: MeetingModuleState,
      payload: {
        name?: string;
        status?: string;
        categories?: CategoryInterface[];
        card?: CardInterface;
      },
    ) {
      state.name = payload?.name || state.name;
      state.status = payload?.status || state.status;
      state.categories = payload?.categories || state.categories;
      state?.categories?.sort((a: CategoryInterface, b: CategoryInterface) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
      if (payload.card) {
        const i = state.cards.findIndex(
          (c: CardInterface) => payload.card?.uuid === c.uuid,
        );
        if (i > -1) {
          if (payload.card.deleted) {
            state.cards = [
              ...state.cards.slice(0, i),
              ...state.cards.slice(i + 1),
            ];
          } else {
            const newCard = Object.assign(state.cards[i], {...payload.card});
            state.cards = [
              ...state.cards.slice(0, i),
              newCard,
              ...state.cards.slice(i + 1),
            ];
          }
        } else {
          state.cards.push(payload.card);
        }
      }
    },
    [DELETE_MEETING_DATA](state: MeetingModuleState) {
      Object.assign(state, initialMeetingModuleState());
    },
    [SIGN_OUT](state: MeetingModuleState) {
      Object.assign(state, initialMeetingModuleState());
    },
  },

  actions: {
    async create(
      context: Context,
      payload: createMeetingDto,
    ): Promise<boolean> {
      try {
        const res = await this.$axios.post('/meeting', payload);
        if (res.status === 201) {
          context.commit(SET_MEETING_DATA, res.data);
          await context.dispatch(
            `modules/auth/${AUTH_MEETING}`,
            {
              meeting: {uuid: res.data.uuid, id: res.data.id},
              password: res.data.password, //Buffer.from(res.data.password, 'base64').toString('ascii'),
              uuid: context.rootGetters['modules/user/getUserUUID'],
            },
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
    async read(context: Context, params: readMeetingDto): Promise<boolean> {
      try {
        const res = await this.$axios.get('/meeting', {params});
        if (res.status === 200) {
          context.commit(READ_MEETING_DATA, {...res.data, id: res.data.id});
          res.data.cards.map((card: CardInterface) =>
            context.commit(`modules/cards/${SET_CARD_DATA}`, card, {
              root: true,
            }),
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
          console.warn('Read failed');
        } else {
          console.error('There was an error: ' + err);
        }
      }
      return false;
    },
    async update(
      context: Context,
      payload: updateMeetingDto,
    ): Promise<boolean> {
      try {
        const res = await this.$axios.put('/meeting', payload);
        if (res.status === 200) {
          context.dispatch(
            'modules/user/read',
            {uuid: context.rootGetters['modules/user/getUserUUID']},
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
    async deleteCategory(
      context: Context,
      payload: deleteCategoryDto,
    ): Promise<boolean> {
      try {
        const res = await this.$axios.put('/meeting/deleteCategory', payload);
        if (res.status === 200) {
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
    async delete(context: Context, data: deleteMeetingDto): Promise<boolean> {
      try {
        const res = await this.$axios.delete('/meeting', {data});
        if (res.status === 200) {
          context.commit(DELETE_MEETING_DATA);
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
  },
};

export default MeetingModule;
