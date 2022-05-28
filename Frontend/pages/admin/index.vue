<template>
  <v-card class="pa-4">
    <AdminEditModal
      v-if="showEditModal"
      v-bind="{
        tabType: tab,
        tabItem: {...editItem},
        profiles: {...this.profiles},
      }"
      @closed="closeEditModal"
    />
    <v-card-title class="">
      Admin dashboard
      <v-spacer />
      <v-text-field
        v-model="search"
        prepend-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      />
    </v-card-title>
    <v-btn
      v-if="isSuperAdmin"
      color="primary"
      class="mx-4"
      @click="() => (addOrganisation = true)"
    >
      <v-icon>mdi-plus</v-icon>
      Add organisation
      <AddOrganisationModal
        v-if="addOrganisation"
        @closed="() => (addOrganisation = false)"
      />
    </v-btn>

    <v-tabs v-model="tab" class="elevation-0">
      <v-tabs-slider />
      <v-tab v-for="(tab, i) in tabs" :key="i" :href="`#${tab}`">
        {{ tab }}
      </v-tab>
      <v-tab-item v-for="(tab, i) in tabs" :key="i" :value="tab">
        <v-data-table
          :headers="getHeaders(tab)"
          :items="getItems(tab)"
          :items-per-page="10"
          :search="search"
          @click:row="(item) => selectForEdit(item)"
          class="elevation-2"
        >
        </v-data-table>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script lang="ts">
import {NuxtAxiosInstance} from '@nuxtjs/axios';
import {Vue, Component} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import {mapState} from 'vuex';
import jwt_decode from 'jwt-decode';

import {OrganisationInterface} from '../../store/modules/organisation';
import {UserInterface} from '../../store/modules/user';
import {ProfileInterface} from '../../store/modules/profile';
import {
  ORGANISATIONS,
  PROFILES,
  SUPER_ADMIN,
  USERS,
} from '../../assets/constants';
import {tokenType} from '~/middleware/admin';

export type tabItemType =
  | UserInterface
  | OrganisationInterface
  | ProfileInterface;

const adminProps = Vue.extend({
  computed: mapState({
    auth: (state: any) => state.modules.auth,
    profile: (state: any) => state.modules.profile,
  }),
  layout: 'dashboard',
});

@Component({
  head() {
    return {title: 'Admin'};
  },
  middleware: ['admin'],
})
export default class Admin extends mixins(adminProps) {
  $axios: any; //NuxtAxiosInstance;
  $router: any;
  $initialLoad: any;
  $store: any;
  addOrganisation: boolean = false;
  isSuperAdmin: boolean = false;

  editItem: tabItemType | null = null;
  showEditModal: boolean = false;
  window = {
    width: 0,
  };
  search: string = '';

  users: UserInterface[] = new Array<UserInterface>();
  profiles: ProfileInterface[] = new Array<ProfileInterface>();
  organisations: OrganisationInterface[] = new Array<OrganisationInterface>();

  tab: string = PROFILES;
  tabs: string[] = [PROFILES, ORGANISATIONS, USERS];

  async mounted() {
    this.checkSuperAdmin();
    await this.$initialLoad();
    await this.fetchAdminData();
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  }

  checkSuperAdmin() {
    const authToken = this.$store?.state?.modules?.auth?.authToken || undefined;
    if (authToken) {
      const decoded: tokenType = jwt_decode(authToken);
      const organisations = decoded?.organisations;
      this.isSuperAdmin =
        organisations
          ?.map((o: OrganisationInterface) => o.name)
          ?.includes(SUPER_ADMIN) || false;
    } else {
      this.isSuperAdmin = false;
    }
  }

  handleResize() {
    this.window.width = window.innerWidth;
  }

  formatKeyString(key: string) {
    return key
      .split(/(?=[A-Z])/)
      .map((s) => {
        if (s === 'uuid') {
          return 'UUID';
        }
        return s[0].toUpperCase() + s.slice(1).toLowerCase();
      })
      .join(' ');
  }

  async fetchAdminData() {
    const resData = (await this.$axios.get('/admin/organisations')).data;
    this.profiles = resData.profiles;
    this.users = resData.users;
    this.organisations = resData.organisations;
  }

  selectForEdit(item: tabItemType) {
    this.showEditModal = true;
    this.editItem = item;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editItem = null;
  }

  getItems(tab: string) {
    switch (tab) {
      case USERS:
        return this.users;
      case PROFILES:
        return this.profiles;
      case ORGANISATIONS:
        return this.organisations;
      default:
        break;
    }
  }
  getHeaders(tab: string) {
    const sortableFields = ['name', 'email', 'created', 'lastModified'];
    switch (tab) {
      case USERS:
        return Object.keys(this.users[0] || {}).map((key: string) => {
          return {
            text: this.formatKeyString(key),
            value: key,
            sortable: sortableFields.includes(key),
          };
        });
      case PROFILES:
        return Object.keys(this.profiles[0] || {}).map((key: string) => {
          return {
            text: this.formatKeyString(key),
            value: key,
            sortable: sortableFields.includes(key),
          };
        });
      case ORGANISATIONS:
        return Object.keys(this.organisations[0] || {}).map((key: string) => {
          return {
            text: this.formatKeyString(key),
            value: key,
            sortable: sortableFields.includes(key),
          };
        });
      default:
        break;
    }
  }
}
</script>
