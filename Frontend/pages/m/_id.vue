<template>
  <v-container fluid>
    <NoteEdit
      v-if="openCopiedCard"
      v-bind="{card: copiedCard, editCard: true}"
      @closeModal="closeEditModal"
    />
    <v-row
      v-masonry
      origin-left="true"
      horizontal-order="true"
      transition-duration="0.3s"
      item-selector=".item"
      stagger="0.03s"
      class="pb-16"
    >
      <v-col
        v-masonry-tile
        class="item px-2 py-2"
        v-for="card in loading ? 5 : sortedCards"
        :key="card.uuid"
        :cols="mcols"
      >
        <v-skeleton-loader v-if="loading" type="article, actions" />
        <NoteBase v-else v-bind="{card}" @copied="editCopiedCard" />
      </v-col>
    </v-row>
    <div v-if="!loading">
      <EmptyMeeting v-if="cards.length < 1" />
      <AddIdeaButton v-else />
    </div>
  </v-container>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component, Prop} from 'vue-property-decorator';
import {mapState} from 'vuex';

import {
  CREATE_CARD_DATA,
  DELETE_CARD_DATA,
  UPDATE_CARD_DATA,
  UPDATE_MEETING_DATA,
  AUTH_MEETING,
  DELETE_MEETING_DATA,
  UPDATE_VOTING_DATA,
  REFRESH_TOKENS,
  SET_USER_AUTHENTICATED,
  RESET_FILTERS,
  SET_MEETING_DATA,
} from '../../store/mutationTypes';
import {tokenIsExpired} from '../../plugins/axios';
import {CardInterface} from '../../store/modules/cards';
import {MeetingInterface} from '~/store/modules/meeting';
import { UserInterface } from '~/store/modules/user';

@Component({
  head() {
    // @ts-ignore
    return {title: this.meeting.name};
  },
  layout: 'topic',
  computed: mapState({
    cards: (state: any) => state.modules.meeting.cards,
    user: (state: any) => state.modules.user,
    meeting: (state: any) => state.modules.meeting,
    sortedCards: function (): CardInterface[] {
      function countTotalVotes(card: CardInterface): number {
        return card.votes.yes.length - card.votes.no.length;
      }
      const shouldFilter: boolean =
        this.$store.state.modules.filters.filteredCategories.length > 0 ||
        this.$store.state.modules.filters.filteredStatus.length > 0;
      const sorted: CardInterface[] = shouldFilter
        ? [...this.cards].sort((a: CardInterface, b: CardInterface) => {
            return countTotalVotes(b) - countTotalVotes(a);
          })
        : [...this.cards];
      return sorted
        .filter(this.filterByCategories)
        .filter(this.filterByStatus)
        .filter(this.filterBySearchText);
    },
  }),
})
export default class ID extends Vue {
  @Prop() cards!: CardInterface[]
  @Prop() user!: UserInterface
  @Prop() meeting!: MeetingInterface
  @Prop() sortedCards!: CardInterface[]
  $initialLoad: any;
  $notifier: any;
  $route: any;
  $router: any;
  $store: any;
  copiedCard: CardInterface | null = null;
  openCopiedCard: boolean = false;
  window = {
    width: 0,
  };
  mcols = 4;
  es: EventSource | null = null;
  loading: boolean = true;

  editCopiedCard(card: CardInterface) {
    this.copiedCard = card;
    this.openCopiedCard = true;
  }

  closeEditModal() {
    this.openCopiedCard = false;
    this.copiedCard = null;
  }

  filterByCategories(card: CardInterface) {
    return this.$store.state.modules.filters.filteredCategories.length > 0
      ? card.categories
          .map((c) => c.name)
          .findIndex((c) =>
            this.$store.state.modules.filters.filteredCategories.includes(c),
          ) >= 0
      : true;
  }

  filterByStatus(card: CardInterface) {
    return this.$store.state.modules.filters.filteredStatus.length > 0
      ? this.$store.state.modules.filters.filteredStatus.includes(card.status)
      : true;
  }

  filterBySearchText(card: CardInterface) {
    const searchText = this.$store.state.modules.filters.searchText;
    return this.$store.state.modules.filters.searchText.length > 0
      ? card.title.toLowerCase().includes(searchText.toLowerCase()) ||
          card.content.toLowerCase().includes(searchText.toLowerCase())
      : true;
  }

  async mounted() {
    await this.$initialLoad();
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('beforeunload', this.resetFilters);

    this.handleResize();
    const id = this.$route?.params?.id || '';
    const password = this.$route?.query?.pw || '';
    const uuid = await this.getUserUUID();
    const payload = {uuid, meeting: {id: id}, password};
    if (id !== '') {
      this.$store.commit(`modules/auth/${SET_USER_AUTHENTICATED}`, false);
      await this.$store.dispatch(`modules/auth/${AUTH_MEETING}`, payload);
      this.$store.commit(
        `modules/meeting/${SET_MEETING_DATA}`,
        this.$store.state.modules.user.meetings.find(
          (m: MeetingInterface) => m.id === id,
        ),
      );
    } else {
      this.$router.push({path: '/'});
    }

    if (this.$store.state.modules.auth.isAuthenticated) {
      this.fetchAllData();
      this.setupStream();
    } else {
      this.$router.push({path: '/'});
    }
    this.loading = false;
  }

