<template>
  <div class="d-flex overflow-x-auto kanban-wrapper" style="height: 100%">
    <KanbanColumn
      v-bind="{
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
import {mixins} from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';

import {APPROVED, DONE, IN_PROGRESS, STUCK} from '~/assets/constants';
import {CardInterface} from '~/store/modules/cards';
import {MeetingInterface} from '~/store/modules/meeting';

const kanbanViewProps = Vue.extend({
  props: {
    meetings: {type: Array as () => MeetingInterface[], required: true},
    cards: {type: Array as () => CardInterface[], required: true},
    selectedTopics: {type: Array as () => MeetingInterface[], required: true},
  },
});

@Component({})
export default class KanbanView extends mixins(kanbanViewProps) {
  taskStatusArr: string[] = [STUCK, IN_PROGRESS, DONE];
  APPROVED: string = APPROVED;
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