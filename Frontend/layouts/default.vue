<template>
  <v-app dark :style="{background: 'rgba(255,255,255,0)'}">
    <v-main class="align-center">
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component({
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  layout: 'simple',
})
export default class Error extends Vue {
  @Prop({default: null}) error!: {statusCode: number}
  meetingID: string = this.$store.state.modules.meeting.meetingID;
  pageNotFound: string = '404 Not Found';
  badRequest: string = 'Bad request, missing key(s) in body';
  otherError: string = 'An error occurred';

  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {title};
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
