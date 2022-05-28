<template>
  <v-snackbar v-model="show" :color="color" width="auto">
    {{ message }}
  </v-snackbar>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component';
import {Component, Prop, Vue} from 'vue-property-decorator';

const SnackbarProps = Vue.extend({});

@Component
export default class Snackbar extends mixins(SnackbarProps) {
  show: boolean = false;
  message: string = '';
  color: string = '';

  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'snackbar/showMessage') {
        this.message = state.snackbar.content;
        this.color = state.snackbar.color;
        this.show = true;
      }
    });
  }
}

// As seen on https://dev.to/stephannv/how-to-create-a-global-snackbar-using-nuxt-vuetify-and-vuex-1bda
</script>
