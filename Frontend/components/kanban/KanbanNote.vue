<template>
  <span>
    <OpenNote
      v-if="showDetailedCard"
      v-bind="{card}"
      @closed="showDetailedCard = false"
    />
    <v-card
      outlined
      elevation="2"
      class="round-8 card mb-4 mx-6"
      max-width="360px"
      :draggable="true"
      @dragstart="dragStart"
      @dragend.prevent
      @click="showDetailedCard = true"
      :id="card.uuid"
    >
      <div
        class="category-container px-6 py-3 round-top-8"
        id="fab-kanban-card"
      />

      <v-card-subtitle class="mb-n1 py-0 px-6 bold" style="font-size: 10px">
        {{ getSubtitle() }}
      </v-card-subtitle>

      <v-card-title class="py-0 px-6 text-h5 cardTitle">
        {{ card.title }}
      </v-card-title>

      <v-card-text
        class="px-6"
        style="white-space: pre-wrap"
        v-text="showMoreText()"
      >
      </v-card-text>
      <span class="px-6" v-if="card.content.length > maxLength">
        <a @click.stop.capture="toggleAllContent(!showAll)">
          {{ showAll ? 'Show less' : 'Show more' }}
        </a>
      </span>

      <div class="px-6 pt-0">
        <v-chip
          v-for="(categoryTitle, i) in card.categories
            .map((c) => c.name)
            .sort(sortByCategories)"
          :key="i"
          x-small
          outlined
        >
          <v-icon class="pr-2">mdi-label</v-icon>
          {{ categoryTitle }}
        </v-chip>
      </div>

      <v-card-actions class="px-6 pt-0">
        <CardCalendar v-bind="{card, regularCard: true}" />

        <v-spacer />

        <v-menu offset-y transition="scale-transition" min-width="134px">
          <template v-slot:activator="{on, attrs}">
            <v-btn
              text
              icon
              color="gray"
              v-bind="attrs"
              v-on="on"
              class="mx-6"
              style="visibility: hidden"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <CardMoreMenu />
        </v-menu>
      </v-card-actions>
    </v-card>
  </span>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';
import {mapState} from 'vuex';
import { MeetingInterface } from '~/store/modules/meeting';

import {CardInterface} from '../../store/modules/cards';

const kanbanNoteProps = Vue.extend({
  props: {
    card: {type: Object as () => CardInterface, required: true},
  },
});

@Component({})
export default class KanbanNote extends mixins(kanbanNoteProps) {
  showDetailedCard: boolean = false;
  maxLength: number = 50;
  showAll: boolean = false;

  sortByCategories(a: string, b: string) {
    if (a.toLowerCase() < b.toLowerCase()) {
      return -1;
    } else if (a.toLowerCase() > b.toLowerCase()) {
      return 1;
    } else {
      return 0;
    }
  }

  getSubtitle() {
    const topic = this.$store.state.modules.user.meetings.find((m: MeetingInterface) => m.uuid === this.card.meeting.uuid)
    if (topic.team) {
      return `${topic.team.name.toUpperCase()} / ${this.card.meeting.name.toUpperCase()}`
    }
    return this.card.meeting.name.toUpperCase()
  }

  showMoreText() {
    let content = this.card.content;
    if (this.card.content.length > this.maxLength && !this.showAll) {
      content = `${this.card.content.slice(0, this.maxLength - 3)}...`;
    }
    return content.trim();
  }

  toggleAllContent(showAll: boolean) {
    this.showAll = showAll;
  }

  dragStart(e: any) {
    const target = e.target;
    e.dataTransfer.setData('card_id', target.id);
    setTimeout(() => {
      target.style.display = 'none';
    }, 0);
  }
}
</script>

<style scoped></style>
