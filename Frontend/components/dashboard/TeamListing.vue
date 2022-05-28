<template>
  <v-container fluid>
    <v-card class="elevation-3 rounded-lg">
      <v-row dense>
        <v-card-title class="px-6 bold">
          Your teams
        </v-card-title>
      </v-row>
      <v-divider />
      <v-row
        no-gutters
        v-for="(team, i) in [...teams].sort(sortByName)"
        :key="team.uuid"
        @click="selectTeam(team)"
      >
        <v-col sm="12" align="center">
          <TeamItem v-bind="{team}" />
          <v-divider v-if="i < teams.length - 1" width="95%" />
        </v-col>
      </v-row>
      <!-- <v-row /> -->
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';
import { TeamInterface } from '~/store/modules/team';

const teamListingProps = Vue.extend({
  props: {
    teams: {type: Array as () => TeamInterface[], required: true}
  }
});

@Component({})
export default class TeamListing extends mixins(teamListingProps) {
  $router: any;
  $store: any;

  async selectTeam(team: TeamInterface) {
    await this.$store.dispatch('modules/team/readTeam', {uuid: team.uuid});
    this.$router.push(`/team/${team.uuid}/`);
  }

  sortByName(a: TeamInterface, b: TeamInterface) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    } else {
      return 0;
    }
  }

}
</script>
