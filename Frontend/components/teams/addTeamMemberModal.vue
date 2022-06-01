<template>
  <v-dialog value="true" max-width="340px" persistent>
    <v-card
      class="d-flex flex-column rounded-lg mx-auto pt-6"
      max-width="340px"
      min-height="500px"
    >
      <div class="d-flex flex-row mx-6">
        <v-icon color="black">mdi-account-plus</v-icon>
        <v-card-title class="bold">{{ $setContent('INVITE_COLLAB') }}</v-card-title>
      </div>

      <v-card
        class="d-flex flex-row align-center elevation-0 rounded-lg py-2 mx-6"
        color="rgba(0,0,0,0.04)"
      >
        <SquircleIcon
          v-bind="{name: team.name, width: '40px', height: '40px'}"
          class="pl-6 mx-0"
        />
        <v-col sm="9" class="d-flex flex-column pa-0">
          <v-card-title class="card-title py-2 mx-0 semibold">{{
            team.name
          }}</v-card-title>
          <v-card-subtitle class="card-subtitle py-2 mx-0">{{
            team.organisation.name
          }}</v-card-subtitle>
        </v-col>
      </v-card>

      <v-card-title class="bold">{{ $setContent('BY_EMAIL_OR_NAME') }}</v-card-title>

      <v-card-text>{{ $setContent('ADD_AN_EMAIL') }}</v-card-text>

      <v-autocomplete
        v-model="selectedProfiles"
        :label="$setContent('BY_EMAIL_OR_NAME')"
        class="px-6 pt-0 pb-4 flex-grow-1 flex-shrink-0"
        item-text="name"
        item-value="email"
        :items="profiles.filter((p) => !existingUsers.includes(p.uuid))"
        :filter="filterProfiles"
        color="primary"
        :search-input.sync="searchText"
        @keyup.enter="submitNewEmail"
        :allow-overflow="false"
        solo
        single-line
        hide-no-data
        hide-details
        hide-selected
        return-object
        multiple
      >
        <template v-slot:item="{item}">
          {{ item.name === 'default' ? item.email : item.name }}
        </template>
        <template v-slot:selection=""></template>
        <template v-slot:append><v-icon>mdi-magnify</v-icon></template>
      </v-autocomplete>

      <v-card
        class="
          d-flex
          flex-row
          align-center
          elevation-0
          rounded-lg
          py-2
          my-1
          mx-6
        "
        color="rgba(0,0,0,0.04)"
        v-for="user in selectedProfiles"
        :key="user.uuid"
      >
        <InitialsCircle
          v-bind="{name: user.name, width: '40px', height: '40px'}"
        />
        <v-col sm="8" class="d-flex flex-column pa-0">
          <v-card-title class="card-title py-2 mx-0 semibold">{{
            user.name.length > 15 ? user.name.slice(0, 15) + '...' : user.name
          }}</v-card-title>
          <v-card-subtitle
            v-if="!user.name.includes('@')"
            class="card-subtitle py-2 mx-0"
            >{{ currentOrg.name }}</v-card-subtitle
          >
        </v-col>
        <v-btn icon @click="removeFromSelected(user)">
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>
      </v-card>

      <v-card-actions>
        <v-spacer />
        <CancelButton @cancel="cancel" v-bind="{label: $setContent('CANCEL')}" />
        <SubmitButton
          @done="submit"
          v-bind="{label: $setContent('SEND'), disabled: selectedProfiles.length < 1}"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component, Prop} from 'vue-property-decorator';
import {mapState} from 'vuex';
import {OrganisationInterface} from '~/store/modules/organisation';
import {ProfileInterface} from '~/store/modules/profile';

import {TeamInterface} from '~/store/modules/team';

@Component({
  props: {
    team: {type: Object as () => TeamInterface, required: true},
  },
  computed: mapState({
    currentOrg: (state: any) => state.modules.organisation,
  }),
})
export default class AddTeamMemberModal extends Vue {
  @Prop() team!: TeamInterface;
  @Prop() currentOrg!: OrganisationInterface;
  $notifier: any;
  profiles: ProfileInterface[] = new Array<ProfileInterface>();
  existingUsers: string[] = new Array<string>();
  selectedProfiles: Partial<ProfileInterface>[] = [];
  searchText: string = '';

  async mounted() {
    try {
      this.profiles = (
        await this.$axios.get('/organisation/profiles', {
          params: {uuid: this.currentOrg.uuid},
        })
      ).data;
      this.existingUsers = this.team.users.map((u: ProfileInterface) => u.uuid);
    } catch (err) {
      this.$notifier.showMessage({
        content: this.$setContent('FAILED_TO_GET_ORG_MEMBERS'),
        color: 'error',
      });
    }
  }

  filterProfiles(item: ProfileInterface, queryText: string, itemText: string) {
    return (
      !this.existingUsers.includes(item.uuid) &&
      (item.name.toLowerCase().indexOf(queryText.toLowerCase()) > -1 ||
        item.email.toLowerCase().indexOf(queryText.toLowerCase()) > -1)
    );
  }

  submitNewEmail() {
    if (
      this.selectedProfiles.findIndex(
        (p: Partial<ProfileInterface>) =>
          p.name === this.searchText || p.email === this.searchText,
      ) === -1 &&
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
        this.searchText,
      )
    ) {
      this.selectedProfiles.push({
        uuid: this.searchText,
        name: this.searchText,
        email: this.searchText,
      });
    }
    this.searchText = '';
  }

  removeFromSelected(item: ProfileInterface) {
    this.selectedProfiles = this.selectedProfiles.filter(
      (p: Partial<ProfileInterface>) => p.uuid !== item.uuid,
    );
  }

  async submit() {
    const newUsers: Partial<ProfileInterface>[] = [...this.team.users];
    for (const i in this.selectedProfiles) {
      if (
        newUsers.findIndex(
          (x: Partial<ProfileInterface>) =>
            x.uuid === this.selectedProfiles[i].uuid,
        ) === -1
      ) {
        newUsers.push(this.selectedProfiles[i]);
      }
    }
    // TODO: Update users in a team
    const success = await this.$store.dispatch('modules/team/addTeamMembers', {
      uuid: this.team.uuid,
      name: this.team.name,
      organisation: this.currentOrg,
      users: newUsers,
    });
    this.$notifier.showMessage({
      content: success
        ? this.$setContent('COLLABS_INVITED')
        : this.$setContent('COLLAB_INVITE_FAILED'),
      color: success ? 'success' : 'error',
    });
    if (success) {
      this.cancel();
    }
  }

  cancel() {
    this.$emit('closed');
  }
}
</script>

<style scoped>
card-title {
  width: 100px;
  font-size: 2em;
}
card-subtitle {
  font-size: 1em;
}
</style>
