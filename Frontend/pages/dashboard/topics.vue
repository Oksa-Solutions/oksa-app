<template>
  <v-container fluid>
    <TopicListing v-bind="{isTeamListing: false, topics}" />
  </v-container>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';
import {mapState} from 'vuex';
import {MeetingInterface} from '~/store/modules/meeting';
import {TeamInterface} from '~/store/modules/team';

@Component({
  layout: 'dashboard',
  computed: mapState({
    topics: (state: any) =>
      state.modules.user.meetings.filter(
        (m: MeetingInterface) =>
          state.modules.organisation.teams
            .map((t: TeamInterface) => t.uuid)
            .includes(m.team?.uuid) || m.team === null,
      ),
  }),
})
export default class Topics extends Vue {
  $initialLoad: any;
  $router: any;
  loading: boolean = false;
  deletableTopics: MeetingInterface[] = [];
  searchText: string = '';

  tableHeaders = [
    {text: this.$setContent('NAME'), sortable: true, value: 'name'},
    {text: 'ID', sortable: false, value: 'id'},
    // {text: this.$setContent('ADMIN'), sortable: true, value: 'isAdmin', width: '150px'},
    // {text: this.$setContent('EDIT'), sortable: false, value: 'editIcon', width: '100px'},
  ];

  mounted() {
    this.$initialLoad();
  }

  submitSearchText(s: string) {
    this.searchText = s || '';
  }
  async deleteTopics() {
    console.log('Delete topics');
    // const success = await this.$store.dispatch('modules/team/removeTeamMembers', {uuid: this.team.uuid, name: this.team.name, organisation: this.currentOrg, users: this.deletableMembers});
    // this.$notifier.showMessage({
    //   content: this.$setContent(success ? 'TOPICS_REMOVED' : 'TOPIC_REMOVE_FAILED'),
    //   color: success ? 'success' : 'error',
    // });
    // this.deletableTopics = [];
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
}
</script>
