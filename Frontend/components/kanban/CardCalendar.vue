<template>
  <v-menu
    ref="showDatePicker"
    v-model="showDatePicker"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
  >
    <template v-slot:activator="{on, attrs}">
      <v-chip
        :x-small="regularCard"
        v-bind="attrs"
        v-on="on"
        :color="setDateChipColor()"
      >
        {{ formatDate() }}
      </v-chip>
    </template>
    <v-date-picker
      v-model="endDate"
      no-title
      scrollable
      color="primary"
      :show-week="true"
      first-day-of-week="1"
      max-width="400px"
      :min="new Date().toISOString().substr(0, 10)"
      year-icon="mdi-calendar-blank"
    >
      <CancelButton @cancel="resetDate" v-bind="{label: 'Reset'}" />
      <v-spacer />
      <CancelButton @cancel="closeCalendar" v-bind="{label: 'Cancel'}" />
      <CancelButton @cancel="setDate(endDate)" v-bind="{label: 'OK'}" />
    </v-date-picker>
  </v-menu>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';
import {DONE, ONE_DAY} from '../../assets/constants';
import {CardInterface} from '../../store/modules/cards';

const cardCalendarProps = Vue.extend({
  props: {
    card: {type: Object as () => CardInterface, required: true},
    regularCard: {type: Boolean, required: true},
  },
});

@Component
export default class CardCalendar extends mixins(cardCalendarProps) {
  $notifier: any;
  showDatePicker: boolean = false;
  endDate: string = new Date().toISOString().substr(0, 10);

  mounted() {
    this.currentDateSelection();
  }

  formatDate() {
    if (!this.card?.dates?.endDate) {
      return 'Set date';
    }
    const today = new Date(Date.now());
    const thisYear = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(
      today,
    );

    const date = new Date(this.card.dates.endDate);
    const year = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(date);
    const month = new Intl.DateTimeFormat('en', {
      month: year === thisYear ? 'short' : 'long',
    }).format(date);
    const day = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(date);
    const weekday = new Intl.DateTimeFormat('en', {weekday: 'short'}).format(
      date,
    );

    const dateDiff: number = this.getDateDiff(today, date);
    if (dateDiff >= -1 && dateDiff < 0) {
      return 'Yesterday';
    } else if (dateDiff >= 0 && dateDiff < 1) {
      return 'Today';
    } else if (dateDiff >= 1 && dateDiff < 2) {
      return 'Tomorrow';
    } else {
      return year === thisYear
        ? `${weekday}, ${day} ${month}`
        : `${day} ${month} ${year}`;
    }
  }

  getDateDiff(startDate: Date, endDate: Date): number {
    const dateDiff: number = endDate.getTime() - startDate.getTime();
    return Math.ceil(dateDiff / ONE_DAY);
  }

  setDateChipColor(): string {
    if (!this.card?.dates?.endDate) {
      return '';
    }
    const today = new Date();
    const date = new Date(this.card.dates.endDate);
    const diff =
      (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
        Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())) /
      ONE_DAY;
    if (diff < 0) {
      return 'error';
    } else if (diff <= 7) {
      return 'secondary';
    } else if (diff > 7) {
      return 'success';
    } else {
      return '';
    }
  }

  currentDateSelection() {
    if (this.card?.dates?.endDate) {
      this.endDate = new Date(this.card.dates.endDate)
        .toISOString()
        .substr(0, 10);
    } else {
      this.endDate = new Date().toISOString().substr(0, 10);
    }
  }

  selectDate() {
    this.showDatePicker = true;
  }

  closeCalendar() {
    this.currentDateSelection();
    this.showDatePicker = false;
  }

  async resetDate() {
    const card: Partial<CardInterface> = {
      uuid: this.card.uuid,
      meeting: this.card.meeting,
      dates: {...this.card.dates, endDate: null},
    };

    const success = await this.$store.dispatch(
      'modules/cards/updateCard',
      card,
    );
    this.closeCalendar();
  }

  async setDate() {
    const newDate: Date = new Date(this.endDate);
    const card: Partial<CardInterface> = {
      ...this.card,
      meeting: this.card.meeting,
      dates: {...this.card.dates, endDate: newDate},
    };

    const success = await this.$store.dispatch(
      'modules/cards/updateCard',
      card,
    );
    this.$notifier.showMessage({
      content: success
        ? 'Due date updated'
        : 'Due date update failed. Try again',
      color: success ? 'success' : 'error',
    });
    this.closeCalendar();
  }
}
</script>
