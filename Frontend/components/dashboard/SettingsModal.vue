<template>
  <v-card class="rounded-lg">
    <v-card-title class="headline pb-6">
      <v-icon class="mr-4 realBlack--text">mdi-cog</v-icon>
      <h4 prepend-icon="mdi-cog">{{ $setContent('TOPIC_SETTINGS') }}</h4>
    </v-card-title>

    <v-card-text>
      <p>{{ $setContent('TOPIC') }}</p>
      <v-text-field
        v-model="meetingName"
        outlined
        single-line
        disabled
        prepend-inner-icon="mdi-keyboard"
        :label="this.$store.state.modules.meeting.name"
      ></v-text-field>

      <p>{{ $setContent('TOPIC_PASSWORD') }}</p>
      <v-text-field
        v-model="meetingPassword"
        outlined
        single-line
        disabled
        prepend-inner-icon="mdi-keyboard"
        :label="this.$store.state.modules.meeting.password"
      ></v-text-field>

      <v-switch
        v-model="$vuetify.theme.dark"
        :label="$setContent('DARK_MODE_TOGGLE')"
        color="primary"
        @change="toggleDarkMode()"
      ></v-switch>
      <v-switch
        v-model="closeTopic"
        :label="$setContent('CLOSE_TOPIC')"
        color="primary"
        disabled
      ></v-switch>
      <v-btn text disabled color="error" class="delete">
        <v-icon>mdi-delete</v-icon>
        <span class="pl-2">{{ $setContent('DELETE_TOPIC') }}</span>
      </v-btn>
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
import {mapState} from 'vuex';

@Component({
  computed: mapState({
    meetingName: (state: any) => state.modules.meeting.name,
    meetingPassword: (state: any) => state.modules.meeting.password,
  }),
})
export default class SettingsModal extends Vue {
  closeTopic: boolean = false;

  toggleDarkMode() {
    this.$store.dispatch('modules/base/setDarkMode', this.$vuetify.theme.dark);
  }

  closeModal() {
    this.$emit('clicked');
  }
}
</script>

<style scoped>
.delete {
  letter-spacing: initial;
  text-transform: initial;
  font-weight: normal;
  font-size: initial;
}
</style>
