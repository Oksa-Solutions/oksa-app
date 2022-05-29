<template>
  <v-dialog value="true" max-width="400px" persistent>
    <v-card>
      <v-card-title>Create a new team</v-card-title>
      <!-- Team name -->
      <v-text-field
        v-model="name"
        label="Name"
        outlined
        required
        maxLength="30"
        :rules="[rules.name]"
        :value="name"
        class="mx-6"
      />

      <!-- Team admins -->
      <v-menu
        offset-y
        transition="scale-transition"
        :close-on-content-click="false"
        min-width="300px"
      >
        <template v-slot:activator="{on, attrs}">
          <v-btn color="primary" v-bind="attrs" v-on="on" class="mx-6">
            Admins
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="profile in profiles"
            :key="profile.uuid"
            @click="toggleAdmins(profile)"
          >
            {{ profile.email }}
            <v-icon
              v-if="selectedAdmins.map((a) => a.uuid).includes(profile.uuid)"
              color="ok"
              class="justify-right"
            >
              mdi-check
            </v-icon>
          </v-list-item>
        </v-list>
      </v-menu>

      <div class="pa-2" />

      <!-- Team users -->
      <v-menu
        offset-y
        transition="scale-transition"
        :close-on-content-click="false"
        min-width="300px"
      >
        <template v-slot:activator="{on, attrs}">
          <v-btn color="primary" v-bind="attrs" v-on="on" class="mx-6">
            Users
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="profile in profiles"
            :key="profile.uuid"
            @click="toggleUsers(profile)"
          >
            {{ profile.email }}
            <v-icon
              v-if="selectedUsers.map((a) => a.uuid).includes(profile.uuid)"
              color="ok"
              class="justify-right"
            >
              mdi-check
            </v-icon>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-card-actions>
        <v-spacer />
        <CancelButton @cancel="cancel" v-bind="{label: 'Cancel'}" />
        <SubmitButton @done="submit" v-bind="{label: 'Submit'}" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component, Prop} from 'vue-property-decorator';
import {mapState} from 'vuex';

import {RULES} from '~/assets/constants';
import {OrganisationInterface} from '~/store/modules/organisation';
import {ProfileInterface} from '~/store/modules/profile';

@Component({
  computed: mapState({
    currentOrg: (state: any) => state.modules.organisation,
  }),
})
export default class CreateTeamModal extends Vue {
  @Prop() currentOrg!: OrganisationInterface;
  $axios: any;
  $emit: any;
  $notifier: any;
  name: string = '';
  phoneNumber: string = '';
  rules = {...RULES};
  profiles: ProfileInterface[] = new Array<ProfileInterface>();
  selectedAdmins: ProfileInterface[] = new Array<ProfileInterface>();
  selectedUsers: ProfileInterface[] = new Array<ProfileInterface>();

  async mounted() {
    try {
      this.profiles = (
        await this.$axios.get('/organisation/profiles', {
          params: {uuid: this.currentOrg.uuid},
        })
      ).data;
    } catch (err) {
      this.$notifier.showMessage({
        content:
          'Failed to get organisation members, check your Internet connection and try again.',
        color: 'error',
      });
    }
  }

  toggleAdmins(admin: ProfileInterface) {
    const isSelected = this.selectedAdmins
      .map((a: ProfileInterface) => a.uuid)
      .includes(admin.uuid);
    this.selectedAdmins = this.selectedAdmins.filter(
      (a: ProfileInterface) => a.uuid !== admin.uuid,
    );
    if (!isSelected) {
      this.selectedAdmins.push(admin);
      if (
        !this.selectedUsers
          .map((u: ProfileInterface) => u.uuid)
          .includes(admin.uuid)
      ) {
        // Automatically add admins as users too
        this.selectedUsers.push(admin);
      }
    }
  }

  toggleUsers(user: ProfileInterface) {
    const isSelected = this.selectedUsers
      .map((a: ProfileInterface) => a.uuid)
      .includes(user.uuid);
    this.selectedUsers = this.selectedUsers.filter(
      (a: ProfileInterface) => a.uuid !== user.uuid,
    );
    if (!isSelected) {
      this.selectedUsers.push(user);
    }
  }

  cancel() {
    this.$emit('closed');
  }

  async submit() {
    const success = await this.$store.dispatch('modules/profile/createTeam', {
      name: this.name,
      organisation: this.currentOrg,
      admins: this.selectedAdmins,
      users: this.selectedUsers,
    });

    this.$notifier.showMessage({
      content: success
        ? 'New team created!'
        : 'Creating team failed. Try again',
      color: success ? 'success' : 'error',
    });
    if (success) {
      this.cancel();
    }
  }
}
</script>
