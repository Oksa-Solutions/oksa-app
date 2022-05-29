import {ActionContext, Module} from 'vuex';
import {
  SET_CURRENT_PAGE,
  SET_DARKMODE,
  SET_ERROR,
  SET_LANG,
  SIGN_OUT,
  TOGGLE_LOADING,
} from '../mutationTypes';

import {RootState} from '../';

interface ErrorInterface {
  isError: boolean;
  errorText: string;
}

const initialBaseModuleState = () => ({
  error: {isError: false, errorText: ''},
  loading: false,
  currentPage: '/',
  darkMode: false,
  language: 'GB-UKM',
});

type Context = ActionContext<BaseModuleState, RootState>;
export type BaseModuleState = ReturnType<typeof initialBaseModuleState>;

const BaseModule: Module<BaseModuleState, RootState> = {
  namespaced: true,
  state: initialBaseModuleState,
  mutations: {
    [TOGGLE_LOADING](state: BaseModuleState, loading: boolean) {
      state.loading = loading;
    },
    [SET_ERROR](state: BaseModuleState, error: ErrorInterface) {
      state.error = error;
    },
    [SET_DARKMODE](state: BaseModuleState, dark: boolean) {
      state.darkMode = dark;
    },
    [SET_CURRENT_PAGE](state: BaseModuleState, page: string) {
      state.currentPage = page;
    },
    [SET_LANG](state: BaseModuleState, lang: string) {
      state.language = lang;
    },
    [SIGN_OUT](state: BaseModuleState) {
      Object.assign(state, initialBaseModuleState());
    },
  },
  actions: {
    toggleLoading(context: Context, loading: boolean) {
      context.commit(TOGGLE_LOADING, loading);
    },
    setError(context: Context, error: ErrorInterface) {
      context.commit(SET_ERROR, error);
    },
    setDarkMode(context: Context, dark: boolean) {
      context.commit(SET_DARKMODE, dark);
    },
    setPage(context: Context, page: string) {
      context.commit(SET_CURRENT_PAGE, page);
    },
    setLanguage(context: Context, lang: string) {
      context.commit(SET_LANG, lang);
    },
  },
};

export default BaseModule;
