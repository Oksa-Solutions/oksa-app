<template>
  <v-dialog value="true" max-width="340px" persistent>
    <v-card outlined elevation="0" class="round-8 card">
      <div
        class="category-container px-6 py-3 round-top-8"
        color="primary"
        id="fab-new-category"
        :style="{background: color}"
      />

      <v-card-subtitle />
      <v-card-title class="py-0 px-6 text-h5 card-title" style="font-weight: 700;">
        {{ newCategory ? 'Create a' : 'Edit the' }} category
      </v-card-title>

      <v-form ref="form" v-model="formValid">
        <v-card-text class="pt-1 px-6">
          <v-text-field
            v-model="category"
            regular
            single-line
            flat
            dense
            placeholder="Category name..."
            background-color="transparent"
            :rules="[rules.categoryName, rules.uniqueCategoryName]"
          />
        </v-card-text>
        <ColorPicker
          v-bind="{gradient: false, selectedColor: color}"
          @clicked="setColor"
        />

        <v-card-actions class="pa-6">
          <v-spacer />
          <CancelButton
            @cancel="cancel"
            v-bind="{label: newCategory ? 'Discard' : 'Cancel'}"
          />
          <SubmitButton
            @done="submit"
            v-bind="{
              label: newCategory ? 'Add' : 'Save',
              disabled: !formValid,
            }"
          />
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import {RULES} from '~/assets/constants';
import {CardInterface, CategoryInterface} from '../../store/modules/cards';

const BASE_COLOR: string = 'var(--v-yellow-base)';

@Component({
  props: {
    newCategory: {type: Boolean, required: false, default: true},
    categoryName: {type: String, required: false},
    categoryColor: {type: String, required: false},
  },
})
export default class CreateCategoryModal extends Vue {
  $notifier: any;
  $route: any;
  $store: any;
  $emit: any;
  formValid: boolean = false;
  color: string = this.newCategory
    ? BASE_COLOR
    : this.categoryColor || BASE_COLOR;
  category: string = this.newCategory ? '' : this.categoryName || '';
  originalName: string = this.categoryName || '';

  rules = {
    ...RULES,
    uniqueCategoryName: (value: string) => {
      return (
        value === this.originalName ||
        !this.$store.state.modules.meeting.categories
          .map((c: CategoryInterface) => c.name)
          .includes(value) ||
        'Category name should be unique'
      );
    },
  };

  setColor(color: string) {
    this.color = color;
  }

  cancel(): void {
    this.$emit('discard');
    setTimeout(() => {
      this.category = '';
      this.color = BASE_COLOR;
    }, 500);
  }

  async submit(): Promise<void> {
    const newCategories: CategoryInterface[] = [
      ...this.$store.state.modules.meeting.categories,
    ];
    const newCategoryObj = {name: this.category, color: this.color};
    if (this.newCategory) {
      // Add new category to array of categories
      newCategories.push(newCategoryObj);
    } else {
      // Update existing category in place
      const idx = newCategories
        .map((c: CategoryInterface) => c.name)
        .indexOf(this.originalName);
      newCategories[idx] = newCategoryObj;
    }
    const updateSet = {
      meeting: {
        uuid: this.$store.state.modules.meeting.uuid,
        id: this.$route?.params?.id,
        categories: newCategories,
      },
    };
    const success = await this.$store.dispatch(
      'modules/meeting/update',
      updateSet,
    );

    if (success && !this.newCategory) {
      // Update every card header related to category
      const allCards = this.$store.state.modules.meeting.cards.filter(
        (card: CardInterface) => {
          return card?.categories
            ?.map((c: CategoryInterface) => c.name)
            ?.includes(this.originalName);
        },
      );

      for (let i: number = 0; i < allCards.length; i++) {
        const card: CardInterface = allCards[i];
        const idx: number = card?.categories
          ?.map((c: CategoryInterface) => c.name)
          .indexOf(this.originalName);
        if (idx >= 0 && card?.categories !== undefined) {
          card.categories[idx] = newCategoryObj;
          const success = await this.$store.dispatch(
            'modules/cards/updateCard',
            {...card, lastModifiedBy: this.$store.state.modules.user.uuid},
          );
        }
      }
    }
    success
      ? this.$emit('clicked', {name: this.category, color: this.color})
      : this.$notifier.showMessage({
          content: 'There was a network error. Try again.',
          color: 'error',
        });
    setTimeout(() => {
      this.category = '';
      this.color = BASE_COLOR;
    }, 500);
  }
}
</script>

<style scoped></style>
