<template>
  <span>
    <SubmitButton
      v-if="!loggedIn"
      @done="signIn"
      v-bind="{label: 'Sign in'}"
      class="signInBtn elevation-3 py-2 px4"
      style="z-index: 10"
    />
    <v-row v-else class="mainDiv align-center">
      <NotificationIcon />
      <v-menu>
        <template v-slot:activator="{on, attrs}">
          <div v-bind="attrs" v-on="on" class="px-1 pointer-cursor">
            <InitialsCircle :name="name" width="40px" height="40px" />
          </div>
        </template>
        <v-list dense flat>
          <v-list-item
            v-for="(item, i) in listItems"
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
      </v-menu>
    </v-row>
  </span>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';
import {mapState} from 'vuex';
import {SIGN_OUT} from '../../store/mutationTypes';

const signInProps = Vue.extend({
  computed: mapState({
    loggedIn: (state: any) => state.modules.auth.loggedIn,
    name: (state: any) => state.modules.profile.name,
  }),
});

@Component
export default class SignInComponent extends mixins(signInProps) {
  $router: any;
  listItems = [
    {icon: 'mdi-check-circle', title: 'Profile', action: this.openProfile},
    {icon: 'mdi-clock', title: 'My topics', action: this.openTopics},
    // {icon: 'mdi-cog', title: 'Account settings', action: this.openSettings},
    {icon: 'mdi-logout', title: 'Sign out', action: this.signOut},
  ];
  window = {
    width: 0,
  };

  signIn() {
    this.$router.push('/signin');
  }

  openProfile() {
    this.$router.push('/dashboard');
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
  top: 24px;
  right: 16px;
  font-size: 16px;
  z-index: 10;
}
</style>
