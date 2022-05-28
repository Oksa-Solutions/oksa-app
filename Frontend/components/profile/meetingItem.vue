<template>
  <v-row class="d-flex align-center px-4">
    <v-col sm="1" class="d-flex justify-center align-center">
      <div class="rounded-circle pa-2 g-oksa-yellow">
        <v-icon>$vuetify.icons.oksa-mini</v-icon>
      </div>
    </v-col>
    <v-col sm="8">
      <!-- <v-row> -->
      <v-card-title class="" style="font-weight: 600 !important">
        {{ name }}
      </v-card-title>
      <!-- <v-icon>mdi-lock</v-icon> -->
      <!-- </v-row> -->
      <v-card-subtitle>
        {{ id }}
      </v-card-subtitle>
    </v-col>
    <v-col sm="2" class="d-flex justify-center">
      <v-card-subtitle class="semibold">
        {{ status === 'closed' ? getTitleCasing(status) : '' }}
      </v-card-subtitle>
    </v-col>
    <v-col sm="1" class="d-flex justify-center">
      <v-menu top>
        <template v-slot:activator="{on, attrs}">
          <v-btn
            text
            icon
            color="gray"
            v-bind="attrs"
            v-on="on"
            disabled
            style="visibility: hidden"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link @click="openEditModal" disabled>
            <v-list-item-icon><v-icon>mdi-pencil</v-icon></v-list-item-icon>
            <v-list-item-title>Edit topic</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="deleteTopic" disabled>
            <v-list-item-icon
              ><v-icon color="">mdi-delete</v-icon></v-list-item-icon
            >
            <v-list-item-title :style="{color: ''}"
              >Delete topic</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';

interface Topic {
  uuid: string;
  name: string;
  id: string;
  status: string;
}

const meetingItemProps = Vue.extend({
  props: {
    uuid: {type: String, required: true},
    name: {type: String, required: true},
    id: {type: String, required: true},
    status: {type: String, required: true},
  },
});

@Component
export default class MeetingItem extends mixins(meetingItemProps) {
  getTitleCasing(str: string) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  }

  openEditModal() {
    console.log('Edit topic');
  }

  deleteTopic() {
    console.log('Delete topic');
  }
}
</script>

<style scoped>
.g-oksa-yellow {
  background: linear-gradient(
    135deg,
    var(--v-secondary-base) 0%,
    var(--v-carrot-base) 100%
  ) !important;
}
</style>
