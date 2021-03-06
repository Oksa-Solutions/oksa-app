<template>
  <v-dialog value="true" max-width="600px" persistent>
    <v-card outlined elevation="0" class="round-8 card">
      <div @click="openEditModal">
        <div class="category-container px-6 py-3 round-top-8">
          <span class="content-aware-text">
            {{
              card.categories
                .map((c) => c.name)
                .sort(sortByCategories)
                .join(', ')
            }}
          </span>
        </div>

        <v-card-title class="px-6 text-h5 cardTitle">
          {{ card.title }}</v-card-title
        >

        <v-card-text
          class="px-6"
          style="white-space: pre-wrap"
          v-text="showMoreText()"
        >
        </v-card-text>
        <span class="px-6" v-if="card.content.length > maxLength">
          <a @click.stop.capture="toggleAllContent(!showAll)">
            {{ showAll ? $setContent('SHOW_LESS') : $setContent('SHOW_MORE') }}
          </a>
        </span>
      </div>

      <v-container fluid class="pl-6 pr-8 justify-space-between">
        <v-row class="d-flex align-center">
          <v-card-subtitle style="width: 120px"> {{ $setContent('IN_TOPIC') }} </v-card-subtitle>
          <TopicItem
            v-bind="{topic: topics.find((m) => m.uuid === card.meeting.uuid)}"
          />
        </v-row>

        <v-row class="d-flex align-center">
          <v-card-subtitle style="width: 120px"> {{ $setContent('DATE') }} </v-card-subtitle>
          <CardCalendar
            v-bind="{card, regularCard: false, disabledChip: false}"
          />
        </v-row>

        <v-row>
          <v-card-subtitle style="width: 120px"> {{ $setContent('VOTES') }} </v-card-subtitle>
          <v-col class="d-flex align-center pa-0">
            <div class="pa-1 pr-2 align-center">
              <v-icon>mdi-thumb-up-outline</v-icon>
              <span>{{ card.votes.yes.length || 0 }}</span>
            </div>
            <div class="pa-1 pr-2 align-center">
              <v-icon>mdi-thumb-down-outline</v-icon>
              <span>{{ card.votes.no.length || 0 }}</span>
            </div>
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions class="px-4 pt-2 pb-4">
        <v-spacer />
        <SubmitButton @done="closeModal" v-bind="{label: $setContent('CLOSE')}" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component, Prop} from 'vue-property-decorator';
import {mapState} from 'vuex';
import {MeetingInterface} from '~/store/modules/meeting';
import {
  APPROVED,
  ARCHIVED,
  CONTENT_MAX_LENGTH,
  WAITING,
} from '../../assets/constants';
import {createCardDto} from '../../dto/cards';
import {CardInterface} from '../../store/modules/cards';

@Component({
  computed: mapState({
    topics: (state: any) => state.modules.user.meetings,
  }),
  props: {
    card: {type: Object as () => CardInterface, required: true},
  },
})
export default class OpenNote extends Vue {
  @Prop() card!: CardInterface;
  @Prop() topics!: MeetingInterface[];
  $notifier: any;
  statusColor: string = '';
  statusIcon: string = '';
  newCard: boolean = false;
  maxLength: number = CONTENT_MAX_LENGTH;
  showAll: boolean = false;
  disableVoteBtns: boolean = false;

  mounted() {
    this.updateStatus(this.card.status);
  }

  getHeaderColor() {
    if (this.card.categories.length > 0) {
      return this.card.categories.length === 1
        ? this.card.categories[0].color
        : `linear-gradient(135deg, ${this.card.categories[0].color} 0%, ${this.card.categories[1].color} 100%)`;
    } else {
      return '';
    }
  }

  closeModal() {
    this.$emit('closed');
  }

  openEditModal() {
    this.newCard = true;
  }

  closeEditModal() {
    this.newCard = false;
  }

  sortByCategories(a: string, b: string) {
    if (a.toLowerCase() < b.toLowerCase()) {
      return -1;
    } else if (a.toLowerCase() > b.toLowerCase()) {
      return 1;
    } else {
      return 0;
    }
  }

  showMoreText() {
    let content = this.card.content;
    if (this.card.content.length > this.maxLength && !this.showAll) {
      content = `${this.card.content.slice(0, this.maxLength - 3)}...`;
    }
    return content.trim();
  }

  toggleAllContent(showAll: boolean) {
    this.showAll = showAll;
  }

  updateStatus(status: string) {
    switch (status) {
      case WAITING:
        this.statusIcon = 'mdi-clock-outline';
        this.statusColor = 'wait';
        break;
      case APPROVED:
        this.statusIcon = 'mdi-checkbox-marked-circle';
        this.statusColor = 'ok';
        break;
      case ARCHIVED:
        this.statusIcon = 'mdi-archive-arrow-down';
        this.statusColor = 'archived';
        break;
      default:
        break;
    }
  }

  hasVoted(agree: boolean) {
    return this.card.votes[agree ? 'yes' : 'no'].includes(
      this.$store.state.modules.user.uuid,
    );
  }

  async clickVote(agree: boolean) {
    this.disableVoteBtns = true;
    const userUuid = this.$store.state.modules.user.uuid;
    const yesIdx = this.card.votes.yes.findIndex((v) => v === userUuid);
    const noIdx = this.card.votes.no.findIndex((v) => v === userUuid);
    const idx = agree ? yesIdx : noIdx;
    const addVote = idx < 0;
    await this.$store.dispatch(`modules/cards/voteCard`, {
      meeting: this.$store.state.modules.meeting,
      uuid: this.card.uuid,
      agree,
      addVote,
      id: userUuid,
    });
    this.hasVoted(agree);
    setTimeout(() => {
      this.disableVoteBtns = false;
    }, 200);
  }
}
</script>

<style scoped></style>
