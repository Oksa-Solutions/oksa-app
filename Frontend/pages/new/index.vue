<template>
  <v-container>
    <v-row>
      <v-container>
        <v-stepper
          v-model="creationStepper"
          class="elevation-0"
          :style="{background: 'transparent'}"
        >
          <v-stepper-items>
            <v-form ref="form" v-model="formValid">
              <v-stepper-content step="1">
                <v-card class="mx-auto round-8" max-width="340" elevation="0">
                  <div
                    class="category-container px-6 py-3 round-top-8"
                    id="fab-new-card"
                  >
                    <v-card-subtitle class="subheader pb-0">
                      Welcome to make
                    </v-card-subtitle>
                    <v-card-title class="text-h4 pt-0">
                      decisions!
                    </v-card-title>
                  </div>
                  <v-card-text class="">
                    How will you name your topic?
                  </v-card-text>
                  <v-text-field
                    v-model="name"
                    maxLength="30"
                    counter="30"
                    label="Set a topic"
                    outlined
                    required
                    :rules="[rules.required, rules.name]"
                    class="mb-4 px-4"
                    @keyup.enter="creationStepper += 1"
                  ></v-text-field>
                  <v-card-actions class="px-4 py-4">
                    <SubmitButton
                      @done="creationStepper += 1"
                      v-bind="{label: 'Next', disabled: name.length < 2}"
                    />
                  </v-card-actions>
                </v-card>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-card class="mx-auto round-8" max-width="340" elevation="0">
                  <div
                    class="category-container px-6 py-3 round-top-8"
                    id="fab-new-card"
                  >
                    <v-card-subtitle class="subheader pb-0"
                      >Okay, this is</v-card-subtitle
                    >
                    <v-card-title class="text-h4 pt-0 word-break"
                      >{{ name }}!</v-card-title
                    >
                  </div>
                  <v-card-text class="">
                    Here is a password for your topic. Change it if you want.
                  </v-card-text>
                  <v-text-field
                    v-model="password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    maxLength="20"
                    label="Topic password"
                    outlined
                    required
                    autocomplete="off"
                    inputmode="numeric"
                    :rules="[rules.required, rules.password]"
                    class="mb-4 px-4"
                    @click:append="show = !show"
                    @keyup.enter="creationStepper += 1"
                  >
                  </v-text-field>
                  <v-card-actions class="px-4 py-4">
                    <v-btn text color="gray" @click="creationStepper -= 1">
                      Back
                    </v-btn>
                    <SubmitButton
                      @done="creationStepper += 1"
                      v-bind="{label: 'Next', disabled: !password}"
                    />
                  </v-card-actions>
                </v-card>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card class="mx-auto round-8" max-width="340" elevation="0">
                  <div
                    class="category-container px-6 py-3 round-top-8"
                    id="fab-new-card"
                  >
                    <v-card-title class="text-h4">One last thing</v-card-title>
                  </div>
                  <v-card-text class=""
                    >We just need your name and email.</v-card-text
                  >
                  <v-text-field
                    v-model="creatorName"
                    label="Your name"
                    outlined
                    required
                    maxLength="30"
                    :rules="[rules.name]"
                    :value="creatorName"
                    hint="It will only be visible by participants in this topic."
                    persistent-hint
                    class="mb-4 px-4"
                  ></v-text-field>
                  <v-text-field
                    outlined
                    required
                    v-model="creatorEmail"
                    label="Your email"
                    hint="You will receive infos about this topic only. We will never spam you. No worries."
                    persistent-hint
                    class="mb-4 px-4"
                    :rules="[rules.email]"
                  ></v-text-field>
                  <v-card-actions class="px-4 py-4">
                    <v-btn text color="gray" @click="creationStepper -= 1">
                      Back
                    </v-btn>
                    <SubmitButton
                      @done="submit"
                      v-bind="{label: 'Submit', disabled: !formValid}"
                    />
                  </v-card-actions>
                </v-card>
              </v-stepper-content>
              <v-stepper-content step="4">
                <MeetingCreatedShareModal v-bind="{showModal}" />
              </v-stepper-content>
            </v-form>
          </v-stepper-items>
        </v-stepper>
      </v-container>
    </v-row>
  </v-container>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component, Prop} from 'vue-property-decorator';
import {mapState} from 'vuex';
import {RULES} from '~/assets/constants';
import {TeamInterface} from '~/store/modules/team';

@Component({
  layout: 'simpleWithFooter',
  head() {
    return {title: 'New meeting'};
  },
  computed: mapState({
    team: (state: any) => state?.modules?.team,
  }),
})
export default class NewIndex extends Vue {
  @Prop() team!: TeamInterface;
  $notifier: any;
  $refs: any;
  $route: any;
  $initialLoad: any;
  formValid: boolean = false;
  creationStepper: number = 1;
  name: string = '';
  password: string = Math.floor(100000 + Math.random() * 900000).toString();
  show: boolean = true;
  creatorName: string = this.$store?.state?.modules?.profile?.name || '';
  creatorEmail: string = this.$store?.state?.modules?.profile?.email || '';
  creatorPhoneNumber: string = '';
  showModal: boolean = false;
  rules = {...RULES};
  window = {
    width: 0,
  };

  async mounted() {
    await this.$initialLoad();
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  }

  async submit() {
    // Check that the form is valid then store dispatch
    if (this.$refs.form.validate()) {
      const newMeeting = {
        name: this.name,
        password: this.password,
        creatorName: this.creatorName,
        creatorEmail: this.creatorEmail,
        creatorPhoneNumber: this.creatorPhoneNumber,
      };
      if (this?.$route?.query?.relTeam === '1') {
        Object.assign(newMeeting, {team: this.team});
      }
      const success = await this.$store.dispatch(
        'modules/meeting/create',
        newMeeting,
      );
      if (success) {
        this.creationStepper += 1;
        this.showModal = true;
        this.$store.dispatch('modules/cards/resetCards');
      } else {
        this.$notifier.showMessage({
          content: 'Topic creation failed. Try again.',
          color: 'error',
        });
      }
    }
  }

  handleResize() {
    this.window.width = window.innerWidth;
  }
}
</script>

<style scoped>
.card {
  border-color: var(--v-cardBorder-base);
}
.round-8 {
  border-radius: 9px;
}
.text-h4 {
  line-height: 1.3rem !important;
}
.text-small {
  font-size: 0.75rem;
}
.word-break {
  word-break: normal;
}
</style>
