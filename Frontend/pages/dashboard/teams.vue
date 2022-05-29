<template>
  <v-container fluid>
    <TeamListing v-bind="{teams}"/>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {mapState} from 'vuex';
import { ProfileInterface } from '~/store/modules/profile';
import { TeamInterface } from '~/store/modules/team';

@Component({
  layout: 'dashboard',
  computed: mapState({
    teams: (state: any) => state.modules.organisation.teams
      .filter((t: TeamInterface) =>
      state.modules.organisation.admins.map((a: ProfileInterface) => a.uuid).includes(state.modules.profile.uuid) ||
      state.modules.profile.teams.map((team: TeamInterface) => team.uuid).includes(t.uuid)
    ),
  })
})
export default class Teams extends Vue {
  $initialLoad: any;

  mounted() {
    this.$initialLoad();
  }
}
</script>
