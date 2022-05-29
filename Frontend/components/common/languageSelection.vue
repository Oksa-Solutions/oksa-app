<template>
  <v-menu offset-y transition="scale-transition">
    <template v-slot:activator="{on, attrs}">
      <div v-bind="attrs" v-on="on" class="elevation-0 px-2 rounded-lg">
        <Flag :code="lang" hasDropShadow />
      </div>
    </template>
    <v-list>
      <v-list-item
        v-for="(l, i) in availableLanguages"
        :key="i"
        @click="setLanguage(l)"
      >
        <Flag :code="l" :hasDropShadow="lang === l" />
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';
// import {Vue, Component} from 'vue-property-decorator';
import {mapState} from 'vuex';
import {LANGUAGES} from '~/assets/languages';
import {SET_LANG} from '~/store/mutationTypes';

@Component({
  computed: mapState({
    lang: (state: any) => state.modules.base.language,
  }),
})
export default class LanguageSelection extends Vue {
  availableLanguages = Object.keys(LANGUAGES) || [];

  setLanguage(newLang: string) {
    this.$store.commit(`modules/base/${SET_LANG}`, newLang);
  }
}
</script>
