<template>
  <v-app Dark>
    <CreateTeamModal v-if="showTeamModal" @closed="closeTeamModal" />
    <v-card class="mx-auto">
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="miniVariant"
        mini-variant-width="72"
        app
        stateless
        :temporary="!miniVariant"
        class="elevation-3"
        style="overflow: visible"
      >
        <v-btn
          fab
          absolute
          bottom
          right
          elevation="1"
          color="primary"
          @click="toggleMenu"
          class="fabDrawer"
        >
          <v-icon large
            >mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon
          >
        </v-btn>

        <v-row class="fill-height" no-gutters>
          <v-list nav dense class="grow pa-0">
            <v-list-item class="d-flex justify-center align-center py-2">
              <div class="d-flex flex-column justify-center align-center">
                <div
                  v-if="!miniVariant"
                  style="position: absolute; top: 10px; right: 20px"
                >
                  <NotificationIcon />
                </div>
                <InitialsCircle
                  :name="profile.name"
                  :width="!miniVariant ? '96px' : '40px'"
                  :height="!miniVariant ? '96px' : '40px'"
                  :fontSize="!miniVariant ? '38px' : '15px'"
                />

                <div
                  v-if="!miniVariant"
                  class="d-flex justify-center flex-column"
                >
                  <v-card-subtitle class="mb-n8 d-flex justify-center">
                    Welcome back,
                  </v-card-subtitle>
                  <v-card-title class="d-flex justify-center text-h6 bold">
                    {{ makeTitleName(profile.name) }}
                  </v-card-title>
                  <v-menu :disabled="organisations.length < 1">
                    <template v-slot:activator="{on, attrs}">
                      <v-chip v-bind="attrs" v-on="on" class="justify-center">
                        {{ currentOrg.name }}
                        <v-icon>
                          {{ 'mdi-chevron-down' }}
                        </v-icon>
                      </v-chip>
                    </template>
                    <v-list>
                      <v-list-item
                        v-for="organisation in organisations"
                        :key="organisation.uuid"
                        @click="selectOrganisation(organisation)"
                      >
                        {{ organisation.name || noOrg }}
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </div>
            </v-list-item>
            <v-divider />

            <v-list-group
              no-action
              v-for="item in generalSettings"
              :key="item.title"
              @click="moveToRoute(item.link)"
              append-icon
            >
              <template v-slot:activator>
                <v-list-item>
                  <v-icon>{{ item.icon }}</v-icon>
                  <v-list-item-subtitle class="pl-7 py-1 semibold">{{
                    item.title
                  }}</v-list-item-subtitle>
                </v-list-item>
              </template>
            </v-list-group>

            <!-- <div v-if="profile.role === 'Premium'"> -->
            <div v-if="currentOrg.name !== noOrg">
              <v-list-group
                no-action
                v-for="item in premiumSettings"
                :key="item.title"
                @click="moveToRoute(item.link)"
                append-icon
              >
                <template v-slot:activator>
                  <v-list-item>
                    <v-icon>{{ item.icon }}</v-icon>
                    <v-list-item-subtitle
                      v-if="!miniVariant"
                      class="pl-7 py-1 semibold"
                      >{{ item.title }}</v-list-item-subtitle
                    >
                  </v-list-item>
                </template>
              </v-list-group>
            </div>

            <v-divider />

            <div
              v-if="!miniVariant && currentOrg.name !== noOrg"
              class="d-flex justify-space-between align-center mr-2"
            >
              <v-card-subtitle> TEAMS </v-card-subtitle>
              <v-list-item-icon>
                <v-icon
                  v-if="
                    currentOrg.admins.map((a) => a.uuid).includes(profile.uuid)
                  "
                  color="primary"
                  @click="createTeam"
                >
                  mdi-plus
                </v-icon>
              </v-list-item-icon>
            </div>

              <!-- v-for="team in [...currentOrg.teams].filter(t => t.users.map(u => u.uuid).includes(profile.uuid)).sort(sortByLastModified).slice(0, 3)" -->
            <v-list-group
              no-action
              v-for="team in [...teams].filter(t => t.organisation.uuid === currentOrg.uuid).slice(0,3)"
              :key="team.uuid"
              @click="selectTeam(team)"
            >
              <template v-slot:activator>
                <v-list-item class="py-1">
                  <SquaredIcon
                    v-bind="{name: team.name, width: '40px', height: '40px'}"
                  />
                  <v-list-item-subtitle
                    v-if="!miniVariant"
                    class="pl-2 py-1 semibold subtitle-break"
                  >
                    {{ team.name }}
                  </v-list-item-subtitle>
                </v-list-item>
              </template>

              <v-list-item
                v-for="item in teamSettings"
                :key="item.title"
                @click="selectTeamMenuItem(team.uuid, item.link)"
              >
                <v-icon>{{ item.icon }}</v-icon>
                <v-list-item-subtitle class="pl-7 py-1 semibold">{{
                  item.title
                }}</v-list-item-subtitle>
              </v-list-item>
            </v-list-group>

            <v-list-item @click="moveToRoute('/dashboard/teams')">
              <v-icon>mdi-page-next-outline</v-icon>
              <v-list-item-subtitle
                v-if="!miniVariant"
                class="pl-7 py-1 semibold"
              >
                {{ getSeeAllText() }}
              </v-list-item-subtitle>
            </v-list-item>

            <v-divider />

            <v-list-group
              v-for="item in accountSettings"
              :key="item.title"
              @click="moveToRoute(item.link)"
              no-action
              append-icon
            >
              <template v-slot:activator>
                <v-list-item>
                  <v-icon>{{ item.icon }}</v-icon>
                  <v-list-item-subtitle class="pl-7 py-1 semibold">{{
                    item.title
                  }}</v-list-item-subtitle>
                </v-list-item>
              </template>
            </v-list-group>
          </v-list>
        </v-row>
      </v-navigation-drawer>
    </v-card>
    <v-main class="main">
      <nuxt />
    </v-main>
    <Snackbar />
  </v-app>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';
