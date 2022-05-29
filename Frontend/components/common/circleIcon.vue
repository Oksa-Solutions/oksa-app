<template>
  <div></div>
  <!--v-col class="d-flex justify-center pa-0">
    <div
      class="d-flex justify-center align-center rounded-circle pa-2 bold"
      :style="{width, height, fontSize, background: `linear-gradient(115deg, ${background.start} 0%, ${background.end} 100%)`}"
    >
      {{ icon }}
    </div>
  </v-col-->
</template>

<!--script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';

@Component({
  props: {
    icon: {type: Object as () => Component, required: true},
    width: {type: String, required: false, default: '36px'},
    height: {type: String, required: false, default: '36px'},
    // background: {type: String, required: false, default: secondary.base}
  }
})
export default class CircleIcon extends Vue {}
</script-->
