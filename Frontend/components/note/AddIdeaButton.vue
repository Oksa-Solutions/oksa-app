<template>
  <v-btn
    elevation="9"
    color="primary"
    x-large
    :class="emptyMeeting ? 'fab-new-card' : 'fab-new-card fab-fixed'"
    @click="openModal"
    class="rounded-pill justify-center"
  >
    <v-icon left>$vuetify.icons.oksa-mini</v-icon>
    Add an idea
    <NoteEdit v-if="showEditModal" @closeModal="closeModal" />
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    emptyMeeting: {type: Boolean, required: false, default: false},
  },
})
export default class AddIdeaButton extends Vue {
  newCard: boolean = false;
  showEditModal: boolean = false;

  openModal() {
    this.newCard = true;
    this.showEditModal = true;
  }

  closeModal() {
    this.newCard = false;
    this.showEditModal = false;
  }
}
</script>

<style scoped>
.fab-new-card {
  text-transform: none;
  font-family: 'telegraf';
  font-weight: 600;
  background: linear-gradient(
    135deg,
    var(--v-jorisViolet-base) 0%,
    var(--v-darkBlue-base) 100%
  ) !important;
}
.fab-fixed {
  position: fixed;
  bottom: 32px;
  right: 32px;
}
</style>
