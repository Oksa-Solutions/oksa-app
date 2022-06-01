<template>
  <v-dialog value="true" max-width="400px" persistent>
    <v-card>
      <v-form ref="form" v-model="valid" @submit.prevent="() => false">
        <v-card-title class="bold pb-6">{{ $setContent('REQUEST_TRIAL') }}</v-card-title>
        <v-card-subtitle>
          {{ $setContent('TRIAL_INGRESS') }}
        </v-card-subtitle>
        <v-text-field
          v-model="name"
          :label="$setContent('NAME')"
          outlined
          required
          maxLength="30"
          :rules="[rules.name]"
          :value="name"
          class="mx-6"
        />

        <v-text-field
          v-model="email"
          :label="$setContent('EMAIL')"
          outlined
          required
          maxLength="30"
          :rules="[rules.email]"
          :value="email"
          class="mx-6"
        />

        <v-text-field
          v-model="phoneNumber"
          :label="$setContent('PHONE')"
          outlined
          maxLength="30"
          :value="phoneNumber"
          class="mx-6 mb-4"
        />

        <v-card-actions>
          <v-spacer />
          <CancelButton @cancel="closeModal" v-bind="{label: $setContent('CANCEL')}" />
          <SubmitButton
            @done="submit"
            v-bind="{label: $setContent('REQUEST'), disabled: !valid}"
          />
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
export default class RequestTrialModal extends Vue {
  $axios: any;
  $notifier: any;
  name: string = '';
  valid: boolean = false;
  email: string = '';
  phoneNumber: string = '';
  rules = {...RULES};

  async submit() {
    let success: boolean = false;
    let msg: string = '';
    try {
      success = await this.$axios.post('/requestTrial', {
        name: this.name,
        email: this.email,
        phoneNumber: this.phoneNumber,
      });
      msg = this.$setContent('THANK_YOU_FOR_CONTACTING');
    } catch (err) {
      if (err.response.status === 400) {
        msg = 'Missing key(s) in body';
      } else if (err.response.status === 404) {
        msg = 'Sending request failed. Try again.';
      } else {
        msg = this.$setContent('NETWORK_ERROR');
      }
    }

    this.$notifier.showMessage({
      content: msg,
      color: success ? 'success' : 'error',
    });
    if (success) {
      this.closeModal();
    }
  }

  closeModal() {
    this.$emit('closed');
  }
}
</script>
