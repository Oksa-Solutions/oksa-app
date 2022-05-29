<template>
  <v-container fluid class="d-flex flex-column pa-0" style="height: 100vh">
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
  </v-container>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component, Prop} from 'vue-property-decorator';
import {mapState} from 'vuex';
import {CardInterface} from '~/store/modules/cards';
import {MeetingInterface} from '~/store/modules/meeting';
import { TeamInterface } from '~/store/modules/team';

@Component({
  layout: 'dashboard',
  head() {
    return {title: 'Tasks'};
  },
  middleware: ['auth', 'team'],
  computed: mapState({
    team: (state: any) => state.modules.team,
    meetings: (state: any) => state.modules.team.topics,
    cards: (state: any) =>
      [].concat.apply(
        [],
        state.modules.user.meetings
          .filter(
            (topic: MeetingInterface) =>
              topic?.team?.uuid === state.modules.team.uuid,
          )
          .map((m: MeetingInterface) =>
            m.cards.map((c: CardInterface) => {
              return {...c, meeting: {uuid: m.uuid}};
            }),
          ),
      ),
  }),
})
export default class TeamTasks extends Vue {
  @Prop() team!: TeamInterface
  @Prop() meetings!: MeetingInterface[]
  @Prop() cards!: CardInterface[]
  $initialLoad: any;
  $store: any;
  window = {
    width: 0,
  };
  selectedTopics: string[] = [];
  selectFilters: boolean = false;

  async mounted() {
    await this.$initialLoad();
    await this.$store.dispatch('modules/team/readTeam', {
      uuid: this.team.uuid,
    });
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
