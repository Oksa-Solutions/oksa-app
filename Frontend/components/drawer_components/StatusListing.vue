<template>
  <v-list dense flat>
    <v-list-item-group>
      <v-list-item
        v-for="(item, i) in status"
        :key="i"
        :style="{background: activeStatusColor(item.title)}"
        router
        exact
        @click="filterStatus(item.title)"
      >
        <v-list-item-action>
          <v-icon :color="item.color">{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="setStatus(item.title)" class="semibold" />
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';
import {APPROVED, ARCHIVED, WAITING} from '../../assets/constants';

@Component({})
export default class StatusListing extends Vue {
  $notifier: any;
  status = [
    {
      icon: 'mdi-checkbox-marked-circle',
      color: 'ok',
      title: APPROVED,
    },
    {
      icon: 'mdi-clock-outline',
      color: 'wait',
      title: WAITING,
    },
    {
      icon: 'mdi-archive-arrow-down',
      color: 'archived',
      title: ARCHIVED,
    },
  ];

  setStatus(status: string) {
    switch (status) {
      case APPROVED:
        return this.$setContent('APPROVED');
      case WAITING:
        return this.$setContent('WAITING');
      case ARCHIVED:
        return this.$setContent('ARCHIVED');
      default:
        return '';
    }
  }

  activeStatusColor(status: string) {
    return this.$store.state.modules.filters.filteredStatus.includes(status)
      ? '#e9e9e9'
      : '';
  }

  filterStatus(status: string) {
    this.$store.dispatch('modules/filters/modifyStatusFilters', status);
  }
}
</script>
