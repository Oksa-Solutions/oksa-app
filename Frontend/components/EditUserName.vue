<template>
  <v-dialog value="true" max-width="380px" persistent>
    <v-card class="rounded-lg mx-auto pt-6">
      <v-card-subtitle class="subheader pb-0"> Welcome to </v-card-subtitle>
      <v-card-title class="text-h4 pt-0">
        {{ this.$store.state.modules.meeting.name }}!
      </v-card-title>
      <v-card-text class="realBlack--text">
        We just need your name.
      </v-card-text>
      <v-form ref="form" v-model="formValid">
        <v-text-field
          v-model="username"
          label="Your name"
          outlined
          required
          maxLength="30"
          :rules="[rules.name]"
          :value="username"
          hint="It will only be visible by participants in this topic."
          persistent-hint
          class="mx-6 mb-4"
        ></v-text-field>

        <v-text-field
          v-model="email"
          outlined
          :rules="[rules.email]"
          label="Email (optional)"
          hint="You will receive infos about this topic only. We will never spam you. No worries."
          persistent-hint
          class="mx-6 mb-4"
        ></v-text-field>

        <v-card-actions class="pa-6 pt-0">
          <v-spacer></v-spacer>
          <template>
            <SubmitButton
              @done="submit"
              v-bind="{label: 'Save', disabled: !formValid}"
            />
          </template>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';
import {RULES} from '~/assets/constants';

@Component({})
export default class EditUserName extends Vue {
  $notifier: any;
  formValid: boolean = false;
  username: string = '';
  email: string = '';
  rules = {...RULES};

  async submit() {
    const success = await this.$store.dispatch('modules/user/update', {
      useruuid: this.$store.state.modules.user.uuid,
      authToken: this.$store.state.modules.auth.authToken,
      refreshToken: this.$store.state.modules.auth.refreshToken,
      name: this.username,
    });

    success
      ? this.cancel()
      : this.$notifier.showMessage({
          content: 'There was a network error. Try again.',
          color: 'error',
        });
    //this.$emit('close-modal', this.$store.state.modules.user.name !== ' ');
  }

  cancel() {
    this.formValid = false;
    this.username = this.$store.state.modules.user.name;
  }
}
</script>

<style scoped>
.text-h4 {
  line-height: 1.3rem !important;
  font-weight: 700 !important;
}
.text-small {
  font-size: 0.75rem;
}
</style>