import {mapState} from 'vuex';
import {ALLOWED_DOMAINS, NO_ORG} from '~/assets/constants';
import { ProfileInterface } from '~/store/modules/profile';
import {TeamInterface} from '~/store/modules/team';
import {OrganisationInterface} from '../store/modules/organisation';
import {
  SET_ORGANISATION_DATA,
  SIGN_OUT,
} from '../store/mutationTypes';

const dashboardProps = Vue.extend({
  computed: mapState({
    organisations: (state: any) => state.modules.profile.organisations,
    profile: (state: any) => state.modules.profile,
    teams: (state: any) => state.modules.profile.teams,
    currentOrg: (state: any) => state.modules.organisation,
  }),
});

@Component({
  middleware: ['auth'],
})
export default class Dashboard extends mixins(dashboardProps) {
  $notifier: any;
  $route: any;
  $router: any;
  $store: any;
  miniVariant: boolean = false;
  drawer: boolean = true;
  showTeamModal: boolean = false;

  allowedDomains = ALLOWED_DOMAINS;
  noOrg = NO_ORG;

  generalSettings = [
    {
      icon: 'mdi-view-dashboard',
      title: 'Overview',
      link: '/dashboard',
    },
    {
      icon: '$vuetify.icons.oksa-nofill',
      title: 'Topics',
      link: '/dashboard/topics',
    },
  ];
  premiumSettings = [
    {
      icon: 'mdi-checkbox-marked-circle-outline',
      title: 'Tasks',
      link: '/dashboard/tasks',
    },
  ];
  accountSettings = [
    // {
    //   icon: 'mdi-currency-usd',
    //   title: 'Plans and pricing',
    //   link: '/dashboard',
    // },
    // {
    //   icon: 'mdi-cog',
    //   title: 'Account settings',
    //   link: '/dashboard',
    // },
    {
      icon: 'mdi-logout',
      title: 'Sign out',
      link: '/signOut',
    },
  ];

  teamSettings = [
    {
      icon: 'mdi-view-dashboard',
      title: 'Overview',
      link: '/',
    },
    {
      icon: '$vuetify.icons.oksa-nofill',
      title: 'Topics',
      link: '/topics',
    },
    {
      icon: 'mdi-checkbox-marked-circle-outline',
      title: 'Tasks',
      link: '/tasks',
    },
    {
      icon: 'mdi-account-multiple',
      title: 'Team members',
      link: '/members',
    },
  ];

  sortByLastModified(
    a: TeamInterface & {lastModified: string},
    b: TeamInterface & {lastModified: string},
  ) {
    return (
      new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
    );
  }

  createTeam() {
    this.showTeamModal = true;
  }

  closeTeamModal() {
    this.showTeamModal = false;
  }

  selectTeam(team: TeamInterface) {
    const [r, t, u, p] = this.$route.path.split('/');
    if (this.miniVariant) {
      this.miniVariant = !this.miniVariant;
    }
  }

  async selectTeamMenuItem(uuid: string, link: string) {
    await this.$store.dispatch('modules/team/readTeam', {uuid});
    this.moveToRoute(`/team/${uuid}${link}`);
  }

  selectOrganisation(organisation: OrganisationInterface) {
    this.$store.commit(
      `modules/organisation/${SET_ORGANISATION_DATA}`,
      organisation,
    );
    this.moveToRoute('/dashboard');
  }

  activeStatusColor(currentPath: string) {
    return this.$route.path === currentPath ? '#e9e9e9' : '';
  }

  moveToRoute(link: string) {
    if (link === '/signOut') {
      this.signOut();
    } else {
      this.$router.push(link);
      this.miniVariant = true;
    }
  }

  makeTitleName(name: string) {
    if (!name || name === 'default') return '';
    return name
      .split(' ')
      .map((n: string) => n[0].toUpperCase() + n.slice(1))
      .join(' ');
  }

  getSeeAllText() {
    let teamsLength: number = 0;
    if (this.currentOrg.admins.map((a: ProfileInterface) => a.uuid).includes(this.profile.uuid)) {
      teamsLength = this.currentOrg.teams.length;
    } else {
      teamsLength = this.teams.filter((t: TeamInterface) => t.organisation.uuid === this.currentOrg.uuid).length;
    }
    return `See all ${ teamsLength }
      ${ teamsLength > 1 ? 'teams' : 'team' }`
  }

  toggleMenu() {
    this.miniVariant = !this.miniVariant;
  }

  signOut() {
    Object.keys(this.$store.state.modules).forEach((key: string) =>
      this.$store.commit(`modules/${key}/${SIGN_OUT}`),
    );
    this.$router.push('/');
  }
}
</script>

<style scoped>
.subtitle-break {
  max-width: 110px;
  white-space: normal;
}
</style>
