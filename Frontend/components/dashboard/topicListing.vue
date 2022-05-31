<template>
  <v-card class="elevation-3 rounded-lg">
    <v-row class="px-6 my-0 py-0" align="center" justify="space-between">
      <v-card-title class="bold"> {{ $setContent('TOPICS') }} </v-card-title>
      <v-row class="px-6 justify-end">
        <v-text-field
          append-icon="mdi-magnify"
          :value="searchText"
          @input="(searchText) => submitSearchText(searchText)"
          @click:clear="submitSearchText('')"
          cols="1"
          hide-details
          single-line
          flat
          solo
          clearable
          class="mb-0 shrink"
        />
        <!-- <v-icon class="px-2">mdi-folder-key</v-icon> -->
        <!-- <v-icon class="px-2" @click="addNewTeam">mdi-folder-plus</v-icon> -->
      </v-row>
    </v-row>

    <v-divider />

    <v-data-table
      v-if="isTeamListing"
      item-key="uuid"
      :headers="tableHeaders"
      :items="
        topics.map((t) => {
          return {...t, isActive: t.status.toLowerCase() === 'active'};
        })
      "
      :items-per-page="15"
      :footer-props="{itemsPerPageText:$setContent('ROWS_PER_PAGE')}"
      :no-data-text="$setContent('NO_TOPICS_FOUND')"
      :no-results-text="$setContent('NO_TOPICS_RESULTS')"
      :loading="loading"
      :search="searchText"
      @click:row="(item) => moveToTopic(item)"
    >
      <template v-slot:footer.page-text="items">
        {{items.pageStart}} - {{ items.pageStop }} / {{ items.itemsLength }}
      </template>
      <template v-slot:item.name="{item}">
        <MeetingItem
          v-bind="{
            uuid: item.uuid,
            name: item.name,
            id: item.id,
            status: item.status,
          }"
        />
      </template>
      <template v-slot:item.status="{item}">
        <v-switch
          v-model="item.isActive"
          :value="item.isActive"
          @change="toggleStatus(item)"
          @click.native.stop
          :id="item.uuid"
        />
      </template>
    </v-data-table>
    <v-data-table
      v-else
      item-key="uuid"
      :headers="tableHeaders"
      :items="
        topics.map((t) => {
          return {...t, isActive: t.status.toLowerCase() === 'active'};
        })
      "
      :items-per-page="15"
      :footer-props="{itemsPerPageText:$setContent('ROWS_PER_PAGE')}"
      :no-data-text="$setContent('NO_TOPICS_FOUND')"
      :no-results-text="$setContent('NO_TOPICS_RESULTS')"
      :loading="loading"
      :search="searchText"
      group-by="team.name"
      @click:row="(item) => moveToTopic(item)"
    >
      <template v-slot:footer.page-text="items">
        {{items.pageStart}} - {{ items.pageStop }} / {{ items.itemsLength }}
      </template>
      <template v-slot:item.name="{item}">
        <MeetingItem
          v-if="item.team"
          v-bind="{
            uuid: item.uuid,
            name: item.name,
            id: item.id,
            status: item.status,
          }"
          class="pl-10"
        />
        <MeetingItem
          v-else
          v-bind="{
            uuid: item.uuid,
            name: item.name,
            id: item.id,
            status: item.status,
          }"
        />
      </template>
      <template v-slot:item.status="{item}">
        <v-switch
          v-model="item.isActive"
          :value="item.isActive"
          @change="toggleStatus(item)"
          @click.native.stop
          :id="item.uuid"
        />
      </template>
      <template v-slot:group.header="{group, toggle, isOpen}">
        <div
          v-if="group"
          class="d-flex flex-row align-center px-6 header-background"
          @click="toggle"
        >
          <v-icon large>mdi-folder-open</v-icon>
          <v-card-title class="px-6 bold">
            {{ group }}
          </v-card-title>
          <v-icon>{{ isOpen ? 'mdi-chevron-down' : 'mdi-chevron-up' }}</v-icon>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';
import {mapState} from 'vuex';

import {MeetingInterface} from '~/store/modules/meeting';
import {TeamInterface} from '~/store/modules/team';

@Component({
  props: {
    isTeamListing: {type: Boolean, required: true},
    topics: {type: Array as () => MeetingInterface[], required: true},
  },
  computed: mapState({
    team: (state: any) => state.modules.team,
  }),
})
export default class TopicListing extends Vue {
  $notifier: any;
  $router: any;
  $store: any;

  loading: boolean = false;
  deletableTopics: MeetingInterface[] = [];
  searchText: string = '';

  tableHeaders = [
    {text: this.$setContent('NAME'), sortable: true, value: 'name'},
    {text: this.$setContent('ACTIVE'), sortable: true, value: 'status', width: '150px'},
    // {text: 'Edit', sortable: false, value: 'editIcon', width: '100px'},
  ];

  addNewTeam() {
    console.log('Add new team');
  }

  submitSearchText(s: string) {
    this.searchText = s || '';
  }

  sortByLastModified(
    a: TeamInterface & {lastModified: string},
    b: TeamInterface & {lastModified: string},
  ) {
    return (
      new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
    );
  }

  moveToTopic(topic: MeetingInterface) {
    this.$router.push({
      path: '/m/' + topic.id,
    });
  }

  async toggleStatus(topic: MeetingInterface) {
    const success = await this.$store.dispatch('modules/meeting/update', {
      meeting: {
        ...topic,
        status: topic.status === 'active' ? 'closed' : 'active',
      },
    });
    this.$notifier.showMessage({
      content: success
        ? this.$setContent('TOPIC_UPDATE_SUCCESS')
        : this.$setContent('TOPIC_UPDATE_FAILED'),
      color: success ? 'success' : 'error',
    });
    if (!success) {
      await this.$store.dispatch('modules/user/read', {
        uuid: this.$store.state.modules.user.uuid,
      });
    }
  }
}
</script>

<style scoped>
.header-background {
  background: var(--v-realWhite-base);
}
</style>
