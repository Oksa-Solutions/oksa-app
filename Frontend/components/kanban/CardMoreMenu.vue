<template>
  <v-list>
    <v-list-item
      v-for="(item, i) in actionItemListing"
      :key="i"
      dense
      link
      @click="item.action"
    >
      <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-title>{{ item.title }}</v-list-item-title>
    </v-list-item>

    <v-divider />

    <v-list-item
      v-for="(item, j) in itemListing"
      :key="j + actionItemListing.length"
      dense
      link
      @click="item.action"
    >
      <v-list-item-icon>
        <v-icon :color="item.title === 'Delete' ? 'red' : ''">{{
          item.icon
        }}</v-icon>
      </v-list-item-icon>
      <v-list-item-title
        :style="item.title === 'Delete' ? {color: 'red'} : {}"
        >{{ item.title }}</v-list-item-title
      >
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';

@Component({})
export default class CardMoreMenu extends Vue {
  actionItemListing = [
    {
      title: 'Move up',
      icon: 'mdi-arrow-up',
      action: () => this.moveItem(true),
    },
    {
      title: 'Move down',
      icon: 'mdi-arrow-down',
      action: () => this.moveItem(false),
    },
    {
      title: 'Move to list',
      icon: 'mdi-folder-move',
      action: this.moveFolder,
    },
  ];

  itemListing = [
    {
      title: 'Share',
      icon: 'mdi-share',
      action: this.shareCard,
    },
    {
      title: 'Edit',
      icon: 'mdi-pencil',
      action: this.editCard,
    },
    {
      title: 'Delete',
      icon: 'mdi-delete',
      action: this.deleteCard,
    },
  ];

  moveItem(moveUp: boolean) {
    if (moveUp) {
      console.log('Move up');
    } else {
      console.log('Move down');
    }
  }

  moveFolder() {
    console.log('Move folder');
  }

  shareCard() {
    console.log('Share card');
  }

  editCard() {
    console.log('Edit card');
  }

  deleteCard() {
    console.log('Delete card');
  }
}
</script>
