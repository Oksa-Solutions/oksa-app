<template>
  <v-card class="elevation-3 rounded-lg">
    <AddTeamMemberModal
      v-if="showAddTeamMemberModal"
      @closed="closeAddTeamMemberModal"
      v-bind="{team}"
    />
    <ShowProfileInfoModal
      v-if="showProfileModal"
      @closed="closeShowProfileModal"
      v-bind="{profile: showProfileInfo}"
    />
    <DeleteConfirmationModal
      v-if="showDeleteModal"
      v-bind="{
        content: `${$setContent('ABOUT_TO_DELETE')} ${deletableMembers.length} ${$setContent('FROM_TEAM')}.`,
      }"
      @delete="confirmDelete"
    />

    <v-row class="px-6 my-0 py-0" align="center" justify="space-between">
      <v-card-title class="bold"> {{ $setContent('TEAM_MEMBERS') }} </v-card-title>
      <v-row class="px-6 justify-end">
        <v-text-field
          append-icon="mdi-magnify"
          :value="searchText"
          @input="(searchText) => submitSearchText(searchText)"
          @click:clear="submitSearchText('')"
          cols="1"
          hide-details
          single-line
          flat
          solo
          clearable
          class="mb-0 shrink"
        />
        <v-icon v-if="userIsAdmin" class="px-2" @click="addTeamMember"
          >mdi-account-plus</v-icon
        >
        <v-icon class="px-2" @click="toggleView">{{
          showList ? 'mdi-format-list-bulleted-square' : 'mdi-view-grid'
        }}</v-icon>
        <v-icon v-if="userIsAdmin" class="px-2" @click="deleteMembers"
          >mdi-delete</v-icon
        >
      </v-row>
    </v-row>

    <v-divider />

    <v-data-table
      v-if="showList"
      v-model="deletableMembers"
      item-key="uuid"
      :headers="tableHeaders"
      :items="
        users.map((u) => {
          return {...u, isAdmin: admins.map((a) => a.uuid).includes(u.uuid)};
        })
      "
      :items-per-page="showAll ? -1 : 5"
      :footer-props="{itemsPerPageText:$setContent('ROWS_PER_PAGE')}"
      :no-data-text="$setContent('NO_TEAM_MEMBERS_FOUND')"
      :no-results-text="$setContent('NO_TEAM_RESULTS')"
      :show-select="userIsAdmin"
      :loading="loading"
      :search="searchText"
      @click:row="(item) => showProfile(item)"
    >
      <template v-slot:footer.page-text="items">
        {{items.pageStart}} - {{ items.pageStop }} / {{ items.itemsLength }}
      </template>
      <template v-slot:item.name="{item}">
        <i v-if="item.name === 'default'">{{
          item.email + ' (' + $setContent('INVITATION_PENDING') + ')'
        }}</i>
        <span v-else>{{ item.name }}</span>
      </template>
      <template v-slot:item.isAdmin="{item}">
        <v-switch
          v-model="item.isAdmin"
          :value="item.isAdmin"
          :disabled="!userIsAdmin"
          @change="toggleAdmin(item)"
          @click.native.stop
          inset
          :id="item.uuid"
        />
      </template>
      <!-- <template v-slot:item.editIcon="{ item }">
        <v-icon :disabled="!userIsAdmin"
          @click="editUser(item)"
        >
          mdi-pencil
        </v-icon>
      </template> -->
    </v-data-table>
    <v-container fluid v-else>
      <v-row
        v-masonry
        origin-left="true"
        horizontal-order="true"
        transition-duration="0.3s"
        item-selector=".item"
        stagger="0.03s"
        class="pb-16"
      >
        <v-col
          v-masonry-tile
          class="item px-2 py-2"
          v-for="user in users.map((u) => {
            return {
              ...u,
              isAdmin: admins.map((a) => a.uuid).includes(u.uuid),
            };
          })"
          :key="user.uuid"
          :cols="mcols"
        >
          <v-card @click="showProfile(user)">
            <v-card-title class="bold">
              {{ user.name }}
            </v-card-title>
            <v-switch
              v-model="user.isAdmin"
              label="Admin"
              @change="toggleAdmin(user)"
              @click.native.stop
              :disabled="!userIsAdmin"
              inset
              :id="user.uuid"
              class="px-6"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-divider />

    <div
      v-if="userIsAdmin"
      class="d-flex flex-row px-6 pointer-cursor"
      @click="addTeamMember"
    >
      <v-icon class="">mdi-account-plus</v-icon>
      <v-card-title class="bold">{{ $setContent('ADD_TEAM_MEMBER') }}</v-card-title>
    </div>
  </v-card>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component, Prop} from 'vue-property-decorator';

