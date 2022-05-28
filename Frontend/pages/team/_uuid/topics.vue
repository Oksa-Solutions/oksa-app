<template>
  <v-container fluid>
    <TopicListing
      v-bind="{
        isTeamListing: true,
        topics,
      }"
    />
  </v-container>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';
import {mapState} from 'vuex';

const teamTopicsProps = Vue.extend({
  computed: mapState({
    team: (state: any) => state.modules.team,
    topics: (state: any) => state.modules.team.topics,
  }),
  middleware: ['team'],
  layout: 'dashboard',
});

@Component({})
export default class TeamTopics extends mixins(teamTopicsProps) {
  $initialLoad: any;
  $store: any;
  window = {
    width: 0,
  };

  async mounted() {
    await this.$initialLoad();
    await this.$store.dispatch('modules/team/readTeam', {
      uuid: this.team.uuid,
    });
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  }
  handleResize() {
    this.window.width = window.innerWidth;
  }
}
</script>
