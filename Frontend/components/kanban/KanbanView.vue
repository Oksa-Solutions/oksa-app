<template>
  <div class="d-flex overflow-x-auto kanban-wrapper" style="height: 100%">
    <KanbanColumn
      v-bind="{
        columnTitle: $setContent('BACKLOG'),
        title: 'Backlog',
        cards: cards
          .filter(
            (c) =>
              c.status === APPROVED &&
              !taskStatusArr.includes(c.taskStatus) &&
              selectedTopics.includes(c.meeting.uuid),
          )
          .map((c) => {
            const thisMeeting = meetings.find((m) => m.uuid === c.meeting.uuid);
            return {
              ...c,
              meeting: {uuid: thisMeeting.uuid, name: thisMeeting.name},
            };
          }),
      }"
    />

    <KanbanColumn
      v-for="title in taskStatusArr"
      :key="title"
      v-bind="{
        columnTitle: getTitle(title),
        title,
        cards: cards
          .filter(
            (c) =>
              c.status === APPROVED &&
              c.taskStatus === title &&
              selectedTopics.includes(c.meeting.uuid),
          )
          .map((c) => {
            const thisMeeting = meetings.find((m) => m.uuid === c.meeting.uuid);
            return {
              ...c,
              meeting: {uuid: thisMeeting.uuid, name: thisMeeting.name},
            };
          }),
      }"
    />
  </div>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';

import {APPROVED, DONE, IN_PROGRESS, STUCK} from '~/assets/constants';
import {CardInterface} from '~/store/modules/cards';
import {MeetingInterface} from '~/store/modules/meeting';

@Component({
  props: {
    meetings: {type: Array as () => MeetingInterface[], required: true},
    cards: {type: Array as () => CardInterface[], required: true},
    selectedTopics: {type: Array as () => MeetingInterface[], required: true},
  },
})
export default class KanbanView extends Vue {
  taskStatusArr: string[] = [STUCK, IN_PROGRESS, DONE];
  APPROVED: string = APPROVED;

  getTitle(title: string) {
    switch(title) {
      case STUCK:
        return this.$setContent('STUCK');
      case IN_PROGRESS:
        return this.$setContent('IN_PROGRESS');
      case DONE:
        return this.$setContent('DONE');
      default:
        return '';
    }
  }
}
</script>

<style scoped>
/* Aligns the columns with the top bar. */
.kanban-wrapper div:first-of-type {
  margin-left: 24px !important;
}
.kanban-wrapper div:last-of-type {
  margin-right: 24px !important;
}
</style>
