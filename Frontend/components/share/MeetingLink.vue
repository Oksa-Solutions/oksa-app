<template>
  <v-container>
    <v-text-field
      outlined
      single-line
      hide-details
      readonly
      ref="textToCopy"
      v-model="url"
      class="elevation-0 link"
      color="primary"
    ></v-text-field>
    <CancelButton @cancel="copyText" v-bind="{label: $setContent('COPY_LINK')}" />
  </v-container>
</template>
<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';

@Component({})
export default class MeetingLink extends Vue {
  $notifier: any;
  $refs: any;
  url: string = `${process.env.baseDomain}/m/${this.$store.state.modules.meeting.id}?pw=${this.$store.state.modules.meeting.password}`;

  copyText() {
    let textToCopy = this.$refs.textToCopy.$el.querySelector('input');
    textToCopy.select();
    document.execCommand('copy');
    this.$notifier.showMessage({
      content: this.$setContent('LINK_COPIED'),
      color: 'success',
    });
  }
}
</script>

<style scoped></style>
