<template>
  <v-col class="pa-0">
    <div
      class="d-flex justify-center align-center rounded-lg pa-2 bold"
      :style="{
        fontFamily,
        width,
        height,
        fontSize,
        cursor,
        background}"
    >
      {{ getInitials(name) }}
    </div>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {mapState} from 'vuex';
import {FLAT_COLORS} from '~/assets/constants';

@Component({
  props: {
    fontFamily: {type: String, required: false, default: 'Telegraf'},
    name: {type: String, required: true},
    width: {type: String, required: false, default: '36px'},
    height: {type: String, required: false, default: '36px'},
    fontSize: {type: String, required: false},
    cursor: {type: String, required: false, default: 'default'},
    icon: {type: String, required: false}, // TODO: change to correct type and add possibility to have icon on right bottom corner
  },
  computed: mapState({
    // background: (state: any) => state.modules.profile.settings.background,
  }),
})
export default class InitialsCircle extends Vue {
  background = this.getRandomBackground();

  getRandomBackground() {
    const idx: number = Math.floor(Math.random() * 7);
    return FLAT_COLORS[idx];
  }
  getInitials(name: string) {
    const [firstname, lastname] = name.split(' ');
    if (!!firstname && firstname.length > 2) {
      if (lastname) {
        return (firstname[0] + lastname[0]).toUpperCase();
      } else {
        return firstname.slice(0, 2).toUpperCase();
      }
    }
    return !!firstname ? firstname.slice(0, 2).toUpperCase() : '';
  }
}
</script>
