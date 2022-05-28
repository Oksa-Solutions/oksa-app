import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import AuthModule from './modules/auth';
import BaseModule from './modules/base';
import CardsModule from './modules/cards';
import FiltersModule from './modules/filters';
import MeetingModule from './modules/meeting';
import UserModule from './modules/user';
import ProfileModule from './modules/profile';

const initialRootState = () => ({});

export type RootState = ReturnType<typeof initialRootState>;

const vuexLocal = new VuexPersistence<RootState>({
  storage: window.localStorage,
});

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: initialRootState,
  modules: {
    auth: AuthModule,
    base: BaseModule,
    cards: CardsModule,
    filters: FiltersModule,
    meeting: MeetingModule,
    user: UserModule,
    profile: ProfileModule,
  },
  plugins: [vuexLocal.plugin],
});
