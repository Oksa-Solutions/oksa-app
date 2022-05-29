<template>
  <v-card
    class="
      d-flex
      align-center
      flex-row flex-grow-1 flex-shrink-0
      elevation-0
      round-8
    "
    color="rgba(0,0,0,0.04)"
  >
    <v-col class="flex-grow-0 pa-0">
      <div
        class="
          d-flex
          justify-center
          flex-grow-0 flex-shrink-0
          align-center
          rounded-circle
          bold
          pa-2
          my-3
          mx-4
        "
        :style="{
          width,
          height,
          background: `linear-gradient(115deg, ${background.start} 0%, ${background.end} 100%)`,
        }"
      >
        <OksaIconNoFill />
      </div>
    </v-col>
    <v-col>
      <v-row>
        <v-card-title class="pa-0 card-title bold">
          {{ topic.name }}
        </v-card-title>
      </v-row>
      <v-row>
        {{ topic.id }}
      </v-row>
    </v-col>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {GRADIENT_COLORS} from '../../assets/constants';
import {MeetingInterface} from '../../store/modules/meeting';

@Component({
  props: {
    topic: {type: Object as () => MeetingInterface, required: true},
  },
})
export default class TopicItem extends Vue {
  background = this.getRandomBackground();
  width = '40px';
  height = '40px';

  getRandomBackground() {
    const idx: number = Math.floor(Math.random() * 7);
    return GRADIENT_COLORS[idx];
  }
}
</script>
