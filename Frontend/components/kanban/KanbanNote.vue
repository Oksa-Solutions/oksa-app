<template>
  <span>
    <OpenNote
      v-if="showDetailedCard"
      v-bind="{card}"
      @closed="showDetailedCard = false"
    />
    <v-card
      outlined
      elevation="1"
      class="round-8 card mb-4 mx-3"
      max-width="360px"
      :draggable="true"
      @dragstart="dragStart"
      @dragend.prevent
      @click="showDetailedCard = true"
      :id="card.uuid"
    >
      <div
        class="category-container px-6 py-2 round-top-8"
        style="border-bottom: none"
      />

      <v-card-subtitle class="mb-n1 mt-2 py-0 px-6 cardSubtitle black--text">
        {{ getSubtitle() }}
      </v-card-subtitle>

      <v-card-title class="py-0 px-6 text-h5 cardTitle">
        {{ card.title }}
      </v-card-title>

      <v-card-text
        class="px-6 py-0 mt-4 mb-1 cardText black--text"
        v-text="showMoreText()"
      >
      </v-card-text>

      <div class="px-6 mb-3 showMore" v-if="card.content.length > maxLength">
        <a @click.stop.capture="toggleAllContent(!showAll)">
          {{ showAll ? $setContent('SHOW_LESS') : $setContent('SHOW_MORE') }}
        </a>
      </div>

      <div class="px-6 pt-0 tagWrapper">
        <v-chip
          class="ma-1"
          v-for="(categoryTitle, i) in card.categories
            .map((c) => c.name)
            .sort(sortByCategories)"
          :key="i"
          small
          outlined
        >
          <v-icon class="pr-2">mdi-label</v-icon>
          {{ categoryTitle }}
        </v-chip>
      </div>

      <v-card-actions class="px-6 pt-0 mt-2">
        <CardCalendar v-bind="{card, regularCard: true, disabledChip: true}" />

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
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component, Prop} from 'vue-property-decorator';
import {MeetingInterface} from '~/store/modules/meeting';

import {CardInterface} from '../../store/modules/cards';

@Component({
  props: {
    card: {type: Object as () => CardInterface, required: true},
  },
})
export default class KanbanNote extends Vue {
  @Prop() card!: CardInterface;
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
    const topic = this.$store.state.modules.user.meetings.find(
      (m: MeetingInterface) => m.uuid === this.card.meeting.uuid,
    );
    if (topic.team) {
      return `${topic.team.name.toUpperCase()} / ${this.card.meeting.name.toUpperCase()}`;
    }
    return this.card.meeting.name.toUpperCase();
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

<style scoped>
.cardSubtitle {
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 1.5px;
  font-weight: 600;
}
.cardTitle {
  line-height: 1.2em;
}
.cardText {
  white-space: pre-wrap;
}
.cardText + div:not(.showMore) {
  margin-top: 12px;
}
.tagWrapper .v-chip:first-of-type {
  margin-left: 0 !important;
}
.tagWrapper .v-chip:last-of-type {
  margin-right: 0 !important;
}
</style>
