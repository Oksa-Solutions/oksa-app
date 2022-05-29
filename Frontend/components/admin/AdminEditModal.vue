<template>
  <v-dialog value="true" max-width="600px" persistent>
    <v-card class="rounded-lg mx-auto pt-6">
      <v-row
        v-for="(item, i) in Object.keys(tabItem)"
        :key="i"
        class="mx-4"
      >
        <template
          v-if="!noShowFields.includes(item) && editableFields.includes(item)"
        >
          <v-col>
            {{ formatKeyString(item) }}
          </v-col>
          <v-col>
            <v-text-field
              v-model="tabItem[item]"
              :disabled="item === 'uuid'"
              :rules="[ruleKeys.includes(item) ? rules[item] : true]"
            />
          </v-col>
        </template>
      </v-row>

      <v-card-actions class="pa-6 pt-0">
        <v-menu
          v-if="isOrganisationsTab"
          offset-y
          transition="scale-transition"
          :close-on-content-click="false"
          min-width="300px"
        >
          <template v-slot:activator="{on, attrs}">
            <v-btn color="primary" v-bind="attrs" v-on="on"> Add admins </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="profile in profiles"
              :key="profile.uuid"
              @click="toggleAdmins(profile)"
            >
              {{ profile.email }}
              <v-icon
                v-if="admins.map((a) => a.uuid).includes(profile.uuid)"
                color="ok"
                class="justify-right"
              >
                mdi-check
              </v-icon>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-spacer />
        <CancelButton @cancel="cancel" v-bind="{label: 'Cancel'}" />
        <SubmitButton
          @done="isUsersTab ? resetTokens() : submit()"
          v-bind="{label: isUsersTab ? 'Reset tokens' : 'Save'}"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import {PROFILES, ORGANISATIONS, USERS, RULES} from '../../assets/constants';
import {ProfileInterface} from '../../store/modules/profile';

@Component({
  props: {
    tabType: {type: String, required: true},
    tabItem: {type: Object as () => any, required: true},
    profiles: {type: Object as () => ProfileInterface[], required: true},
  },
})
export default class AdminEditModal extends Vue {
  isUsersTab: boolean = false;
  isProfilesTab: boolean = false;
  isOrganisationsTab: boolean = false;
  noShowFields: string[] = ['authToken', 'refreshToken'];
  ruleKeys: string[] = ['name', 'email'];
  editableFields: string[] = [];
  admins: ProfileInterface[] = new Array<ProfileInterface>();
  rules = {...RULES};

  mounted() {
    switch (this.tabType) {
      case USERS:
        this.editableFields = ['uuid'];
        this.isUsersTab = true;
        break;
      case PROFILES:
        this.editableFields = ['name', 'email', 'phoneNumber'];
        this.isProfilesTab = true;
        break;
      case ORGANISATIONS:
        this.editableFields = ['name', 'contactPerson', 'contactEmail'];
        this.isOrganisationsTab = true;
        this.admins = [...this.tabItem.admins];
        break;
      default:
        break;
    }
  }

  formatKeyString(key: string) {
    return key
      .split(/(?=[A-Z])/)
      .map((s) => {
        if (s === 'uuid') {
          return 'UUID';
        }
        return s[0].toUpperCase() + s.slice(1).toLowerCase();
      })
      .join(' ');
  }

  toggleAdmins(admin: ProfileInterface) {
    const isSelected = this.admins
      .map((a: ProfileInterface) => a.uuid)
      .includes(admin.uuid);
    this.admins = this.admins.filter(
      (a: ProfileInterface) => a.uuid !== admin.uuid,
    );
    if (!isSelected) {
      this.admins.push(admin);
    }
  }

  resetTokens() {
    console.log('Reset tokens');
  }

  cancel() {
    this.$emit('closed');
  }

  async submit() {
    this.editableFields.push('uuid', 'admins');
    Object.keys(this.tabItem).forEach((key: string) => {
      if (!this.editableFields.includes(key)) {
        delete this.tabItem[key];
      }
    });
    switch (this.tabType) {
      case USERS:
        console.log(this.tabItem);
        break;
      case PROFILES:
        console.log(this.tabItem);
        break;
      case ORGANISATIONS:
        this.tabItem.admins = this.admins;
        this.$store.dispatch(
          'modules/organisation/updateOrganisation',
          this.tabItem,
        );
        break;
      default:
        break;
    }
    this.$emit('closed');
  }
}
</script>
