<template>
  <v-app Dark>
    <v-dialog :value="showSignInDialog" max-width="400px">
      <v-container fluid class="d-flex" style="background: white">
        <v-row class="d-flex justify-center align-center">
          <SignIn @login="logIn" />
        </v-row>
      </v-container>
    </v-dialog>
    <SignInComponent />
    <FssHome />
    <v-main class="align-center">
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy;{{ new Date().getFullYear() }} Oksa Solutions </span>
    </v-footer>
    <Snackbar />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class SimpleWithFooter extends Vue {
  fixed: boolean = false;
  showSignInDialog: boolean = false;

  signIn() {
    this.showSignInDialog = true;
  }
  logIn() {
    this.showSignInDialog = false;
  }
}
</script>

<style scoped></style>
