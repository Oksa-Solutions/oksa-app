<template>
  <div class="pa-4 d-flex flex-column grow">
    <v-row class="justify-space-between" @click="toggleShowCard(true)">
      <v-card-title class="semibold">
        {{ card.title }}
      </v-card-title>
      <v-menu offset-y>
        <template v-slot:activator="{on, attrs}">
          <v-chip class="mx-4" v-bind="attrs" v-on="on">
            {{ initialized ? card.taskStatus : card.status }}
          </v-chip>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, i) in taskStatusArr"
            :key="i"
            link
            @click="setTaskStatus(item)"
          >
            {{ item }}
          </v-list-item>
        </v-list>
      </v-menu>
    </v-row>
    <v-divider />
  </div>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component, Prop} from 'vue-property-decorator';
import {DONE, IN_PROGRESS, STUCK} from '../../assets/constants';
import {CardInterface} from '../../store/modules/cards';
import {UPDATE_CARD_DATA} from '../../store/mutationTypes';

@Component({
  props: {
    card: {type: Object as () => CardInterface, required: true},
    initialized: {type: Boolean, required: true, default: false},
  },
})
export default class TaskItem extends Vue {
  @Prop() card!: CardInterface;
  @Prop({default: false}) initialized!: Boolean;
  $notifier: any;
  showCard: boolean = false;
  taskStatusArr: string[] = [STUCK, IN_PROGRESS, DONE];

  async setTaskStatus(taskStatus: string) {
    const success = await this.$store.dispatch('modules/cards/updateCard', {
      uuid: this.card.uuid,
      meeting: this.card.meeting,
      taskStatus,
    });

    this.$notifier.showMessage({
      content: success ? 'Status updated' : 'Status update failed. Try again',
      color: success ? 'success' : 'error',
    });
    if (success) {
      this.updateStatus(taskStatus);
    }
  }

  updateStatus(taskStatus: string) {
    this.$store.commit(`modules/cards/${UPDATE_CARD_DATA}`, {
      ...this.card,
      taskStatus,
    });
  }

  toggleShowCard(showCard: boolean) {
    this.showCard = showCard;
  }
}
</script>
