<template>
  <v-container fluid>
    <FirstLoginModal
      v-if="!loading && (profile.name === 'default' || profile.email === '')"
      :uuid="profile.uuid"
      :profileName="profile.name === 'default' ? '' : profile.name"
      :profileEmail="profile.email"
      :profilePhone="profile.phoneNumber"
    />
    <v-row>
      <v-col sm="8">
        <v-card
          class="d-flex flex-row align-center elevation-3 rounded-lg"
          height="100%"
        >
          <v-row align="end" dense>
            <v-col sm="2" align="start">
              <OksaCelebration height="100px" width="100px" />
            </v-col>
            <v-col sm="10" align="start" justify="center">
              <v-card-subtitle class="mb-n6 semibold">
                This is your
              </v-card-subtitle>
              <v-card-title class="bold"> Dashboard </v-card-title>
              <v-card-subtitle class="">
                control everything here!
              </v-card-subtitle>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col sm="4">
        <v-card
          class="d-flex flex-column justify-center elevation-3 rounded-lg"
          height="100%"
          v-if="currentOrg.name != superAdmin"
        >
          <RequestTrialModal
            v-if="showRequestModal"
            @closed="closeRequestModal"
          />
          <v-card-title class="bold"> Request for trial </v-card-title>

          <v-card-actions>
            <SubmitButton
              @done="openRequestModal"
              v-bind="{label: 'Request'}"
              class="px-6 mx-2"
            />
            <!-- <SubmitButton @done="" v-bind="{label: 'Manage', disabled: true}" class="px-6 mx-2" /> -->
          </v-card-actions>
        </v-card>
        <v-card
          class="d-flex flex-column justify-center elevation-3 rounded-lg"
          height="100%"
          v-else
        >
          <AddOrganisationModal
            v-if="showAddOrganisationModal"
            @closed="closeAddOrganisationModal"
          />
          <v-card-title class="bold"> Add new organisation </v-card-title>

          <v-card-actions>
            <SubmitButton
              @done="openAddOrganisationModal"
              v-bind="{label: 'Add'}"
              class="px-6 mx-2"
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="currentOrg.name !== noOrg" justify="space-around">
      <v-col sm="6" md="4" v-for="(item, i) in statsItems" :key="i">
        <StatsCard v-bind="{...item}" />
      </v-col>
    </v-row>

    <v-row>
      <v-col sm="12">
        <v-card class="elevation-3 rounded-lg">
          <v-row class="px-6" align="center" justify="space-between" dense>
            <v-card-title class="bold"> Recent topics </v-card-title>
            <v-card-title>
              <SubmitButton
                @done="$router.push('/new')"
                v-bind="{label: 'Add topic'}"
              />
            </v-card-title>
          </v-row>

          <v-divider />

          <v-row
            class="px-6"
            align="center"
            v-for="(meeting, idx) in meetings.sort(sortByLastModified)"
            :key="idx"
            @click="moveToTopic(meeting)"
            dense
          >
            <v-col sm="12">
              <MeetingItem v-bind="meeting" class="pointer-cursor" />
              <v-divider v-if="idx !== meetings.length - 1" />
            </v-col>
          </v-row>

          <v-divider />

          <v-row class="pointer-cursor px-6" align="center" dense @click="showAllTopics">
            <v-col sm="1" justify="center" align="center">
              <v-icon class="">mdi-page-next-outline</v-icon>
            </v-col>
            <v-col sm="8" align="center">
              <v-card-title class="bold">Manage my topics</v-card-title>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12">
        <OrganisationMemberListing v-bind="{
          profile,
          currentOrg,
          userIsAdmin,
          admins: currentOrg.admins,
          users: currentOrg.users,
          mcols,
          loading,
        }"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';
