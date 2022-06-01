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
        :style="[disabledChip ? {'pointer-events': 'none'} : {}]"
        :small="regularCard"
        v-bind="attrs"
        v-on="on"
        :color="setDateChipColor()"
      >
        {{ formatDate(disabledChip) }}
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
      <CancelButton @cancel="setDate(null)" v-bind="{label: $setContent('RESET'), text: true}" />
      <v-spacer />
      <CancelButton
        @cancel="closeCalendar"
        v-bind="{label: $setContent('CANCEL'), text: true}"
      />
      <CancelButton @cancel="setDate(endDate)" v-bind="{label: $setContent('DONE')}" />
    </v-date-picker>
  </v-menu>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component, Prop} from 'vue-property-decorator';
import {ONE_DAY} from '../../assets/constants';
import {CardInterface} from '../../store/modules/cards';

@Component({
  props: {
    card: {type: Object as () => CardInterface, required: true},
    regularCard: {type: Boolean, required: true},
    disabledChip: {type: Boolean, required: false},
  },
})
export default class CardCalendar extends Vue {
  @Prop() card!: CardInterface;
  @Prop() regularCard!: Boolean;
  @Prop() disabledChip!: Boolean;
  $notifier: any;
  showDatePicker: boolean = false;
  endDate: string = new Date().toISOString().substr(0, 10);

  mounted() {
    this.currentDateSelection();
  }

  getLanguageCode(lang: string) {
    switch (lang) {
      case 'FI':
        return 'fi';
      default:
        return 'en';
    }
  }

  formatDate(disabled: boolean) {
    const lang = this.getLanguageCode(this.$store.state.modules.base.language);
    if (!this.card?.dates?.endDate) {
      if (disabled) {
        return this.$setContent('NO_DATE');
      } else {
        return this.$setContent('SET_DATE');
      }
    }
    const today = new Date(Date.now());
    const thisYear = new Intl.DateTimeFormat(lang, {year: 'numeric'}).format(
      today,
    );

    const date = new Date(this.card.dates.endDate);
    const year = new Intl.DateTimeFormat(lang, {year: 'numeric'}).format(date);
    const month = new Intl.DateTimeFormat(lang, {
      month: year === thisYear ? 'short' : 'long',
    }).format(date);
    const day = new Intl.DateTimeFormat(lang, {day: '2-digit'}).format(date);
    const weekday = new Intl.DateTimeFormat(lang, {weekday: 'short'}).format(
      date,
    );

    const dateDiff: number = this.getDateDiff(today, date);
    if (dateDiff >= -1 && dateDiff < 0) {
      return this.$setContent('YESTERDAY');
    } else if (dateDiff >= 0 && dateDiff < 1) {
      return this.$setContent('TODAY');
    } else if (dateDiff >= 1 && dateDiff < 2) {
      return this.$setContent('TOMORROW');
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

  async setDate(newDate: Date|null) {
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
        ? this.$setContent('DUE_DATE_UPDATED')
        : this.$setContent('DUE_DATE_UPDATE_FAILED'),
      color: success ? 'success' : 'error',
    });
    this.closeCalendar();
  }
}
</script>
