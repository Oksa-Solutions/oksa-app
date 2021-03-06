<template>
  <v-container fluid>
    <v-row dense class="fill-height">
      <v-col md="8">
        <v-row class="mx-1 fill-width" dense>
          <v-col sm="12">
            <v-card
              class="d-flex flex-row align-center elevation-3 rounded-lg py-4"
              height="100%"
            >
              <SquircleIcon
                v-bind="{
                  name: team.name,
                  width: '72px',
                  height: '72px',
                  fontSize: '27px',
                }"
                class="pl-6"
              />
              <v-col sm="12" class="pa-0">
                <v-card-subtitle class="bold py-2 mb-n6">
                  {{ $setContent('TEAM') }}
                </v-card-subtitle>
                <v-card-title class="bold py-2">
                  {{ team.name }}
                </v-card-title>
                <v-card-subtitle class="py-2">
                  <!-- <v-icon>{{ team.organisation.icon }}</v-icon> -->
                  {{ team.organisation.name }}
                </v-card-subtitle>
              </v-col>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mx-1" dense>
          <v-col sm="12">
            <v-card class="elevation-3 rounded-lg my-4">
              <v-row
                class="d-flex align-center justify-space-between px-6 my-0 py-0"
              >
                <v-card-title class="bold"> {{ $setContent('TEAM_TOPICS') }} </v-card-title>
                <div
                  class="d-flex flex-row pointer-cursor"
                  @click="$router.push({path: '/new', query: {relTeam: 1}})"
                >
                  <v-icon>mdi-plus</v-icon>
                  <v-card-subtitle class="px-1 pr-6">
                    {{ $setContent('CREATE_TOPIC') }}
                  </v-card-subtitle>
                </div>
              </v-row>

              <v-divider />

              <!-- TODO: sort topics so that newest 5 are shown -->
              <div
                v-if="meetings.length < 1"
                class="d-flex align-center justify-center py-6"
              >
                <v-card-subtitle class="semibold">
                  {{ $setContent('NO_TOPICS') }}
                </v-card-subtitle>
              </div>

              <div
                class="px-6 py-0"
                v-for="(meeting, i) in meetings.slice(0, 5)"
                :key="i"
                @click="moveToTopic(meeting)"
              >
                <MeetingItem v-bind="meeting" class="pointer-cursor" />
                <v-divider v-if="i !== meetings.length - 1" />
              </div>

              <v-divider />

              <div
                class="d-flex flex-row px-6 pointer-cursor"
                @click="moveToRoute('topics')"
              >
                <v-icon class="">mdi-page-next-outline</v-icon>
                <v-card-title class="bold"
                  >{{ $setContent('SEE_ALL_TOPICS') }} ({{ meetings.length }})</v-card-title
                >
              </div>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mx-1" dense>
          <v-col sm="12">
            <TeamMemberListing
              v-bind="{
                team,
                profile,
                currentOrg,
                userIsAdmin,
                admins: team.admins,
                users: team.users,
                mcols,
                loading,
              }"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col md="4">
        <v-row dense>
          <v-col sm="12" class="mb-2">
            <v-card justify="center" align="center" class="rounded-lg py-4">
              <SubmitButton
                @done="moveToRoute('tasks')"
                v-bind="{label: $setContent('TO_KANBAN')}"
              />
            </v-card>
          </v-col>
        </v-row>
        <v-row v-for="(item, i) in statsItems" :key="i" dense>
          <v-col sm="12" class="mb-2">
            <StatsCard v-bind="{...item}" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component, Prop} from 'vue-property-decorator';
import {mapState} from 'vuex';
import {
  APPROVED,
  CONTRIBUTORS,
  DECISIONS_MADE,
  DONE,
  IDEAS_GATHERED,
  IDEAS_READY,
} from '~/assets/constants';

import {CardInterface} from '~/store/modules/cards';
import {MeetingInterface} from '~/store/modules/meeting';
import {OrganisationInterface} from '~/store/modules/organisation';
import {ProfileInterface} from '~/store/modules/profile';
import {TeamInterface} from '~/store/modules/team';

@Component({
  layout: 'dashboard',
  head() {
    return {title: this.$setContent('OVERVIEW')};
  },
  middleware: ['auth', 'team'],
  computed: mapState({
    team: (state: any) => state.modules.team,
    meetings: (state: any) => state.modules?.team?.topics || [],
    cards: (state: any) => state.modules?.team?.cards || [],
    profile: (state: any) => state.modules.profile,
    currentOrg: (state: any) => state.modules.organisation,
  }),
})
export default class Team extends Vue {
  @Prop() team!: TeamInterface;
  @Prop() meetings!: MeetingInterface[];
  @Prop() cards!: CardInterface[];
  @Prop() profile!: ProfileInterface;
  @Prop() currentOrg!: OrganisationInterface;
  $initialLoad: any;
  $router: any;
  $store: any;

  loading: boolean = true;
  userIsAdmin: boolean = false;

  window = {
    width: 0,
  };
  mcols = 4;

  statsItems = [
    {
      icon: 'mdi-plus',
      title: this?.cards?.length?.toString() || '-',
      content: 'IDEAS_GATHERED',
      type: IDEAS_GATHERED
    },
    {
      icon: 'mdi-check-circle',
      title:
        this?.cards
          ?.filter((c: CardInterface) => c.status === APPROVED)
          ?.length?.toString() || '-',
      content: 'DECISIONS_MADE',
      type: DECISIONS_MADE,
    },
    {
      icon: '$vuetify.icons.oksa-mini',
      title:
        this?.cards
          ?.filter((c: CardInterface) => c.taskStatus === DONE)
          ?.length?.toString() || '-',
      content: 'IDEAS_READY',
      type:IDEAS_READY,
    },
    {
      icon: 'mdi-account-multiple',
      title: this?.team?.users?.length?.toString() || '-',
      content: 'CONTRIBUTORS',
      type: CONTRIBUTORS
    },
  ];

  async mounted() {
    await Promise.all([
      this.$initialLoad(),
      this.$store.dispatch('modules/team/readTeam', {uuid: this.team.uuid}),
    ]);
    this.userIsAdmin =
      this.team.admins
        .map((a: ProfileInterface) => a.uuid)
        .includes(this.profile.uuid) ||
      this.currentOrg.admins
        // @ts-ignore
        .map((a: ProfileInterface) => a.uuid)
        .includes(this.profile.uuid);

    this.loading = false;
    this.statsItems = [
      {
        icon: 'mdi-plus',
        title: this.cards.length.toString(),
        content: 'IDEAS_GATHERED',
        type: IDEAS_GATHERED,
      },
      {
        icon: 'mdi-check-circle',
        title: this.cards
          .filter((c: CardInterface) => c.status === APPROVED)
          .length.toString(),
        content: 'DECISIONS_MADE',
        type: DECISIONS_MADE
      },
      {
        icon: '$vuetify.icons.oksa-mini',
        title: this.cards
          .filter((c: CardInterface) => c.taskStatus === DONE)
          .length.toString(),
        content: 'IDEAS_READY',
        type: IDEAS_READY
      },
      {
        icon: 'mdi-account-multiple',
        title: this?.team?.users?.length?.toString() || '-',
        content: 'CONTRIBUTORS',
        type: CONTRIBUTORS
      },
    ];

    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
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

  moveToTopic(meeting: MeetingInterface) {
    this.$router.push({
      path: '/m/' + meeting.id,
    });
  }

  moveToRoute(r: string) {
    this.$router.push(`/team/${this.team.uuid}/${r}`);
  }
}
</script>
