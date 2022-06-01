<template>
  <v-container fluid>
    <v-row fluid grow style="justify-content: center">
      <v-col sm="12" md="6" :class="logoClass" style="min-height: 50vh">
        <OksaIconAndText class="black--text" width="18rem" />
      </v-col>
      <SignIn v-bind="{signIn: true}" style="max-width: 375px" />
    </v-row>
  </v-container>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';

@Component({
  layout: 'simple',
  head() {
    return {title: this.$setContent('SIGN_IN')};
  },
})
export default class Login extends Vue {
  $router: any;
  $initialLoad: any;
  logoClass: string = 'd-flex flex-column justify-left align-left px-13';
  window = {
    width: 0,
  };

  async mounted() {
    await this.$initialLoad();
    if (this.$store.state.modules.auth.loggedIn) {
      this.$router.push('/dashboard');
    }
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.window.width = window.innerWidth;
    if (this.window.width >= 960) {
      this.logoClass = 'd-flex flex-column justify-left align-left px-13';
    } else {
      this.logoClass = 'd-flex flex-column justify-center align-center';
    }
  }
}
</script>