  beforeDestroy() {
    this.resetFilters();
    this.es?.close();
  }

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('beforeunload', this.resetFilters);
  }

  resetFilters() {
    this.$store.commit(`modules/filters/${RESET_FILTERS}`);
  }

  async getUserUUID() {
    if (this.$store?.state?.modules?.user?.uuid !== '') {
      // Read user information
      await this.$store.dispatch('modules/user/read', {
        uuid: this.$store.state.modules.user.uuid,
      });
    } else {
      await this.$store.dispatch('modules/user/create');
    }
    return this.$store.state.modules.user.uuid;
  }

  async fetchAllData() {
    this.$store.dispatch('modules/cards/resetCards');
    // Read meeting
    await this.$store.dispatch('modules/meeting/read', {
      meetingUUID: this.$store.state.modules.meeting.uuid,
    });
  }

  async setupStream() {
    // Check that authToken has not expired. If it has, update the token
    if (tokenIsExpired(this.$store.state.modules.auth.authToken)) {
      await this.$store.dispatch(
        `modules/auth/${REFRESH_TOKENS}`,
        this.$store.state.modules.user.uuid,
      );
    }
    this.es = new EventSource(
      `${process.env.baseURL}/events/subscribe?meetingUUID=${this.$store.state.modules.meeting.uuid}&authToken=${this.$store.state.modules.auth.authToken}`,
    );

    this.es.onmessage = (event: MessageEvent<any>) => {
      if (tokenIsExpired(this.$store.state.modules.auth.authToken)) {
        this.$store.dispatch(
          `modules/auth/${REFRESH_TOKENS}`,
          this.$store.state.modules.user.uuid,
        );
      }
      if (!event) {
        this.es?.close();
      } else {
        const data = JSON.parse(event.data);
        if (data.type === 'cards') {
          delete data.type;
          if (data.actionType === 'Create') {
            delete data.actionType;
            this.$store.commit(`modules/cards/${CREATE_CARD_DATA}`, data);
            this.$store.commit(`modules/meeting/${UPDATE_MEETING_DATA}`, {
              card: data,
            });
          } else if (data.actionType === 'Update') {
            delete data.actionType;
            this.$store.commit(`modules/cards/${UPDATE_CARD_DATA}`, data);
            this.$store.commit(`modules/meeting/${UPDATE_MEETING_DATA}`, {
              card: data,
            });
          } else if (data.actionType === 'Delete') {
            // not working
            delete data.actionType;
            this.$store.commit(`modules/cards/${DELETE_CARD_DATA}`, data.uuid);
            this.$store.commit(`modules/meeting/${UPDATE_MEETING_DATA}`, {
              card: data,
            });
          } else if (data.actionType === 'Vote') {
            delete data.actionType;
            this.$store.commit(`modules/cards/${UPDATE_VOTING_DATA}`, data);
            this.$store.commit(`modules/meeting/${UPDATE_MEETING_DATA}`, {
              card: data,
            });
          } else {
            console.log(data.actionType);
          }
        } else if (data.type === 'meeting') {
          delete data.type;
          if (data.actionType === 'Update') {
            delete data.actionType;
            this.$store.commit(
              `modules/meeting/${UPDATE_MEETING_DATA}`,
              data.meeting,
            );
          } else if (data.type === 'Delete') {
            delete data.actionType;
            this.$store.commit(`modules/meeting/${DELETE_MEETING_DATA}`);
          } else {
            console.log(data.actionType);
          }
        } else {
          console.log(data.type);
        }
      }
    };
    this.es.onerror = (event) => {
      if (this.es?.readyState === EventSource.CLOSED) {
        console.log('Event Stream was closed');
        this.$notifier.showMessage({
          content:
            'Application offline, if you wish to continue editing refresh the page',
          color: 'warning',
        });
        this.es?.close();
        this.es = null;
      }
    };
  }

  handleResize() {
    // breakpoint = (cardWidth + cardGutter) * amountOfCards + margin
    // Each card should be at least 300px wide and has 8px gutter on each side.
    // The margin is 12px wide on each side.
    // Above 960px, add 256px for the left drawer.
    this.window.width = window.innerWidth;
    if (this.window.width < 340) {
      this.mcols = 12;
    } else if (this.window.width >= 340 && this.window.width < 656) {
      this.mcols = 12;
    } else if (this.window.width >= 656 && this.window.width < 972) {
      this.mcols = 6;
    } else if (this.window.width >= 972 && this.window.width < 1544) {
      this.mcols = 4;
    } else if (this.window.width >= 1544 && this.window.width < 2176) {
      this.mcols = 3;
    } else if (this.window.width >= 2176 && this.window.width < 3816) {
      this.mcols = 2;
    } else {
      this.mcols = 1;
    }
  }
}
</script>
