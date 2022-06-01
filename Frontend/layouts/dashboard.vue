<template>
  <v-app Dark>
    <CreateTeamModal v-if="showTeamModal" @closed="closeTeamModal" />

    <!----- DRAWER TOGGLE FOR MOBILE ----->
    <v-btn
      v-if="mcols >= 12"
      fab
      fixed
      bottom
      left
      elevation="1"
      color="primary"
      @click="toggleMenu"
      class="fabDrawer"
    >
      <v-icon large>mdi-menu</v-icon>
    </v-btn>

    <!----- NAV DRAWER ----->

    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :temporary="!miniVariant && mcols >= 6"
      :stateless="mcols < 12"
      mini-variant-width="72"
      fixed
      app
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

      <v-list>
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

            <div v-if="!miniVariant" class="d-flex justify-center flex-column">
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
      </v-list>

      <v-divider />

      <v-list nav dense>
        <!----- GENERAL FEATURES ----->

        <v-list-item
          dense
          link
          v-for="item in generalSettings"
          :key="item.title"
          :to="item.link"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="semibold">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!----- PAID FEATURES ----->

        <template v-if="currentOrg.name !== noOrg">
          <v-list-item
            dense
            link
            v-for="item in premiumSettings"
            :key="item.title"
            :to="item.link"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="semibold">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>

      <v-divider />

      <!----- TEAMS ----->

      <template v-if="!miniVariant && currentOrg.name !== noOrg">
        <v-subheader v-if="!miniVariant" class="semibold text-uppercase">
          TEAMS
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon
              v-if="currentOrg.admins.map((a) => a.uuid).includes(profile.uuid)"
              color="primary"
              @click="createTeam"
            >
              mdi-plus
            </v-icon>
          </v-btn>
        </v-subheader>
      </template>

      <!-- v-for="team in [...currentOrg.teams].filter(t => t.users.map(u => u.uuid).includes(profile.uuid)).sort(sortByLastModified).slice(0, 3)" -->
      <v-list-group
        no-action
        v-for="team in [...teams]
          .filter((t) => t.organisation.uuid === currentOrg.uuid)
          .slice(0, 3)"
        :key="team.uuid"
        @click="selectTeam(team)"
      >
        <template v-slot:activator>
          <v-list-item class="py-1">
            <SquircleIcon
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

      <v-list nav dense>
        <v-list-item dense link :to="'/dashboard/teams'">
          <v-list-item-action>
            <v-icon>mdi-page-next-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="semibold">
              {{ getSeeAllText() }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <!----- SETTINGS AND SIGN OUT ----->

      <v-list nav dense>
        <v-list-item
          dense
          link
          v-for="item in accountSettings"
          :key="item.title"
          @click="moveToRoute(item.link)"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="semibold">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="main">
      <nuxt />
    </v-main>
    <Snackbar />
  </v-app>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component, Prop} from 'vue-property-decorator';
import {mapState} from 'vuex';
import {ALLOWED_DOMAINS, NO_ORG} from '~/assets/constants';
import {ProfileInterface} from '~/store/modules/profile';
import {TeamInterface} from '~/store/modules/team';
import {OrganisationInterface} from '~/store/modules/organisation';
import {SET_ORGANISATION_DATA, SIGN_OUT} from '../store/mutationTypes';

@Component({
  middleware: ['auth'],
  computed: mapState({
    organisations: (state: any) => state.modules.profile.organisations,
    profile: (state: any) => state.modules.profile,
    teams: (state: any) => state.modules.profile.teams,
    currentOrg: (state: any) => state.modules.organisation,
  }),
})
export default class Dashboard extends Vue {
  @Prop() organisations!: OrganisationInterface[];
  @Prop() profile!: ProfileInterface;
  @Prop() teams!: TeamInterface[];
  @Prop() currentOrg!: OrganisationInterface;
  $notifier: any;
  $route: any;
  $router: any;
  $store: any;
  miniVariant: boolean = false;
  window = {
    width: 0,
  };
  mcols: number = 4;
  drawer: boolean = true;
  showTeamModal: boolean = false;

  allowedDomains = ALLOWED_DOMAINS;
  noOrg = NO_ORG;

  generalSettings = [
    {
      icon: 'mdi-view-dashboard',
      title: this.$setContent('OVERVIEW'),
      link: '/dashboard',
    },
    {
      icon: '$vuetify.icons.oksa-nofill',
      title: this.$setContent('TOPICS'),
      link: '/dashboard/topics',
    },
  ];
  premiumSettings = [
    {
      icon: 'mdi-checkbox-marked-circle-outline',
      title: this.$setContent('TASKS'),
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
    //   title: this.$setContent('ACCOUNT_SETTINGS'),
    //   link: '/dashboard',
    // },
    {
      icon: 'mdi-logout',
      title: this.$setContent('SIGN_OUT'),
      link: '/signOut',
    },
  ];

  teamSettings = [
    {
      icon: 'mdi-view-dashboard',
      title: this.$setContent('OVERVIEW'),
      link: '/',
    },
    {
      icon: '$vuetify.icons.oksa-nofill',
      title: this.$setContent('TOPICS'),
      link: '/topics',
    },
    {
      icon: 'mdi-checkbox-marked-circle-outline',
      title: this.$setContent('TASKS'),
      link: '/tasks',
    },
    {
      icon: 'mdi-account-multiple',
      title: this.$setContent('TEAM_MEMBERS'),
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
    if (
      this.currentOrg.admins
        // @ts-ignore
        .map((a: ProfileInterface) => a.uuid)
        .includes(this.profile.uuid)
    ) {
      teamsLength = this.currentOrg.teams.length;
    } else {
      teamsLength = this.teams.filter(
        (t: TeamInterface) => t.organisation.uuid === this.currentOrg.uuid,
      ).length;
    }
    return `${this.$setContent('SEE_ALL_TEAMS')} (${teamsLength})`;
  }

  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    this.drawer = this.mcols < 6;
    this.miniVariant = this.mcols < 12;
  }

  toggleMenu() {
    if (this.mcols < 6) {
      // Large screens show mini drawer or full width drawer
      this.miniVariant = !this.miniVariant;
      this.drawer = true;
    } else if (this.mcols < 12) {
      // Medium screens show mini drawer or temporary drawer
      this.miniVariant = !this.miniVariant;
      this.drawer = true;
    } else {
      // Small screens show temporary drawer or no drawer at all
      this.drawer = !this.drawer;
      this.miniVariant = false;
    }
  }

  handleResize() {
    // breakpoint = (cardWidth + cardGutter) * amountOfCards + margin
    // Each card should be at least 300px wide and has 8px gutter on each side.
    // The margin is 12px wide on each side.
    // Above 960px, add 256px for the left drawer.
    this.window.width = window.innerWidth;
    if (this.window.width < 340) {
      this.mcols = 12;
    } else if (this.window.width >= 340 && this.window.width < 656) {
      this.mcols = 12;
    } else if (this.window.width >= 656 && this.window.width < 972) {
      this.mcols = 6;
    } else if (this.window.width >= 972 && this.window.width < 1544) {
      this.mcols = 4;
    } else if (this.window.width >= 1544 && this.window.width < 2176) {
      this.mcols = 3;
    } else if (this.window.width >= 2176 && this.window.width < 3816) {
      this.mcols = 2;
    } else {
      this.mcols = 1;
    }
  }

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
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
