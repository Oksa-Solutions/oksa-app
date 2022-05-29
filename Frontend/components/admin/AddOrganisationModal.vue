<template>
  <v-dialog value="true" max-width="600px" persistent>
    <v-form v-model="valid" @submit.prevent="() => false">
      <v-card class="rounded-lg mx-auto pt-6">
        <v-card-title class="text-h4 pt-0"> Add organisation </v-card-title>
        <v-text-field
          v-model="orgName"
          label="Organisation name"
          outlined
          required
          :rules="[rules.name]"
          class="mx-6 mb-0"
        />

        <v-text-field
          v-model="orgContactPerson"
          label="Contact person name"
          outlined
          class="mx-6 mb-0"
        />

        <v-text-field
          v-model="orgContactEmail"
          label="Contact person email"
          :rules="[rules.email]"
          outlined
          required
          class="mx-6 mb-0"
        />

        <v-text-field
          v-model="orgDomain"
          label="Organisation's domain"
          :rules="[rules.domain]"
          outlined
          required
          class="mx-6 mb-0"
        />

        <v-autocomplete
          v-model="selectedProfiles"
          label="Add admin"
          class="px-6 pt-0 pb-4 flex-grow-1 flex-shrink-0"
          item-text="name"
          item-value="email"
          :items="profiles"
          :filter="filterProfiles"
          color="primary"
          :search-input.sync="searchText"
          @keyup.enter="submitNewEmail"
          :allow-overflow="false"
          outlined
          single-line
          hide-no-data
          hide-details
          hide-selected
          return-object
          multiple
        >
          <template v-slot:selection=""></template>
          <template v-slot:append><v-icon>mdi-magnify</v-icon></template>
        </v-autocomplete>

        <div class="mx-5">
          <v-chip
            v-for="user in selectedProfiles"
            :key="user.uuid"
            class="mx-1 my-1"
            close
            @click:close="removeFromSelected(user)"
          >
            {{ user.name }}
          </v-chip>
        </div>

        <v-card-actions class="pa-6 pt-0">
          <v-spacer></v-spacer>
          <template>
            <CancelButton @cancel="cancel" v-bind="{label: 'Cancel'}" />
            <SubmitButton
              @done="submit"
              v-bind="{
                label: 'Save',
                disabled: !(valid && selectedProfiles.length > 0),
              }"
            />
          </template>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {ProfileInterface} from '../../store/modules/profile';
import {RULES} from '~/assets/constants';

@Component({})
export default class AddOrganisation extends Vue {
  $notifier: any;
  $store: any;
  $axios: any;

  orgName: string = '';
  orgContactPerson: string = '';
  orgContactEmail: string = '';
  orgDomain: string = '';
  profiles: ProfileInterface[] = new Array<ProfileInterface>();
  selectedProfiles: Partial<ProfileInterface>[] = [];
  searchText: string = '';
  valid: boolean = false;
  rules = {...RULES};

  async mounted() {
    const resData = (await this.$axios.get('/admin/organisations')).data;
    this.profiles = resData.profiles;
  }

  filterProfiles(item: ProfileInterface, queryText: string, itemText: string) {
    return (
      item.name.toLowerCase().indexOf(queryText.toLowerCase()) > -1 ||
      item.email.toLowerCase().indexOf(queryText.toLowerCase()) > -1
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

  cancel() {
    this.$emit('closed');
  }

  async submit() {
    const newOrg = {
      name: this.orgName,
      contactPerson: this.orgContactPerson,
      contactEmail: this.orgContactEmail,
      admins: this.selectedProfiles,
      domain: this.orgDomain,
    };
    const success = await this.$store.dispatch(
      'modules/organisation/createOrganisation',
      newOrg,
    );

    this.$notifier.showMessage({
      content: success
        ? 'Added new organisation'
        : 'Adding organisation failed. Try again',
      color: success ? 'success' : 'error',
    });

    if (success) {
      this.cancel();
    }
  }
}
</script>
