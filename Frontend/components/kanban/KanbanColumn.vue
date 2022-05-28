<template>
  <v-card
    outlined
    elevation="0"
    class="round-8 card my-4 mx-2 header-background overflow-y-auto"
    min-width="360px"
    @dragover.prevent
    @drop.prevent="dragDrop"
  >
    <div
      class="
        category-container
        elevation-3
        px-6
        py-3
        mb-2
        round-top-8
        background
        sticky-title-bar
      "
      id="fab-new-card"
      @dragend.prevent
    >
      <span class="d-flex flex-row align-center content-aware-text">
        <!-- <v-icon></v-icon> -->
        {{ title }}
        <p class="ma-0 px-4" style="font-size: 12px; text-align: center">
          {{ cards.length }}
        </p>
      </span>
    </div>
    <span />

    <KanbanNote v-for="card in cards" :key="card.uuid" v-bind="{card}" />
  </v-card>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import {CardInterface} from '../../store/modules/cards';
import {UPDATE_CARD_DATA} from '../../store/mutationTypes';
import { MeetingInterface } from '~/store/modules/meeting';

const kanbanColumnProps = Vue.extend({
  props: {
    title: {type: String, required: true},
    cards: {type: Array as () => CardInterface[], required: true},
  },
});

@Component
export default class KanbanColumn extends mixins(kanbanColumnProps) {
  $store: any;
  $notifier: any;

  dragDrop(e: any) {
    const card_id = e.dataTransfer.getData('card_id');
    const card: any = document.getElementById(card_id);
    card.style.display = 'block';
    const updateCard: CardInterface | undefined = this.$store.getters['modules/user/getCard'](card_id);
    if (updateCard) {
      if ((<CardInterface>updateCard).taskStatus !== this.title) {
        this.updateTaskStatus({...(<CardInterface>updateCard), taskStatus: this.title});
      }
    }
  }

  async updateTaskStatus(card: CardInterface) {
    const success = await this.$store.dispatch('modules/cards/updateCard', {
      ...card,
      meeting: card.meeting,
      taskStatus: card.taskStatus,
    });
    this.$notifier.showMessage({
      content: success ? 'Status updated' : 'Status update failed. Try again',
      color: success ? 'success' : 'error',
    });
    if (success) {
      this.$store.commit(`modules/cards/${UPDATE_CARD_DATA}`, card);
    }
  }
}
</script>

<style scoped>
.header-background {
  background: var(--v-background-base);
  z-index: 1;
}
</style>