import {mapState} from 'vuex';
import {
  ALLOWED_DOMAINS,
  APPROVED,
  DECISIONS_MADE,
  DONE,
  IDEAS_GATHERED,
  IDEAS_READY,
  NO_ORG,
  SUPER_ADMIN,
} from '~/assets/constants';
import { OrganisationInterface } from '~/store/modules/organisation';
import { ProfileInterface } from '~/store/modules/profile';
import {TeamInterface} from '~/store/modules/team';
import {CardInterface} from '../../store/modules/cards';
import {MeetingInterface} from '../../store/modules/meeting';

const profileProps = Vue.extend({
  layout: 'dashboard',
  computed: mapState({
    cards: (state: any) =>
      [].concat.apply(
          [],
          state.modules.user.meetings.map((topic: MeetingInterface) => topic.cards),
      ),
    meetings: (state: any) => state.modules.user.meetings.filter((t: MeetingInterface) => state.modules.organisation.teams.map((team: TeamInterface) => team.uuid).includes(t.team?.uuid)),
    profile: (state: any) => state.modules.profile,
    currentOrg: (state: any) => state.modules.organisation,
  }),
});

@Component({
  head() {
    return {title: 'Dashboard'};
  },
  middleware: ['auth'],
})
export default class Profile extends mixins(profileProps) {
  $router: any;
  $initialLoad: any;
  loading: boolean = true;

  window = {
    width: 0,
  };
  mcols = 4;

  showRequestModal: boolean = false;
  showAddOrganisationModal: boolean = false;
  userIsAdmin: boolean = false;
  allowedDomains = ALLOWED_DOMAINS;
  superAdmin = SUPER_ADMIN;
  noOrg = NO_ORG;

  statsItems = [
    {
      icon: 'mdi-plus',
      title: this?.cards?.length?.toString() || '-',
      content: IDEAS_GATHERED,
    },
    {
      icon: 'mdi-check-circle',
      title:
        this?.cards
          ?.filter((c: CardInterface) => c.status === APPROVED)
          ?.length?.toString() || '-',
      content: DECISIONS_MADE,
    },
    {
      icon: '$vuetify.icons.oksa-mini',
      title:
        this?.cards
          ?.filter((c: CardInterface) => c.taskStatus === DONE)
          ?.length?.toString() || '-',
      content: IDEAS_READY,
    },
  ];

  async mounted() {
    await this.$initialLoad();
    this.statsItems = [
      {
        icon: 'mdi-plus',
        title: this.cards?.length?.toString(),
        content: IDEAS_GATHERED,
      },
      {
        icon: 'mdi-check-circle',
        title: this.cards
          ?.filter((c: CardInterface) => c.status === APPROVED)
          ?.length.toString(),
        content: DECISIONS_MADE,
      },
      {
        icon: '$vuetify.icons.oksa-mini',
        title: this.cards
          ?.filter((c: CardInterface) => c.taskStatus === DONE)
          ?.length.toString(),
        content: IDEAS_READY,
      },
    ];

    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    // Check if user is logged in
    if (this.$store.state?.modules?.auth?.loggedIn) {
      this.loading = false;
      this.userIsAdmin = this.currentOrg.admins.map((a: ProfileInterface) => a.uuid).includes(this.profile.uuid);
    } else {
      this.$router.push({path: '/'});
    }
  }

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  }

  sortByLastModified(
    a: TeamInterface & {lastModified: string},
    b: TeamInterface & {lastModified: string},
  ) {
    return (
      new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
    );
  }

  moveToTopic(meeting: MeetingInterface) {
    this.$router.push({
      path: '/m/' + meeting.id,
    });
  }

  showAllTopics() {
    this.$router.push({
      path: '/dashboard/topics',
    });
  }

  openRequestModal() {
    this.showRequestModal = true;
  }

  closeRequestModal() {
    this.showRequestModal = false;
  }

  openAddOrganisationModal() {
    this.showAddOrganisationModal = true;
  }

  closeAddOrganisationModal() {
    this.showAddOrganisationModal = false;
  }

  handleResize() {
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
}
</script>
