<template>
  <v-col class="d-flex justify-center pa-0">
    <div
      class="d-flex justify-center align-center rounded-circle pa-2 bold"
      :style="{
        width,
        height,
        fontSize,
        background: `linear-gradient(115deg, ${background.start} 0%, ${background.end} 100%)`,
      }"
    >
      {{ getInitials(name) }}
    </div>
  </v-col>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';
import {mapState} from 'vuex';

const initialsCircleProps = Vue.extend({
  props: {
    name: {type: String, required: true},
    width: {type: String, required: false, default: '36px'},
    height: {type: String, required: false, default: '36px'},
    fontSize: {type: String, required: false},
  },
  computed: mapState({
    background: (state: any) => state.modules.profile.settings.background,
  }),
});

@Component
export default class InitialsCircle extends mixins(initialsCircleProps) {
  getInitials(name: string) {
    if (!name || name === 'default') return '';
    if (/@/.test(name)) return '?';
    const [firstname, lastname] = name.split(' ');
    if (!!firstname && firstname.length > 2) {
      if (lastname) {
        return (firstname[0] + lastname[0]).toUpperCase();
      } else {
        return firstname[0].toUpperCase();
      }
    }
    return !!firstname
      ? firstname[0].toUpperCase() + firstname[1].toLowerCase()
      : '';
  }
}
</script>
