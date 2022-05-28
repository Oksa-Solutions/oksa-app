import {ActionContext, ActionTree, Module} from 'vuex';

import {RootState} from '../index';
import {
  ADD_CATEGORY,
  ADD_STATUS,
  EDIT_SEARCH_TEXT,
  REMOVE_CATEGORY,
  REMOVE_STATUS,
  RESET_FILTERS,
  SIGN_OUT,
} from '../mutationTypes';

const initialFiltersModuleState = () => ({
  filteredCategories: new Array<string>(),
  filteredStatus: new Array<string>(),
  searchText: '',
});

type Context = ActionContext<FiltersModuleState, RootState>;
export type FiltersModuleState = ReturnType<typeof initialFiltersModuleState>;

const FiltersModule: Module<FiltersModuleState, RootState> = {
  namespaced: true,
  state: initialFiltersModuleState,

  mutations: {
    [ADD_CATEGORY](state: FiltersModuleState, category: string) {
      state.filteredCategories = state.filteredCategories.filter(
        (c: string) => c !== category,
      );
      state.filteredCategories.push(category);
    },
    [REMOVE_CATEGORY](state: FiltersModuleState, category: string) {
      state.filteredCategories = state.filteredCategories.filter(
        (c: string) => c !== category,
      );
    },
    [ADD_STATUS](state: FiltersModuleState, status: string) {
      state.filteredStatus = state.filteredStatus.filter(
        (s: string) => s !== status,
      );
      state.filteredStatus.push(status);
    },
    [REMOVE_STATUS](state: FiltersModuleState, status: string) {
      state.filteredStatus = state.filteredStatus.filter(
        (s: string) => s !== status,
      );
    },
    [EDIT_SEARCH_TEXT](state: FiltersModuleState, searchText: string) {
      state.searchText = searchText;
    },
    [SIGN_OUT](state: FiltersModuleState) {
      Object.assign(state, initialFiltersModuleState());
    },
    [RESET_FILTERS](state: FiltersModuleState) {
      Object.assign(state, initialFiltersModuleState());
    },
  },
  actions: {
    modifyCategoryFilters(context: Context, category: string) {
      if (
        context.state.filteredCategories.findIndex(
          (c: string) => c === category,
        ) >= 0
      ) {
        context.commit(REMOVE_CATEGORY, category);
      } else {
        context.commit(ADD_CATEGORY, category);
      }
    },
    modifyStatusFilters(context: Context, status: string) {
      if (
        context.state.filteredStatus.findIndex((s: string) => s === status) >= 0
      ) {
        context.commit(REMOVE_STATUS, status);
      } else {
        context.commit(ADD_STATUS, status);
      }
    },
    modifySearchText(context: Context, searchText: string) {
      context.commit(EDIT_SEARCH_TEXT, searchText);
    },
    resetFilters(context: Context) {
      context.commit(RESET_FILTERS);
    },
  },
};

export default FiltersModule;
