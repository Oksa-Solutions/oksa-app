<template>
  <v-app dark :style="{background: 'rgba(255,255,255,0)'}">
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-if="error.statusCode === 400">
      {{ badRequest }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink :to="{path: '/'}"> Front page </NuxtLink>
  </v-app>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component';
import {Component, Prop, Vue} from 'vue-property-decorator';

const ErrorProps = Vue.extend({
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  layout: 'simple',
});

@Component({})
export default class Error extends mixins(ErrorProps) {
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
