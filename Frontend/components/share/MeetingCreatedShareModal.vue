<template>
  <v-dialog v-model="showModal" max-width="340px" persistent>
    <v-card class="rounded-lg">
      <v-card-title class="headline pb-6">
        <v-icon class="mr-4 realBlack--text">mdi-link</v-icon>
        <h4>You're all set!</h4>
      </v-card-title>

      <v-card-text>
        <p>Share this link with pepole you want in the topic</p>
        <MeetingLink />
      </v-card-text>

      <v-card-actions class="pb-6 pr-6">
        <v-spacer></v-spacer>
        <SubmitButton @done="moveToMeeting" v-bind="{label: 'Done'}" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component';
import {Component, Prop, Vue} from 'vue-property-decorator';

const MeetingCreatedShareModalProps = Vue.extend({
  props: {
    showModal: {type: Boolean, required: true},
  },
});

@Component
export default class MeetingCreatedShareModal extends mixins(
  MeetingCreatedShareModalProps,
) {
  $router: any;

  moveToMeeting() {
    this.$router.push({
      path: '/m/' + this.$store.state.modules.meeting.id,
      query: {pw: this.$store.state.modules.meeting.password},
    });
  }
}
</script>

<style scoped>
.header {
  max-width: 7em;
}
</style>
