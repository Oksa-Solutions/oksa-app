<template>
  <v-col class="d-flex flex-column justify-center align-center">
    <v-row>
      <OksaCelebrationBig />
    </v-row>
    <v-row class="mt-8">
      <p class="mb-1 text-h5 welcomeTopic">
        <span class="welcomeTo">{{ $setContent('WELCOME_TO') }}</span>
        <br />
        <span class="brandNewTopic">{{ $setContent('BRAND_NEW_TOPIC') }}</span>
      </p>
    </v-row>
    <v-row class="py-2 semibold">{{ $setContent('LETS_START') }}</v-row>
    <v-row class="py-8">
      <AddIdeaButton v-bind="{emptyMeeting: true}" />
    </v-row>
  </v-col>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';

@Component({})
export default class EmptyMeeting extends Vue {}
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
  background: linear-gradient(
    135deg,
    var(--v-carrot-base) 0%,
    var(--v-rose-base) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
