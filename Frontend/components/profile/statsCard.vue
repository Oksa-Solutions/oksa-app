<template>
  <v-card class="d-flex elevation-3 rounded-lg">
    <v-container fluid>
      <v-row class="px-6" justify="center" align="center">
        <v-col sm="2">
          <div class="icon-circle" :style="{background: circleColor}">
            <v-icon class="icon-box" :color="iconColor">{{ icon }}</v-icon>
          </div>
        </v-col>
        <v-col sm="10">
          <v-card-title class="bold">{{ title }}</v-card-title>
          <v-card-subtitle>{{ content }}</v-card-subtitle>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {
  CONTRIBUTORS,
  DECISIONS_MADE,
  IDEAS_GATHERED,
  IDEAS_READY,
} from '~/assets/constants';

@Component({
  props: {
    icon: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
  },
})
export default class StatsCard extends Vue {
  circleColor: string = '';
  iconColor: string = '';

  mounted() {
    // TODO select correct theme version according to dark/light theme
    switch (this.content) {
      case IDEAS_READY:
        // this.circleColor = this.hexToRGB(this.$vuetify?.theme?.themes?.light?.jorisViolet?.base, '0.2');
        this.circleColor = this.hexToRGB('#6A00FF', '0.2');
        this.iconColor = 'var(--v-jorisViolet-base)';
        break;
      case IDEAS_GATHERED:
        // this.circleColor = this.hexToRGB(this.$vuetify?.theme?.themes?.light?.carrot?.base, '0.2');
        this.circleColor = this.hexToRGB('#FF7B3D', '0.2');
        this.iconColor = 'var(--v-carrot-base)';
        break;
      case DECISIONS_MADE:
        // this.circleColor = this.hexToRGB(this.$vuetify?.theme?.themes?.light?.ok?.base, '0.2');
        this.circleColor = this.hexToRGB('#7ABC4B', '0.2');
        this.iconColor = 'var(--v-ok-base)';
        break;
      case CONTRIBUTORS:
        this.circleColor = this.hexToRGB('#74BCFF', '0.2');
        this.iconColor = 'var(--v-skyblue-base)';
      default:
        break;
    }
  }

  hexToRGB(hex: string, alpha: string) {
    // Hex string contains # as first char and then 3 or 6 characters as the actual value
    if (hex.length === 4 || hex.length === 7) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);

      if (alpha) {
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
      } else {
        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
      }
    } else {
      throw new Error('Bad hex value');
    }
  }
}
</script>

<style scoped>
.icon-circle {
  width: 3em;
  height: 3em;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-content: center;
}
.word-break {
  word-break: break-all;
}
</style>
