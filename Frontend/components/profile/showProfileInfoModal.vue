<template>
  <v-dialog value="true" max-width="340px" persistent>
    <v-card class="rounded-lg mx-auto pt-6">
      <InitialsCircle
        :name="profile.name"
        width="120px"
        height="120px"
        fontSize="45px"
      />
      <div class="d-flex flex-column align-center">
        <v-card-title
          class="bold"
          style="
             {
              font-size: 1.5rem;
            }
          "
          >{{ profile.name }}</v-card-title
        >
        <v-card-subtitle
          class="pt-0"
          style="
             {
              font-size: 1rem;
            }
          "
        >
          <!-- <v-icon>{{ currentOrg.icon }}</v-icon> -->
          {{ currentOrg.name }}
        </v-card-subtitle>
      </div>

      <!-- Contact -->
      <!-- Teams -->
      <!-- <v-list-group no-action class="space-between">
        <template v-slot:activator>
          <v-list-item class="px-0">
            <v-card-subtitle>TEAMS</v-card-subtitle>
          </v-list-item>
        </template>
        <v-list class="px-2">
          <v-list-item
            v-for="team in currentOrg.teams.slice(0, 3)"
            :key="team.uuid"
          >
            <SquircleIcon
              v-bind="{
                name: team.name,
                width: '24px',
                height: '24px',
                fontSize: '9px',
              }"
              class="pl-6 mx-0"
            />
            <v-list-item-subtitle class="pl-7 py-1 semibold">{{
              team.name
            }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item v-if="currentOrg.teams.length > 3">
            <a @click="showAllTeams" class="px-6">{{
              `+${currentOrg.teams.length - 3} others...`
            }}</a>
          </v-list-item>
        </v-list>
      </v-list-group> -->
      <!-- Administration -->

      <v-card-actions class="pa-6 pt-0">
        <v-spacer></v-spacer>
        <template>
          <CancelButton @cancel="done" v-bind="{label: 'Done'}" />
        </template>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';
import {mapState} from 'vuex';

import {updateProfileDto} from '../../dto/profiles';

import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import {RULES} from '~/assets/constants';
import {ProfileInterface} from '~/store/modules/profile';

Vue.component('vue-phone-number-input', VuePhoneNumberInput);

const showProfileInfoModalProps = Vue.extend({
  props: {
    profile: {type: Object as () => ProfileInterface, required: true},
  },
  computed: mapState({
    currentOrg: (state: any) => state.modules.organisation,
  }),
});

@Component
export default class ShowProfileInfoModal extends mixins(
  showProfileInfoModalProps,
) {
  $notifier: any;
  $router: any;

  showAllTeams() {
    this.$router.push('/dashboard/teams');
  }

  async done() {
    this.$emit('closed');
  }
}
</script>

<style scoped>
.info-text {
  color: var(--v-darkGray-lighten3);
  font-size: 12px;
}
</style>
