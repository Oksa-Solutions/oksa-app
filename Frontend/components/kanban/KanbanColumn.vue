<template>
  <v-card
    outlined
    elevation="0"
    class="round-8 card my-4 mx-2 header-background overflow-y-auto"
    style="z-index: 1; min-width: 360px"
    @dragover.prevent
    @drop.prevent="dragDrop"
  >
    <div class="pa-3 sticky-title-bar" id="fab-new-card" @dragend.prevent>
      <v-card-title
        class="d-flex flex-row align-center content-aware-text text-h5 pa-0"
      >
        <!-- <v-icon></v-icon> -->
        {{ columnTitle }}
        <span class="ma-0 px-4 text-body-1 text-caption text--lighten-2">
          {{ cards.length }}
        </span>
      </v-card-title>
    </div>
    <span />

    <KanbanNote v-for="card in cards" :key="card.uuid" v-bind="{card}" />
  </v-card>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component, Prop} from 'vue-property-decorator';
import {CardInterface} from '../../store/modules/cards';
import {UPDATE_CARD_DATA} from '../../store/mutationTypes';

@Component({
  props: {
    title: {type: String, required: true},
    cards: {type: Array as () => CardInterface[], required: true},
    columnTitle: {type: String, required: true},
  },
})
export default class KanbanColumn extends Vue {
  @Prop() title!: string;
  @Prop() columnTitle!: string;
  @Prop() cards!: CardInterface[];
  $store: any;
  $notifier: any;

  dragDrop(e: any) {
    const card_id = e.dataTransfer.getData('card_id');
    const card: any = document.getElementById(card_id);
    card.style.display = 'block';
    const updateCard: CardInterface | undefined =
      this.$store.getters['modules/user/getCard'](card_id);
    if (updateCard) {
      if ((<CardInterface>updateCard).taskStatus !== this.title) {
        this.updateTaskStatus({
          ...(<CardInterface>updateCard),
          taskStatus: this.title,
        });
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
      content: this.$setContent(success ? 'STATUS_UPDATED' : 'STATUS_UPDATE_FAILED'),
      color: success ? 'success' : 'error',
    });
    if (success) {
      this.$store.commit(`modules/cards/${UPDATE_CARD_DATA}`, card);
    }
  }
}
</script>

<style scoped></style>
