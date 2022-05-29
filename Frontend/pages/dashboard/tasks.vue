<template>
  <v-container
    fluid
    class="d-flex flex-column pa-0"
    style="height: 100vh"
  >

  <v-container fluid class="px-6 pt-6 pb-0">
    <v-toolbar class="elevation-3 rounded-lg">
      <v-toolbar-title class="pl-2 text-h5">My tasks</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon disabled>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>

    <div class="px-2">
      <TopicDisplayFilter
        v-if="selectFilters"
        v-bind="{topics: meetings, selectedTopics}"
        @closed="closeTopicFilter"
      />
      <v-btn text @click="openTopicFilter" class="topic-selection">
        <v-icon color="primary">mdi-playlist-check</v-icon>
        {{ selectedTopics.length }}/{{ meetings.length }} displayed topics
      </v-btn>
    </div>
  </v-container>

    <KanbanView v-bind="{meetings, cards, selectedTopics}" />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {mapState} from 'vuex';
import {CardInterface} from '~/store/modules/cards';
import {MeetingInterface} from '~/store/modules/meeting';
import {TeamInterface} from '~/store/modules/team';

@Component({
  layout: 'dashboard',
  head() {
    return {title: 'Tasks'};
  },
  middleware: ['auth'],
  computed: mapState({
    meetings: (state: any) =>
      [].concat.apply(
        state.modules.user.meetings.filter((topic: MeetingInterface) => topic.team === null ),
        state.modules.profile.teams.filter((team: TeamInterface) => team.organisation.uuid === state.modules.organisation.uuid).map(
          (team: TeamInterface) => team.topics,
        ),
      ),
    cards: (state: any) => [].concat.apply([],
        state.modules.user.meetings
          .filter((topic: MeetingInterface) => topic.team === null ||
          [].concat.apply([], state.modules.profile.teams
            .filter((team: TeamInterface) => team.organisation.uuid === state.modules.organisation.uuid)
            .map((team: TeamInterface) => team.topics))
            .map((m: MeetingInterface) => m.uuid)
            .includes(topic.uuid))
          .map((m: MeetingInterface) => m.cards.map((c: CardInterface) => {return {...c, meeting: {uuid: m.uuid}}}))),
  }),
})
export default class Tasks extends Vue {
  $initialLoad: any;
  window = {
    width: 0,
  };
  selectedTopics: string[] = [];
  selectFilters: boolean = false;

  async mounted() {
    await this.$initialLoad();
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    this.selectedTopics = this.meetings.map((m: MeetingInterface) => m.uuid);
  }

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  }

  openTopicFilter() {
    this.selectFilters = true;
  }

  closeTopicFilter(selected: string[]) {
    this.selectedTopics = selected;
    this.selectFilters = false;
  }

  handleResize() {
    this.window.width = window.innerWidth;
  }
}
</script>

<style scoped>
.topic-selection-ex {
  font-size: 12px;
  color: var(--v-primary-base);
}
.topic-selection {
  font-size: 12px;
  color: var(--v-primary-base);
}
.topic-selection .v-icon {
  margin-right: 8px;
}
</style>
