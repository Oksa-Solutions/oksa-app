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
          <v-list-item-title v-text="item.title" class="semibold" />
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component';
import {Component, Prop, Vue} from 'vue-property-decorator';
import {APPROVED, ARCHIVED, WAITING} from '../../assets/constants';
const StatusListingProps = Vue.extend({});

@Component
export default class StatusListing extends mixins(StatusListingProps) {
  $notifier: any;
  status = [
    {
      icon: 'mdi-checkbox-marked-circle',
      color: 'ok',
      title: APPROVED,
      to: '/',
    },
    {
      icon: 'mdi-clock-outline',
      color: 'wait',
      title: WAITING,
      to: '/',
    },
    {
      icon: 'mdi-archive-arrow-down',
      color: 'archived',
      title: ARCHIVED,
      to: '/',
    },
  ];

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
