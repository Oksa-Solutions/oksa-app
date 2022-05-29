<template>
  <v-card class="rounded-lg">
    <v-card-title class="headline pb-6">
      <v-avatar size="40" color="secondary" class="mr-4">
        <span style="padding: 6px; width: 100%; height: 100%">
          <v-icon class="realBlack--text"> $vuetify.icons.oksa </v-icon>
        </span>
      </v-avatar>
      <h4 class="text-h4 realBlack--text">Oksa App</h4>
    </v-card-title>

    <v-card-text>
      <p>© Oksa Solutions Oy, {{ new Date().getFullYear() }}</p>
      <h5 class="text-h5 realBlack--text">Legal statements</h5>
      <p>
        Any lengthy but needed legal statement goes here, about intellectual
        property, use of service, etc... And if you want to check it out, head
        to our
        <a
          href="https://www.oksa.io/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          >privacy policy</a
        >
        page
      </p>
      <h5 class="text-h5 realBlack--text">Design</h5>
      <p>
        <a href="http://jorisdemange.fr" class="text-decoration-none">
          <v-icon class="mr-2 realBlack--text">mdi-link</v-icon>Joris Demange
        </a>
      </p>
      <h5 class="text-h5 realBlack--text">Development</h5>
      <p>
        <a href="https://linkedin.com/in/jrautava" class="text-decoration-none">
          <v-icon class="mr-2 realBlack--text">mdi-link</v-icon>Jore Rautava
        </a>
        <br />
        <a href="http://jorisdemange.fr" class="text-decoration-none">
          <v-icon class="mr-2 realBlack--text">mdi-link</v-icon>Joris Demange
        </a>
      </p>
      <h5 class="text-h5 realBlack--text">Other</h5>
      <p>
        <v-icon class="mr-2 realBlack--text">mdi-link</v-icon>Flat Surface
        Shader by
        <a href="https://twitter.com/wagerfield" class="text-decoration-none"
          >Matthew Wagerfield
        </a>
      </p>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <CancelButton @cancel="closeModal" v-bind="{label: 'Done'}" />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';

@Component({})
export default class CreditsModal extends Vue {
  closeModal() {
    this.$emit('clicked');
  }
}
</script>

<style scoped></style>
