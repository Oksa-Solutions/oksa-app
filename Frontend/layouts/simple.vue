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
import {mixins} from 'vue-class-component';
import {Component, Prop, Vue} from 'vue-property-decorator';
import {mapState} from 'vuex';

const SimpleProps = Vue.extend({});

@Component
export default class Simple extends mixins(SimpleProps) {}
</script>

<style scoped></style>
