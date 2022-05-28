<template>
  <v-container fluid>
    <TeamListing v-bind="{teams}"/>
  </v-container>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';
import {mapState} from 'vuex';
import { ProfileInterface } from '~/store/modules/profile';
import { TeamInterface } from '~/store/modules/team';

const teamsProps = Vue.extend({
  computed: mapState({
    teams: (state: any) => state.modules.organisation.teams
      .filter((t: TeamInterface) =>
      state.modules.organisation.admins.map((a: ProfileInterface) => a.uuid).includes(state.modules.profile.uuid) ||
      state.modules.profile.teams.map((team: TeamInterface) => team.uuid).includes(t.uuid)
    ),
  })
});

@Component({
  layout: 'dashboard',
})
export default class Teams extends mixins(teamsProps) {
  $initialLoad: any;

  mounted() {
    this.$initialLoad();
  }
}
</script>
