<template>
  <v-dialog value="true" max-width="340px" persistent>
    <v-card class="rounded-lg mx-auto pt-6">
      <InitialsCircle
        :name="profile.name"
        width="120px"
        height="120px"
        fontSize="45px"
      />
      <ColorPicker
        v-bind="{gradient: true, selectedColor: profile.settings.background}"
      />
      <v-row class="mx-4">
        <v-icon>$vuetify.icons.oksa-gradient</v-icon>
        <v-card-title class="">{{ $setContent('GREAT_TO_HAVE_YOU') }}</v-card-title>
      </v-row>
      <v-form ref="ref" v-model="formValid">
        <v-text-field
          v-model="name"
          outlined
          label="Name"
          :rules="[rules.name]"
          class="px-4"
        />
        <v-text-field
          v-model="email"
          outlined
          label="Email"
          :rules="[rules.email]"
          class="px-4"
        />
        <!-- <vue-phone-number-input
          v-model="phoneNumber"
          @update="(value) => updatePhone(value)"
          class="pb-8 px-4"
        /> -->
      </v-form>
      <v-row class="mx-4 pb-4 info-text">
        {{ $setContent('INFO_IS_NEEDED') }}
      </v-row>
      <!-- <v-row class="mx-4 pb-8 info-text">
        We will keep your information between us and we will not spam you.
        You can read more of our
        <a href="https://www.oksa.io/privacy-policy"
          target="_blank"
          rel="noopenr noreferrer">privacy policy</a>
      </v-row> -->

      <v-card-actions class="pa-6 pt-0">
        <v-spacer></v-spacer>
        <template>
          <CancelButton
            @cancel="submit"
            v-bind="{label: $setContent('DONE'), disabled: !(formValid && valid)}"
          />
        </template>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component, Prop} from 'vue-property-decorator';
import {mapState} from 'vuex';

import {updateProfileDto} from '../../dto/profiles';

import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import {RULES} from '~/assets/constants';
import {UserInterface} from '~/store/modules/user';
import {ProfileInterface} from '~/store/modules/profile';

Vue.component('vue-phone-number-input', VuePhoneNumberInput);

@Component({
  props: {
    uuid: {type: String, required: true},
    profileName: {type: String, required: true},
    profileEmail: {type: String, required: true},
    profilePhone: {type: String, required: true},
  },
  computed: mapState({
    user: (state: any) => state.modules.user,
    profile: (state: any) => state.modules.profile,
  }),
})
export default class FirstLoginModal extends Vue {
  @Prop() uuid!: string;
  @Prop() profileName!: string;
  @Prop() profileEmail!: string;
  @Prop() profilePhone!: string;
  @Prop() user!: UserInterface;
  @Prop() profile!: ProfileInterface;
  $notifier: any;
  formValid: boolean = false;
  name: string = this.profileName;
  email: string = this.profileEmail;
  phoneNumber: string = this.stripCountryCode(this.profilePhone);
  phoneNumberWithCode: string = '';
  valid: boolean = true;
  rules = {...RULES};

  stripCountryCode(value: string) {
    if (value.startsWith('+')) {
      return value.slice(value.split(' ')[0].length);
    }
    return value;
  }

  updatePhone(value: any) {
    this.phoneNumberWithCode = value?.formatInternational;
    this.valid = value?.isValid;
  }

  async submit() {
    const data: updateProfileDto = {
      uuid: this.uuid,
      user: this.user,
      name: this.name.trim(),
      email: this.email.trim(),
      settings: this.$store.state.modules.profile.settings,
      // phoneNumber: this.phoneNumberWithCode
    };
    const success = await this.$store.dispatch('modules/profile/update', data);
    this.$notifier.showMessage({
      content: success
        ? this.$setContent('PROFILE_UPDATED')
        : this.$setContent('PROFILE_UPDATE_FAILED'),
      color: success ? 'success' : 'error',
    });
  }
}
</script>

<style scoped>
.info-text {
  color: var(--v-darkGray-lighten3);
  font-size: 12px;
}
</style>
