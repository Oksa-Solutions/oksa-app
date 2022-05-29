<template>
  <v-col class="flex-column" style="align-self: center">
    <v-row class="d-flex flex-column" style="z-index: 1">
      <h3 class="slogan" style="text-align: center">Sign in</h3>
    </v-row>
    <v-form ref="loginForm" v-model="valid" @submit.prevent="() => false">
      <v-col v-if="!loginCodeSent">
        <v-row class="flex-column pb-8" style="z-index: 1">
          <v-tabs centered @change="(value) => chooseInput(value)">
            <v-tab>By email</v-tab>
            <!-- <v-tab>By phone</v-tab> -->
          </v-tabs>
        </v-row>
        <v-row class="flex-column px-5" style="z-index: 1; height: 80px">
          <div
            v-if="showPhoneNumber"
            style="position: relative"
            @keyup.enter="getOTP"
          >
            <div class="premium-banner pa-1 elevation-2">Premium</div>
            <vue-phone-number-input
              v-if="showPhoneNumber"
              v-model="phoneNumber"
              @update="(value) => updatePhone(value)"
              class="pb-8"
            />
          </div>
          <v-text-field
            v-else
            v-model="email"
            outlined
            single-line
            class="shrink"
            prepend-inner-icon="mdi-email"
            label="Email"
            style=""
            :rules="[rules.email]"
            @keyup.enter="getOTP"
          />
        </v-row>
        <v-row class="flex-column mx-2 mb-4" style="z-index: 1">
          <SubmitButton
            @done="getOTP"
            v-bind="{label: 'Send me a code', disabled: !valid}"
          />
        </v-row>
        <!-- TODO: Add modal to explain OTP -->
        <!-- <v-row class="flex-column">
        <a @click="showInfoModal" class="linkStyle">
          Wait, no password?
        </a>
      </v-row> -->
      </v-col>
      <v-col v-else>
        <v-row class="flex-column px-5" style="z-index: 1">
          <v-text-field
            v-model="otp"
            outlined
            single-line
            label="One-time password"
            :rules="[rules.otp]"
            @keyup.enter="submitOTP"
          />
        </v-row>
        <v-row class="flex-column px-5 mt-n2 pb-2" style="z-index: 1">
          <p style="font-size: 14px">
            {{
              `We have sent OTP to your ${
                showPhoneNumber ? 'phone number' : 'email address'
              }`
            }}
          </p>
        </v-row>
        <v-row class="flex-column mx-2 mb-4">
          <SubmitButton
            @done="submitOTP"
            v-bind="{label: 'Done', disabled: !valid}"
          />
        </v-row>
      </v-col>
    </v-form>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import {
  SET_AUTH_TOKEN,
  SET_PROFILE,
  SET_REFRESH_TOKEN,
  SET_USER_DATA,
  SET_USER_LOGGED_IN,
} from '../../store/mutationTypes';
import {loginCodeDto, signInDto} from '../../dto/signin';

import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import {RULES} from '~/assets/constants';
Vue.component('vue-phone-number-input', VuePhoneNumberInput);

@Component({
  props: {
    signIn: {type: Boolean, required: false, default: false},
  },
})
export default class SignIn extends Vue {
  $router: any;
  $notifier: any;
  valid: boolean = false;
  showPhoneNumber: boolean = false;
  email: string = '';
  phoneNumber: string = '';
  phoneNumberWithCode: string = '';
  loginCodeSent: boolean = false;
  otp: string = '';
  loginUuid: string = '';
  rules = {...RULES};

  chooseInput(value: number) {
    if (value === 0) {
      this.showPhoneNumber = false;
      this.phoneNumber = '';
    } else if (value === 1) {
      this.showPhoneNumber = true;
      this.email = '';
    }
  }

  updatePhone(value: any) {
    this.phoneNumberWithCode = value?.formatInternational;
    this.valid = value?.isValid;
  }

  getOTP() {
    const loginObj: signInDto = {};
    if (this.showPhoneNumber) {
      loginObj.phoneNumber = this.phoneNumberWithCode;
    } else {
      loginObj.email = this.email;
    }
    if (this.valid) {
      this.sendLogin(loginObj);
    }
    this.valid = false;
  }

  async submitOTP() {
    const loginObj: loginCodeDto = {
      uuid: this.loginUuid,
      loginCode: this.otp,
    };
    Object.assign(
      loginObj,
      this.showPhoneNumber
        ? {phoneNumber: this.phoneNumberWithCode}
        : {email: this.email},
    );
    try {
      if (this.valid) {
        const res = await this.$axios.post('/auth/logincode', loginObj);

        if (res.status === 201) {
          this.$store.commit(`modules/auth/${SET_USER_LOGGED_IN}`, true);
          this.$store.commit(`modules/user/${SET_USER_DATA}`, {
            uuid: res.data.user.uuid,
          });
          this.$store.commit(
            `modules/auth/${SET_AUTH_TOKEN}`,
            res.data.user.authToken,
          );
          this.$store.commit(
            `modules/auth/${SET_REFRESH_TOKEN}`,
            res.data.user.refreshToken,
          );
          this.$store.commit(`modules/profile/${SET_PROFILE}`, {
            ...res.data.profile,
            user: res.data.user,
          });
          this.$axios.setToken(res.data.user.authToken, 'Bearer');
          if (this.signIn) {
            this.$router.push({path: '/dashboard'});
          } else {
            this.$emit('login', true);
          }
        } else {
          console.warn('Something went wrong');
          this.$emit('login', false);
        }
      }
    } catch (err: any) {
      if (err?.response?.status === 400) {
        console.warn('Missing key(s) in body');
      } else if (err?.response?.status === 401) {
        this.$notifier.showMessage({
          content: 'OTP wrong or expired',
          color: 'error',
        });
      } else if (err?.response?.status === 403) {
        console.warn('Forbidden');
      } else if (err?.response?.status === 404) {
        console.warn('Faced error during authentication');
      } else {
        console.error(err);
      }
    }
  }

  showInfoModal() {
    console.log('Show infos');
  }

  async sendLogin(loginObj: signInDto) {
    try {
      const res = await this.$axios.post('/auth/login', loginObj);
      if (res.status === 201) {
        this.loginUuid = res.data.uuid;
        this.loginCodeSent = true;
      } else {
        console.warn('Something went wrong');
      }
    } catch (err: any) {
      if (err?.response?.status === 400) {
        console.warn('Missing key(s) in body');
      } else if (err?.response?.status === 401) {
        console.warn('Unauthorized');
      } else if (err?.response?.status === 403) {
        console.warn('Forbidden');
      } else if (err?.response?.status === 404) {
        this.$notifier.showMessage({
          content: 'No premium subscription',
          color: 'error',
        });
        console.warn('Faced error during authentication');
      } else {
        console.error(err);
      }
    }
  }
}
</script>

<style>
.linkStyle {
  text-align: center;
  text-decoration: underline;
  margin-top: -10px;
}
.premium-banner {
  position: absolute;
  background: var(--v-jorisViolet-base);
  color: white;
  border-radius: 50%;
  font-size: 10px;
  font-weight: bold;
  right: -15px;
  top: -5px;
  transform: rotate(35deg);
  z-index: 10;
}
</style>
