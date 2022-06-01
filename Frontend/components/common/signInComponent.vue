<template>
  <span>
    <SubmitButton
      v-if="!loggedIn"
      @done="signIn"
      v-bind="{label: $setContent('SIGN_IN')}"
      class="signInBtn elevation-3 py-2 px4"
      style="z-index: 10"
    />
    <v-row v-else class="mainDiv align-center">
      <NotificationIcon />
      <v-menu>
        <template v-slot:activator="{on, attrs}">
          <div v-bind="attrs" v-on="on" class="px-1">
            <InitialsCircle
              :name="name"
              width="40px"
              height="40px"
              cursor="pointer"
            />
          </div>
        </template>
        <v-card>
          <v-list dense flat>
            <v-list-item
              v-for="(item, i) in listItemsOne"
              :key="i"
              link
              @click="item.action"
            >
              <v-list-item-icon class="semibold">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="item.title" class="semibold" />
              <v-spacer v-if="i % 2 === 0"></v-spacer>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list dense flat>
            <v-list-item
              v-for="(item, i) in listItemsTwo"
              :key="i"
              link
              @click="item.action"
            >
              <v-list-item-icon class="semibold">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="item.title" class="semibold" />
              <v-spacer v-if="i % 2 === 0"></v-spacer>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list dense flat>
            <v-list-item
              v-for="(item, i) in listItemsThree"
              :key="i"
              link
              @click="item.action"
            >
              <v-list-item-icon class="semibold">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="item.title" class="semibold" />
              <v-spacer v-if="i % 2 === 0"></v-spacer>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-row>
  </span>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';
import {mapState} from 'vuex';
import {SIGN_OUT} from '../../store/mutationTypes';

@Component({
  computed: mapState({
    loggedIn: (state: any) => state.modules.auth.loggedIn,
    name: (state: any) => state.modules.profile.name,
  }),
})
export default class SignInComponent extends Vue {
  $router: any;
  listItemsOne = [
    {
      icon: 'mdi-view-dashboard',
      title: this.$setContent('DASHBOARD'),
      action: this.openDashboard,
    },
  ];
  listItemsTwo = [
    {
      icon: 'mdi-checkbox-marked-circle-outline',
      title: this.$setContent('MY_TASKS'),
      action: this.openTasks,
    },
    {
      icon: '$vuetify.icons.oksa-nofill',
      title: this.$setContent('MY_TOPICS'),
      action: this.openTopics,
    },
  ];
  listItemsThree = [
    // {icon: 'mdi-cog', title: this.$setContent('ACCOUNT_SETTINGS'), action: this.openSettings},
    {icon: 'mdi-logout', title: this.$setContent('SIGN_OUT'), action: this.signOut},
  ];
  window = {
    width: 0,
  };

  signIn() {
    this.$router.push('/signin');
  }

  openDashboard() {
    this.$router.push('/dashboard');
  }

  openTasks() {
    this.$router.push('/dashboard/tasks');
  }

  openTopics() {
    this.$router.push('/dashboard/topics');
  }

  openSettings() {
    this.$router.push('/dashboard/settings');
  }

  signOut() {
    Object.keys(this.$store.state.modules).forEach((key: string) =>
      this.$store.commit(`modules/${key}/${SIGN_OUT}`),
    );
    this.$router.push('/');
  }

  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.window.width = window.innerWidth;
  }
}
</script>

<style scoped>
.mainDiv {
  width: 100px;
  height: 40px;
  position: fixed;
  top: 32px;
  right: 16px;
  font-size: 16px;
  z-index: 10;
}
</style>
