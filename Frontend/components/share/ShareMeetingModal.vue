<template>
  <v-card class="rounded-lg">
    <v-card-title class="headline pb-6">
      <v-icon class="mr-4 realBlack--text">mdi-link</v-icon>
      <h4 prepend-icon="mdi-camera">{{ $setContent('SHARE_TOPIC') }}</h4>
    </v-card-title>

    <v-card-text>
      <h5 class="text-h5 realBlack--text">{{ $setContent('BY_CODE') }}</h5>
      <v-row class="pl-3">
        <v-col class="header">
          <v-row>{{ $setContent('TOPIC_ID') }}</v-row>
          <v-row>{{ $setContent('PASSWORD') }}</v-row>
        </v-col>
        <v-col class="font-weight-bold realBlack--text">
          <v-row>{{ this.$store.state.modules.meeting.id }}</v-row>
          <v-row>{{ this.$store.state.modules.meeting.password }}</v-row>
        </v-col>
      </v-row>
      <h5 class="text-h5 realBlack--text">{{ $setContent('BY_LINK') }}</h5>
      <p>{{ $setContent('JOIN_TOPIC_ALERT') }}</p>
      <MeetingLink />
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <CancelButton @cancel="closeModal" v-bind="{label: $setContent('DONE')}" />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';

@Component({})
export default class ShareMeetingModal extends Vue {
  closeModal(event: Event) {
    this.$emit('clicked');
  }
}
</script>

<style scoped>
.header {
  max-width: 7em;
}
</style>
