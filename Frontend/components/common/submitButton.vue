<template>
  <v-btn color="primary" @click="submit" :disabled="disabled">
    {{ label }}
  </v-btn>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';

const submitButtonProps = Vue.extend({
  props: {
    label: {type: String, required: true},
    disabled: {type: Boolean, required: false, default: false},
  },
});

@Component({})
export default class SubmitButton extends mixins(submitButtonProps) {
  $emit: any;

  submit() {
    this.$emit('done');
  }
}
</script>
