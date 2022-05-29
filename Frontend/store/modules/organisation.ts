import {ActionContext, Module} from 'vuex';
import {NO_ORG} from '~/assets/constants';
import {
  addOrganisationMembersDto,
  createOrganisationDto,
  updateOrganisationDto,
} from '~/dto/organisations';
import {RootState} from '..';
import {
  CREATE_ORGANISATION,
  SET_ORGANISATION_DATA,
  SET_PROFILE,
  SIGN_OUT,
  UPDATE_ORGANISATION,
} from '../mutationTypes';
import {ProfileInterface} from './profile';
import {TeamInterface} from './team';

const initialOrganisationModuleState = () => ({
  uuid: '',
  name: NO_ORG,
  contactPerson: '',
  contactEmail: '',
  admins: new Array<String>(),
  users: new Array<String>(),
  teams: new Array<TeamInterface>(),
});

export interface OrganisationInterface {
  uuid: string;
  name: string;
  contactPerson: string;
  contactEmail: string;
  admins: string[];
  users: string[];
  teams: TeamInterface[];
}

type Context = ActionContext<OrganisationModuleState, RootState>;
export type OrganisationModuleState = ReturnType<
  typeof initialOrganisationModuleState
>;

const OrganisationModule: Module<OrganisationModuleState, RootState> = {
  namespaced: true,
  state: initialOrganisationModuleState,

  mutations: {
    [SET_ORGANISATION_DATA](
      state: OrganisationModuleState,
      org: OrganisationInterface,
    ) {
      state.uuid = org.uuid;
      state.name = org?.name || state.name;
      state.contactPerson = org?.contactPerson || state.contactPerson;
      state.contactEmail = org?.contactEmail || state.contactEmail;
      state.admins = org?.admins || state.admins;
      state.users = org?.users || state.users;
      state.teams = org?.teams || state.teams;
    },
    [SIGN_OUT](state: OrganisationModuleState) {
      Object.assign(state, initialOrganisationModuleState());
    },
  },
  actions: {
    async createOrganisation(
      context: Context | any, // TODO: fix type of context
      payload: createOrganisationDto,
    ): Promise<boolean> {
      try {
        const res = await this.$axios.post('/organisation', payload);
        if (res.status === 201) {
          if (
            payload.admins
              .map((a: ProfileInterface) => a.uuid)
              .includes(context.rootState.modules.profile.uuid)
          ) {
            const profile = JSON.parse(
              JSON.stringify(context.rootState.modules.profile),
            );
            profile.organisations.push(res.data);
            context.commit(`modules/profile/${SET_PROFILE}`, profile, {
              root: true,
            });
          }
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
    async updateOrganisation(
      context: Context | any, // TODO: fix type of context
      payload: updateOrganisationDto,
    ): Promise<Boolean> {
      try {
        const res = await this.$axios.put('/organisation', payload);
        if (res.status === 200) {
          const profile = JSON.parse(
            JSON.stringify(context.rootState.modules.profile),
          );
          const idx = profile.organisations.findIndex(
            (o: OrganisationInterface) => {
              return o.uuid === payload.uuid;
            },
          );
          if (idx === -1) {
            profile.organisations.push(res.data);
          } else {
            profile.organisations[idx] = Object.assign(
              profile.organisations[idx],
              res.data,
            );
          }
          context.commit(`modules/profile/${SET_PROFILE}`, profile, {
            root: true,
          });
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
    async addOrganisationMembers(
      context: Context,
      payload: addOrganisationMembersDto,
    ): Promise<any> {
      try {
        const res = await this.$axios.put('/organisation/addUsers', payload);
        if (res.status === 200) {
          context.commit(SET_ORGANISATION_DATA, {
            ...res.data,
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
    async removeOrganisationMembers(
      context: Context,
      payload: addOrganisationMembersDto,
    ): Promise<any> {
      try {
        const res = await this.$axios.put('/organisation/removeUsers', payload);
        if (res.status === 200) {
          context.commit(SET_ORGANISATION_DATA, {
            ...res.data,
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

export default OrganisationModule;
