<template>
  <v-card
    class="elevation-3 ma-4 d-flex flex-column rounded-lg"
    style="height: 95vh"
  >
    <span>
      <v-card-title class="pt-4 px-8 elevation-3 bold"> Tasks </v-card-title>
    </span>

    <div @click="openTopicFilter" class="px-4 pointer-cursor">
      <TopicDisplayFilter
        v-if="selectFilters"
        v-bind="{topics: meetings, selectedTopics}"
        @closed="closeTopicFilter"
      />
      <v-card-text class="topic-selection">
        <v-icon color="primary">mdi-playlist-check</v-icon>
        {{ selectedTopics.length }}/{{ meetings.length }} displayed topics
      </v-card-text>
    </div>

    <KanbanView v-bind="{meetings, cards, selectedTopics}" />
  </v-card>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';
import {mapState} from 'vuex';
import {CardInterface} from '~/store/modules/cards';
import {MeetingInterface} from '~/store/modules/meeting';
import {TeamInterface} from '~/store/modules/team';

const tasksProps = Vue.extend({
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
  layout: 'dashboard',
});

@Component({
  head() {
    return {title: 'Tasks'};
  },
  middleware: ['auth'],
})
export default class Tasks extends mixins(tasksProps) {
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
.topic-selection {
  font-size: 12px;
  color: var(--v-primary-base);
}
</style>
