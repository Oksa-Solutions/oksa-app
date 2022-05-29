<template>
  <v-app Dark>
    <SignInComponent v-if="this.$route.path !== '/signin'" />
    <FssHome />
    <v-main class="align-center">
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
    <Snackbar />
  </v-app>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';

@Component({})
export default class Simple extends Vue {}
</script>

<style scoped></style>
