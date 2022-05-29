<template>
  <v-container fluid>
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
        <v-card-subtitle class="bold py-2 mb-n6"> Team </v-card-subtitle>
        <v-card-title class="bold py-2">
          {{ team.name }}
        </v-card-title>
        <v-card-subtitle class="py-2">
          <!-- <v-icon>{{ team.organisation.icon }}</v-icon> -->
          {{ team.organisation.name }}
        </v-card-subtitle>
      </v-col>
    </v-card>

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
        showAll: true,
      }"
      class="my-4"
    />
  </v-container>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component, Prop} from 'vue-property-decorator';
import {mapState} from 'vuex';
import {OrganisationInterface} from '~/store/modules/organisation';
import {ProfileInterface} from '~/store/modules/profile';
import {TeamInterface} from '~/store/modules/team';

@Component({
  layout: 'dashboard',
  middleware: ['team'],
  computed: mapState({
    team: (state: any) => state.modules.team,
    profile: (state: any) => state.modules.profile,
    currentOrg: (state: any) => state.modules.organisation,
  }),
})
export default class TeamMembers extends Vue {
  @Prop() team!: TeamInterface;
  @Prop() profile!: ProfileInterface;
  @Prop() currentOrg!: OrganisationInterface;
  $initialLoad: any;
  $notifier: any;
  $store: any;
  userIsAdmin: boolean = false;
  loading: boolean = true;

  window = {
    width: 0,
  };
  mcols = 4;

  async mounted() {
    await this.$initialLoad();
    await this.$store.dispatch('modules/team/readTeam', {
      uuid: this.team.uuid,
    });
    this.userIsAdmin =
      this.team.admins
        .map((a: ProfileInterface) => a.uuid)
        .includes(this.profile.uuid) ||
      this.currentOrg.admins
        // @ts-ignore
        .map((a: ProfileInterface) => a.uuid)
        .includes(this.profile.uuid);
    this.loading = false;
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
}
</script>
