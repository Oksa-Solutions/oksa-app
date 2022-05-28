<template>
  <v-row class="pt-4 mx-8 justify-center" max-width="200px">
    <div
      v-for="(color, i) in gradient ? gradientColors : colors"
      :key="i"
      class="color-item mx-2 my-2"
      :style="
        gradient
          ? {
              background: `linear-gradient(115deg, ${color.start} 0%, ${color.end} 100%)`,
            }
          : {background: color}
      "
      @click="gradient ? selectGradientColor(color) : selectColor(color)"
    >
      <v-icon
        v-if="color === selectedColor"
        class="d-flex justify-center align-center checkmark"
      >
        mdi-check
      </v-icon>
    </div>
  </v-row>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';
import {FLAT_COLORS, GRADIENT_COLORS} from '../../assets/constants';
import {UPDATE_PROFILE_SETTINGS} from '../../store/mutationTypes';

const colorPickerProps = Vue.extend({
  props: {
    gradient: {type: Boolean, required: false, default: false},
    selectedColor: {
      type: [Object as () => {start: string; end: string}, String],
      required: true,
    },
  },
});

@Component
export default class ColorPicker extends mixins(colorPickerProps) {
  colors = FLAT_COLORS;
  gradientColors = GRADIENT_COLORS;

  selectColor(color: string) {
    this.$emit('clicked', color);
  }

  selectGradientColor(color: {start: string; end: string}) {
    this.$store.commit(`modules/profile/${UPDATE_PROFILE_SETTINGS}`, {
      background: {start: color.start, end: color.end},
    });
  }
}
</script>

<style scoped>
.color-item {
  width: 3em;
  height: 3em;
  border-radius: 50%;
  box-shadow: inset 0 0 0 0.2em rgba(255, 255, 255, 0.5);
}
.checkmark {
  height: 100%;
  color: rgba(0, 0, 0, 0.6);
}
</style>
