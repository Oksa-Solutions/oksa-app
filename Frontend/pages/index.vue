<template>
  <v-container fluid>
    <v-row fluid grow>
      <v-col md="6" sm="12" :class="logoClass" style="min-height: 50vh">
        <a
          href="https://www.oksa.io"
          target="_blank"
          :style="{alignSelf: 'center', justifySelf: 'center', flex: 1}"
        >
          <OksaIconAndText class="black--text" width="18rem" />
        </a>
      </v-col>
      <v-col md="6" sm="12" class="d-flex flex-column">
        <v-row class="d-flex flex-column" style="z-index: 1">
          <h3 class="slogan">
            Molding your ideas into diamonds is a team effort.
          </h3>
          <p class="pitch">
            Write, vote and allocate. Oksa is an application for all of you who
            need to get a team to row in the same direction. We have been there
            - trying to get all those good ideas work and people behind them.
          </p>
        </v-row>

        <v-row class="mt-8 flex-column">
          <v-btn nuxt to="/new/" color="primary" large>
            <v-icon left>$vuetify.icons.oksa-mini</v-icon>
            <span class="createButton"> Set a topic </span>
          </v-btn>
          <v-divider class="mt-8 mb-6" />
          <v-form
            ref="joinMeeting"
            v-model="valid"
            class="d-flex flex-column mt-4"
          >
            <v-text-field
              :value="id.toLowerCase()"
              @input="(value) => (id = value.toLowerCase())"
              required
              outlined
              single-line
              class="shrink"
              prepend-inner-icon="mdi-keyboard"
              :rules="[rules.required, rules.id]"
              label="Enter topic code"
              v-mask="'NNN-NNN-NNN'"
            />
            <v-text-field
              v-model="meetingPassword"
              v-if="id != ''"
              required
              outlined
              single-line
              class="shrink"
              prepend-inner-icon="mdi-lock"
              :rules="[rules.required, rules.password]"
              label="Enter password"
            />
            <SubmitButton
              @done="submit"
              v-bind="{label: 'Join', disabled: !valid}"
            />
          </v-form>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component';
import {Component, Prop, Vue} from 'vue-property-decorator';
import {RULES} from '~/assets/constants';
import {AUTH_MEETING, SET_USER_AUTHENTICATED} from '../store/mutationTypes';

const PagesIndexProps = Vue.extend({
  layout: 'simple',
});

@Component({
  head() {
    return {title: 'Home'};
  },
})
export default class PagesIndex extends mixins(PagesIndexProps) {
  $router: any;
  $notifier: any;
  $initialLoad: any;
  logoClass: string = 'd-flex flex-column justify-left align-left px-13';
  valid: boolean = false;
  id: string = '';
  meetingPassword: string = '';
  rules = {...RULES};
  window = {
    width: 0,
  };

  async mounted() {
    // await this.$initialLoad();
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  }

  async submit() {
    // First call API
    await this.$initialLoad();
    this.$store.commit(`modules/auth/${SET_USER_AUTHENTICATED}`, false);
    await this.$store.dispatch(`modules/auth/${AUTH_MEETING}`, {
      meeting: {id: this.id},
      password: this.meetingPassword,
      uuid: this.$store.state.modules.user.uuid,
    });
    if (this.$store.state.modules.auth.isAuthenticated) {
      // IF correct: router push
      this.$router.push({
        path: '/m/' + this.id,
        query: {pw: this.meetingPassword},
      });
    } else {
      // IF error: show Snackbar error
      this.$notifier.showMessage({
        content: 'Invalid meeting code or password. Try again.',
        color: 'error',
      });
    }
  }

  handleResize() {
    this.window.width = window.innerWidth;
    if (this.window.width >= 960) {
      this.logoClass = 'd-flex flex-column justify-left align-left px-13';
    } else {
      this.logoClass = 'd-flex flex-column justify-center align-center';
    }
  }
}
</script>

<style scoped>
.createButton {
  text-transform: none;
  font-family: 'Open Sans', sans-serif;
  font-size: 1.125rem;
  letter-spacing: initial;
  font-weight: 600;
}
</style>
