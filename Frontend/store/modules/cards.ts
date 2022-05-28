import {ActionContext, Module} from 'vuex';

import {
  CREATE_CARD_DATA,
  DELETE_CARD_DATA,
  READ_CARD_DATA,
  RESET_CARDS,
  SET_CARD_DATA,
  SIGN_OUT,
  UPDATE_CARD_DATA,
  UPDATE_USER_DATA,
  UPDATE_USER_MEETING,
  UPDATE_VOTING_DATA,
} from '../mutationTypes';
import {RootState} from '..';
import {
  createCardDto,
  deleteCardDto,
  readCardDto,
  updateCardDto,
  voteCardDto,
} from '~/dto/cards';
import {MeetingInterface} from './meeting';

export interface CardInterface {
  uuid: string;
  author: {uuid: string};
  title: string;
  content: string;
  votes: VotesInterface;
  categories: CategoryInterface[];
  dates: DatesInterface;
  status: string;
  taskStatus: string;
  deleted: boolean;
  meeting: MeetingInterface;
}

export interface VotesInterface {
  yes: string[];
  no: string[];
}

export interface DatesInterface {
  startDate: Date | null;
  endDate: Date | null;
}

export interface CategoryInterface {
  name: string;
  color: string;
}

const initialCardsModuleState = () => ({cards: new Array<CardInterface>()});

type Context = ActionContext<CardsModuleState, RootState>;
export type CardsModuleState = ReturnType<typeof initialCardsModuleState>;

const CardsModule: Module<CardsModuleState, RootState> = {
  namespaced: true,
  state: initialCardsModuleState,

  mutations: {
    [CREATE_CARD_DATA](state: CardsModuleState, payload: CardInterface) {
      const card: CardInterface = {
        uuid: payload.uuid,
        author: {uuid: payload.author.uuid},
        title: payload.title,
        content: payload.content,
        categories: payload?.categories || [],
        dates: payload?.dates || {
          startDate: new Date(0),
          endDate: new Date(0),
        },
        status: payload?.status || '',
        taskStatus: payload?.taskStatus || '',
        votes: {yes: [], no: []},
        deleted: false,
        meeting: payload.meeting,
      };
      state.cards.push(card);
    },
    [SET_CARD_DATA](state: CardsModuleState, card: CardInterface) {
      if (state.cards.some((c: CardInterface) => c.uuid === card.uuid)) {
        // If card already exists in array, update it
        const idx: number = state.cards.findIndex(
          (c: CardInterface) => c.uuid === card.uuid,
        );
        state.cards.splice(idx, 1, card);
      } else {
        // Push new card to array
        state.cards.push(card);
      }
    },
    [READ_CARD_DATA](state: CardsModuleState, card: CardInterface) {
      if (state.cards.some((c: CardInterface) => c.uuid === card.uuid)) {
        // If card already exists in array, update it
        const idx: number = state.cards.findIndex(
          (c: CardInterface) => c.uuid === card.uuid,
        );
        state.cards.splice(idx, 1, card);
      } else {
        // Push new card to array
        state.cards.push(card);
      }
    },
    [UPDATE_CARD_DATA](state: CardsModuleState, card: CardInterface) {
      const idx: number = state.cards.findIndex(
        (c: CardInterface) => c.uuid === card.uuid,
      );
      if (idx >= 0) {
        const currentCard: CardInterface = state.cards[idx];
        state.cards.splice(idx, 1, {...currentCard, ...card});
      }
    },
    [UPDATE_VOTING_DATA](state: CardsModuleState, card: CardInterface) {
      const idx: number = state.cards.findIndex(
        (c: CardInterface) => c.uuid === card.uuid,
      );
      if (idx >= 0) {
        const currentCard: CardInterface = state.cards[idx];
        const newCard: CardInterface = {
          ...currentCard,
          votes: {...currentCard.votes, ...card.votes},
        };
        state.cards.splice(idx, 1, newCard);
      }
    },
    [DELETE_CARD_DATA](state: CardsModuleState, uuid: string) {
      const idx: number = state.cards.findIndex(
        (c: CardInterface) => c.uuid === uuid,
      );
      if (idx >= 0) {
        state.cards = [
          ...state.cards.slice(0, idx),
          ...state.cards.slice(idx + 1),
        ];
      }
    },
    [RESET_CARDS](state: CardsModuleState) {
      state.cards = [];
    },
    [SIGN_OUT](state: CardsModuleState) {
      Object.assign(state, initialCardsModuleState());
    },
  },

  actions: {
    async createCard(
      context: Context,
      payload: createCardDto,
    ): Promise<boolean> {
      try {
        const res = await this.$axios.post('/card', payload);
        if (res.status === 201) {
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
          console.warn('Creation failed');
        } else {
          console.error('There was an error: ' + err);
        }
      }
      return false;
    },
    async copyCard(context: Context, payload: createCardDto): Promise<any> {
      try {
        const res = await this.$axios.post('/card', payload);
        if (res.status === 201) {
          return {success: true, data: res.data};
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
          console.warn('Creation failed');
        } else {
          console.error('There was an error: ' + err);
        }
      }
      return {success: false, data: 'Error'};
    },
    async readCard(context: Context, payload: readCardDto): Promise<boolean> {
      try {
        const res = await this.$axios.get('/card', {params: payload});
        if (res.status === 200) {
          context.commit(READ_CARD_DATA, res.data);
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
    async readActiveCards(
      context: Context,
      params: readCardDto,
    ): Promise<boolean> {
      try {
        const res = await this.$axios.get('/card/readActive', {params});
        if (res.status === 200) {
          res.data.map((card: CardInterface) =>
            context.commit(SET_CARD_DATA, card),
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
    async readDeletedCards(
      context: Context,
      params: readCardDto,
    ): Promise<boolean> {
      try {
        const res = await this.$axios.get('/card/readDeleted', {params});
        if (res.status === 200) {
          res.data.map((card: CardInterface) =>
            context.commit(SET_CARD_DATA, card),
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
    async updateCard(
      context: Context,
      payload: updateCardDto,
    ): Promise<boolean> {
      try {
        const res = await this.$axios.put('/card', payload);
        if (res.status === 200) {
          context.commit(UPDATE_CARD_DATA, payload);
          // Update card in meetings which is under users
          const meeting = context.rootGetters['modules/user/getMeeting'](payload.meeting.uuid)
          const idx = meeting.cards.findIndex((c: CardInterface) => c.uuid === payload.uuid);
          const newCard = Object.assign({...meeting.cards[idx]}, {
            uuid: payload.uuid,
            title: payload?.title,
            content: payload?.content,
            categories: payload?.categories,
            dates: payload?.dates,
            status: payload?.status,
            taskStatus: payload?.taskStatus,
          });
          context.commit(`modules/user/${UPDATE_USER_MEETING}`, {
            ...meeting,
            cards: [...meeting.cards.slice(0, idx),
            newCard,
            ...meeting.cards.slice(idx+1,)]
          }, {root: true});
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
    async deleteCard(
      context: Context,
      payload: deleteCardDto,
    ): Promise<boolean> {
      try {
        const res = await this.$axios.delete('/card', {data: payload});
        if (res.status === 200) {
          context.commit(DELETE_CARD_DATA, payload.uuid);
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
    async voteCard(context: Context, payload: voteCardDto): Promise<boolean> {
      try {
        const res = await this.$axios.put('/card/vote', payload);
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
          console.warn('Vote failed');
        } else {
          console.error('There was an error: ' + err);
        }
      }
      return false;
    },
    resetCards(context: Context) {
      context.commit(RESET_CARDS);
    },
  },
};

export default CardsModule;
