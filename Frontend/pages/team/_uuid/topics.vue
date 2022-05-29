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
import Vue from 'vue';
import Component from 'vue-class-component';
import {mapState} from 'vuex';

@Component({
  layout: 'dashboard',
  middleware: ['team'],
  computed: mapState({
    team: (state: any) => state.modules.team,
    topics: (state: any) => state.modules.team.topics,
  }),
})
export default class TeamTopics extends Vue {
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
