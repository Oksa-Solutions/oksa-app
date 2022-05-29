<template>
  <v-row class="px-6" align="center">
    <v-col sm="1">
      <SquircleIcon v-bind="{name: team.name, width: '40px', height: '40px'}" />
    </v-col>
    <v-col sm="8">
      <v-card-title class="bold">
        {{ team.name }}
      </v-card-title>
    </v-col>
    <v-col sm="2">
      {{ getRole() }}
    </v-col>
    <v-col sm="1" v-if="getRole() !== COLLABORATOR" style="visibility: hidden">
      <v-menu
        offset-y
        transition="scale-transition"
        :close-on-content-click="false"
        min-width="300px"
      >
        <template v-slot:activator="{on, attrs}">
          <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, i) in settings"
            :key="i"
            @click="item.click"
          >
            {{ item.title }}
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component, Prop} from 'vue-property-decorator';
import {mapState} from 'vuex';
import {ProfileInterface} from '~/store/modules/profile';

import {TeamInterface} from '~/store/modules/team';

@Component({
  props: {
    team: {type: Object as () => TeamInterface, required: true},
  },
  computed: mapState({
    profile: (state: any) => state.modules.profile,
    isOrgAdmin: (state: any) =>
      state.modules.organisation.admins
        .map((a: ProfileInterface) => a.uuid)
        .includes(state.modules.profile.uuid),
  }),
})
export default class TeamItem extends Vue {
  @Prop() team!: TeamInterface
  @Prop() profile!: ProfileInterface
  @Prop() isOrgAdmin!: Boolean
  settings = [];
  // settings = [
  //   {icon: '', title: 'Testi', click: () => {console.log('Hello')}},
  // ];
  COLLABORATOR = 'Collaborator';
  ORG_ADMIN = 'Organisation admin';
  TEAM_ADMIN = 'Admin';

  async mounted() {
    // TODO: Fetch all organisation teams with the admins information
  }

  isAdmin() {
    return (
      this.profile.teams
        .find((t: TeamInterface) => t.uuid === this.team.uuid)
        ?.admins?.map((a: ProfileInterface) => a.uuid)
        ?.includes(this.profile.uuid) || false
    );
  }

  getRole() {
    if (
      this.isOrgAdmin &&
      !this.profile.teams
        .find((t: TeamInterface) => t.uuid === this.team.uuid)
        ?.users?.map((u: ProfileInterface) => u.uuid)
        ?.includes(this.profile.uuid)
    ) {
      return this.ORG_ADMIN;
    } else {
      return this.isAdmin() ? this.TEAM_ADMIN : this.COLLABORATOR;
    }
  }
}
</script>
