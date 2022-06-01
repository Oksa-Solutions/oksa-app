<template>
  <v-card outlined elevation="0" class="round-8 card">
    <NoteEdit
      v-if="newCard"
      v-bind="{card: $props.card, editCard: true}"
      @closeModal="closeEditModal"
    />
    <div @click="openEditModal" class="pointer-cursor">
      <div
        class="category-container px-6 py-3 round-top-8"
        :style="{background: getHeaderColor()}"
        id="fab-new-card"
      >
        <span class="content-aware-text">
          {{
            card.categories
              .map((c) => c.name)
              .sort(sortByCategories)
              .join(', ')
          }}
        </span>
      </div>

      <v-card-title class="px-6 text-h5 card-title">
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
          {{ showAll ? 'Show less' : 'Show more' }}
        </a>
      </span>
    </div>

    <v-card-actions class="px-4 pt-2 pb-4">
      <div>
        <v-btn
          text
          elevation="0"
          :color="hasVoted(true) ? 'ok' : ''"
          class="pa-1"
          :disabled="disableVoteBtns"
          @click="clickVote(true)"
        >
          <v-icon>mdi-thumb-up{{ hasVoted(true) ? '' : '-outline' }}</v-icon>
          <span class="pl-2">{{ card.votes.yes.length || 0 }}</span>
        </v-btn>
      </div>
      <div>
        <v-btn
          text
          elevation="0"
          class="pa-1"
          :disabled="disableVoteBtns"
          :color="hasVoted(false) ? 'error' : ''"
          @click="clickVote(false)"
        >
          <v-icon>mdi-thumb-down{{ hasVoted(false) ? '' : '-outline' }}</v-icon>
          <span class="pl-2">{{ card.votes.no.length || 0 }}</span>
        </v-btn>
      </div>

      <v-menu top>
        <template v-slot:activator="{on, attrs}">
          <v-chip
            :color="statusColor"
            text-color="white"
            v-bind="attrs"
            v-on="on"
            class="ml-2 statusChip"
          >
            <v-avatar left v-if="width < 40">
              <v-icon>{{ statusIcon }}</v-icon>
            </v-avatar>

            <span v-else>{{ setStatusText(card.status) }}</span>
          </v-chip>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, i) in statusListing"
            :key="i"
            link
            @click="setStatus(item.title)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ setStatusText(item.title) }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-spacer></v-spacer>
      <v-menu top>
        <template v-slot:activator="{on, attrs}">
          <v-btn text icon color="gray" v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link @click="copyCard">
            <v-list-item-icon
              ><v-icon>mdi-content-copy</v-icon></v-list-item-icon
            >
            <v-list-item-title>{{ $setContent('COPY_CARD') }}</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="openEditModal">
            <v-list-item-icon><v-icon>mdi-pencil</v-icon></v-list-item-icon>
            <v-list-item-title>{{ $setContent('EDIT_CARD') }}</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="deleteCard">
            <v-list-item-icon
              ><v-icon color="red">mdi-delete</v-icon></v-list-item-icon
            >
            <v-list-item-title :style="{color: 'red'}"
              >{{ $setContent('DELETE_CARD')}}</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component, Prop} from 'vue-property-decorator';
import {CONTENT_MAX_LENGTH} from '../../assets/constants';
import {createCardDto} from '../../dto/cards';
import {CardInterface} from '../../store/modules/cards';
import {APPROVED, ARCHIVED, WAITING} from '../../assets/constants';

@Component({
  props: {
    card: {type: Object as () => CardInterface, required: true},
  },
})
export default class NoteBase extends Vue {
  @Prop() card!: CardInterface;
  $notifier: any;
  $refs: any;
  statusColor: string = '';
  statusIcon: string = '';
  newCard: boolean = false;
  maxLength: number = CONTENT_MAX_LENGTH;
  showAll: boolean = false;
  disableVoteBtns: boolean = false;
  width: number = 0;
  window = {
    width: 0,
  };
  statusListing = [
    {
      icon: 'mdi-checkbox-marked-circle',
      title: APPROVED,
    },
    {
      icon: 'mdi-clock-time-four-outline',
      title: WAITING,
    },
    {
      icon: 'mdi-package-down',
      title: ARCHIVED,
    },
  ];

  mounted() {
    this.updateStatus(this.card.status);
    window.addEventListener('resize', this.calculateWidth);
    this.calculateWidth();
  }

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.window.width = window.innerWidth;
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

  calculateWidth() {
    this.width = document.querySelector('.statusChip')?.clientWidth || 100;
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
    let content = this.card?.content || '';
    if (this.card.content.length > this.maxLength && !this.showAll) {
      content = `${this.card.content.slice(0, this.maxLength - 3)}...`;
    }
    return content?.trim();
  }

  toggleAllContent(showAll: boolean) {
    this.showAll = showAll;
  }

  async copyCard() {
    const newCard: createCardDto = {
      meeting: this.$store.state.modules.meeting,
      author: this.$store.state.modules.user,
      title: this.card.title,
      content: this.card.content,
      categories: this.card.categories,
      dates: this.card.dates,
    };

    const res = await this.$store.dispatch('modules/cards/copyCard', newCard);
    this.$notifier.showMessage({
      content: this.$setContent(res.success ? 'CARD_COPIED' : 'CARD_COPY_FAILED'),
      color: res.success ? 'success' : 'error',
    });
    if (res.success) {
      this.$emit('copied', res.data);
    }
  }

  async deleteCard() {
    const success = await this.$store.dispatch('modules/cards/deleteCard', {
      uuid: this.card.uuid,
      meeting: this.$store.state.modules.meeting,
      remover: this.$store.state.modules.user.uuid,
    });
    this.$notifier.showMessage({
      content: this.$setContent(success ? 'IDEA_DELETED' : 'IDEA_DELETION_FAILED'),
      color: success ? 'success' : 'error',
    });
  }

  async setStatus(status: string) {
    const success = await this.$store.dispatch('modules/cards/updateCard', {
      uuid: this.card.uuid,
      meeting: this.$store.state.modules.meeting,
      lastModifiedBy: this.$store.state.modules.user.uuid,
      status,
    });
    this.$notifier.showMessage({
      content: this.$setContent(success ? 'STATUS_UPDATED' : 'STATUS_UPDATE_FAILED'),
      color: success ? 'success' : 'error',
    });
    this.updateStatus(status);
  }

  setStatusText(status: string) {
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