import {OrganisationInterface} from '~/store/modules/organisation';
import {ProfileInterface} from '~/store/modules/profile';
import {TeamInterface} from '~/store/modules/team';

@Component({
  props: {
    team: {type: Object as () => TeamInterface, required: true},
    admins: {type: Array as () => ProfileInterface[], required: true},
    users: {type: Array as () => ProfileInterface[], required: true},
    profile: {type: Object as () => ProfileInterface, required: true},
    currentOrg: {type: Object as () => OrganisationInterface, required: true},
    userIsAdmin: {type: Boolean, required: true},
    mcols: {type: Number, required: true},
    loading: {type: Boolean, required: true},
    showAll: {type: Boolean, default: false},
  },
})
export default class TeamMemberListing extends Vue {
  @Prop() team!: TeamInterface;
  @Prop() admins!: ProfileInterface[];
  @Prop() users!: ProfileInterface[];
  @Prop() profile!: ProfileInterface;
  @Prop() currentOrg!: OrganisationInterface;
  @Prop() userIsAdmin!: Boolean;
  @Prop() mcols!: number;
  @Prop() loading!: Boolean;
  @Prop() showAll!: Boolean;
  $initialLoad: any;
  $notifier: any;
  $store: any;
  showAddTeamMemberModal: boolean = false;
  showProfileModal: boolean = false;
  showDeleteModal: boolean = false;
  showList: boolean = true;
  deletableMembers: ProfileInterface[] = [];

  searchText: string = '';
  showProfileInfo: ProfileInterface | null = null;

  tableHeaders = [
    {text: this.$setContent('NAME'), sortable: true, value: 'name'},
    {text: this.$setContent('ADMIN'), sortable: true, value: 'isAdmin', width: '150px'},
    // {text: 'Edit', sortable: false, value: 'editIcon', width: '100px'},
  ];

  addTeamMember() {
    this.showAddTeamMemberModal = true;
  }

  closeAddTeamMemberModal() {
    this.showAddTeamMemberModal = false;
  }

  async confirmDelete(del: boolean) {
    if (del) {
      const success = await this.$store.dispatch(
        'modules/team/removeTeamMembers',
        {
          uuid: this.team.uuid,
          name: this.team.name,
          organisation: this.currentOrg,
          users: this.deletableMembers,
        },
      );
      this.$notifier.showMessage({
        content: this.$setContent(success
          ? 'MEMBERS_REMOVED'
          : 'MEMBER_REMOVE_FAILED'),
        color: success ? 'success' : 'error',
      });
      this.deletableMembers = [];
    }
    this.showDeleteModal = false;
  }

  async deleteMembers() {
    if (this.deletableMembers.length < 1) {
      this.$notifier.showMessage({
        content: this.$setContent('SELECT_DEL_MEMBER'),
        color: 'warning',
      });
    } else {
      this.showDeleteModal = true;
    }
  }

  showProfile(profile: ProfileInterface) {
    this.showProfileModal = true;
    this.showProfileInfo = profile;
  }

  closeShowProfileModal() {
    this.showProfileModal = false;
    this.showProfileInfo = null;
  }

  submitSearchText(s: string) {
    this.searchText = s || '';
  }

  async toggleAdmin(profile: ProfileInterface & {isAdmin: boolean}) {
    let admins = [...this.admins];
    if (profile.isAdmin) {
      admins.push(profile);
    } else {
      admins = admins.filter((a: ProfileInterface) => a.uuid !== profile.uuid);
    }
    const success = await this.$store.dispatch('modules/team/updateTeam', {
      uuid: this.team.uuid,
      organisation: this.currentOrg,
      admins,
    });
    this.$notifier.showMessage({
      content: this.$setContent(success
        ? 'UPDATE_ADMINS'
        : 'UPDATE_ADMINS_FAILED'),
      color: success ? 'success' : 'error',
    });
    if (!success) {
      await this.$store.dispatch('modules/team/readTeam', {
        uuid: this.team.uuid,
      });
    }
  }

  toggleView() {
    this.showList = !this.showList;
  }
}
</script>
