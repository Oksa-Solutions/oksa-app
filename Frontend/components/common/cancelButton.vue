<template>
  <v-btn text color="primary" @click="cancel" :disabled="disabled">
    {{ label }}
  </v-btn>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';

const cancelButtonProps = Vue.extend({
  props: {
    label: {type: String, required: true},
    disabled: {type: Boolean, required: false, default: false},
  },
});

@Component({})
export default class CancelButton extends mixins(cancelButtonProps) {
  $emit: any;

  cancel() {
    this.$emit('cancel');
  }
}
</script>
