<template>
  <v-col class="d-flex flex-column justify-center align-center">
    <v-row>
      <OksaCelebrationBig />
    </v-row>
    <v-row class="mt-8">
      <p class="mb-1 text-h5 welcomeTopic">
        <span class="welcomeTo">Welcome to your</span>
        <br>
        <span class="brandNewTopic">Brand new topic!</span>
      </p>
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
.welcomeTopic {
  line-height: 1.2em;
  text-align: center;
}
.welcomeTopic span:first-child {
  font-weight: 600;
}
.welcomeTopic span:last-child {
  background: linear-gradient(135deg, var(--v-carrot-base) 0%, var(--v-rose-base) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
