<template>
  <v-btn color="primary" @click="submit" :disabled="disabled">
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
  },
})
export default class SubmitButton extends Vue {
  $emit: any;

  submit() {
    this.$emit('done');
  }
}
</script>
