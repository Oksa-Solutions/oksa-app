<template>
  <v-col class="d-flex flex-column justify-center align-center">
    <v-row>
      <OksaCelebrationBig />
    </v-row>
    <v-row class="">
      <h3 class="header">Welcome to your</h3>
    </v-row>
    <v-row>
      <h3 class="header red-header">Brand new topic!</h3>
    </v-row>
    <v-row class="py-2 semibold"> Let's get started! </v-row>
    <v-row class="py-8">
      <AddIdeaButton v-bind="{emptyMeeting: true}" />
    </v-row>
  </v-col>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';

const emptyMeetingProps = Vue.extend({});

@Component
export default class EmptyMeeting extends mixins(emptyMeetingProps) {}
</script>

<style scoped>
.header {
  font-size: 20px;
}
.red-header {
  color: red;
}
</style>
