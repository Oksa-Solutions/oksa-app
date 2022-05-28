<template>
  <v-card class="rounded-lg">
    <v-card-title class="headline pb-6">
      <v-icon class="mr-4 realBlack--text">mdi-link</v-icon>
      <h4 prepend-icon="mdi-camera">Share topic</h4>
    </v-card-title>

    <v-card-text>
      <h5 class="text-h5 realBlack--text">By code</h5>
      <v-row class="pl-3">
        <v-col class="header">
          <v-row>Topic ID</v-row>
          <v-row>Password</v-row>
        </v-col>
        <v-col class="font-weight-bold realBlack--text">
          <v-row>{{ this.$store.state.modules.meeting.meetingID }}</v-row>
          <v-row>{{ this.$store.state.modules.meeting.password }}</v-row>
        </v-col>
      </v-row>
      <h5 class="text-h5 realBlack--text">By link</h5>
      <p>Anyone with this link can join the topic</p>
      <MeetingLink />
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <CancelButton @cancel="closeModal" v-bind="{label: 'Done'}" />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component';
import {Component, Prop, Vue} from 'vue-property-decorator';

const ShareMeetingModalProps = Vue.extend({});

@Component
export default class ShareMeetingModal extends mixins(ShareMeetingModalProps) {
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
