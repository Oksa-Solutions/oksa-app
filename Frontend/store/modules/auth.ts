import {ActionContext, Module} from 'vuex';
import {authMeetingDto} from '~/dto/auth';

import {RootState} from '../';
import {
  AUTH_MEETING,
  REFRESH_TOKENS,
  SET_AUTH_TOKEN,
  SET_USER_AUTHENTICATED,
  SET_REFRESH_TOKEN,
  SET_MEETING_DATA,
  SET_USER_LOGGED_IN,
  SIGN_OUT,
} from '../mutationTypes';

export const initialAuthModuleState = () => ({
  authToken: '',
  refreshToken: '',
  isAuthenticated: false,
  loggedIn: false,
});

type Context = ActionContext<AuthModuleState, RootState>;
export type AuthModuleState = ReturnType<typeof initialAuthModuleState>;

const AuthModule: Module<AuthModuleState, RootState> = {
  namespaced: true,
  state: initialAuthModuleState,

  mutations: {
    [SET_AUTH_TOKEN](state: AuthModuleState, authToken: string) {
      state.authToken = authToken;
    },
    [SET_REFRESH_TOKEN](state: AuthModuleState, refreshToken: string) {
      state.refreshToken = refreshToken;
    },
    [SET_USER_AUTHENTICATED](state: AuthModuleState, isAuthenticated: boolean) {
      state.isAuthenticated = isAuthenticated;
    },
    [SET_USER_LOGGED_IN](state: AuthModuleState, loggedIn: boolean) {
      state.loggedIn = loggedIn;
    },
    [SIGN_OUT](state: AuthModuleState) {
      Object.assign(state, initialAuthModuleState());
    },
  },

  actions: {
    async [REFRESH_TOKENS](context: Context, uuid: string): Promise<boolean> {
      try {
        const res = await this.$axios.post('/auth/refreshToken');
        if (res.status === 201) {
          this.$axios.setToken(res.data.authToken, 'Bearer');
          context.commit(SET_AUTH_TOKEN, res.data.authToken);
          context.commit(SET_REFRESH_TOKEN, res.data.refreshToken);
          return true;
        } else {
          console.warn('Something went wrong');
        }
      } catch (err: any) {
        if (err?.response?.status === 400) {
          console.warn('Missing key(s) in body');
        } else if (err?.response?.status === 404) {
          console.warn('Token creation failed');
        }
        console.error(err);
      }
      return false;
    },
    async [AUTH_MEETING](
      context: Context,
      payload: authMeetingDto,
    ): Promise<boolean> {
      try {
        const res = await this.$axios.post('/auth/meeting', payload);
        if (res.status === 201) {
          this.$axios.setToken(res.data.tokens.authToken, 'Bearer');
          context.commit(SET_AUTH_TOKEN, res.data.tokens.authToken);
          context.commit(SET_REFRESH_TOKEN, res.data.tokens.refreshToken);
          context.commit(SET_USER_AUTHENTICATED, true);
          context.commit(
            `modules/meeting/${SET_MEETING_DATA}`,
            res.data.meeting,
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
          console.warn('Faced error during authentication');
        } else {
          console.error(err);
        }
      }
      return false;
    },
  },
};

export default AuthModule;
