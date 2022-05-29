<template>
  <v-btn :text="text" color="primary" @click="cancel" :disabled="disabled">
    {{ label }}
  </v-btn>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';

@Component({
  props: {
    label: {type: String, required: true},
    disabled: {type: Boolean, required: false, default: false},
    text: {type: Boolean, required: false},
  },
})
export default class CancelButton extends Vue {
  $emit: any;

  cancel() {
    this.$emit('cancel');
  }
}
</script>
