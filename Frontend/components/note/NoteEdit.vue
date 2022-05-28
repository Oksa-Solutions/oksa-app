<template>
  <CreateCategoryModal
    v-if="newCategory"
    @discard="closeCategory"
    @clicked="setCategory"
  />
  <v-dialog v-else value="true" max-width="600px" persistent>
    <v-card class="rounded-lg">
      <v-form ref="form" v-model="formValid">
        <div>
          <v-menu
            max-width="300px"
            offset-y
            transition="scale-transition"
            :close-on-content-click="false"
          >
            <template v-slot:activator="{on, attrs}">
              <div
                v-bind="attrs"
                v-on="on"
                class="category-container px-6 py-3 round-top-8"
                :style="{background: getHeaderColor()}"
                id="fab-new-card"
              >
                <div class="content-aware-text">
                  {{
                    sortedCategories.length > 0
                      ? sortedCategories.map((c) => c.name).join(', ')
                      : 'Set category...'
                  }}
                </div>
              </div>
            </template>
            <v-list dense flat>
              <v-list-item
                v-for="(category, i) in this.$store.state.modules.meeting
                  .categories"
                :key="i"
                link
                @click="setCategory(category)"
                :style="{
                  background: sortedCategories
                    .map((c) => c.name)
                    .includes(category.name)
                    ? '#e9e9e9'
                    : '',
                }"
              >
                <v-list-item-icon>
                  <v-icon :color="category.color">mdi-label</v-icon>
                </v-list-item-icon>
                <v-list-item-title v-text="category.name" />
              </v-list-item>
              <v-list-item link @click="addCategory">
                <v-list-item-icon>
                  <v-icon>mdi-plus</v-icon>
                </v-list-item-icon>
                <v-list-item-title> Add new </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <v-card-title class="px-3 py-0">
          <v-text-field
            v-model="cardTitle"
            solo
            single-line
            flat
            hide-details
            dense
            class="rounded-0 headline"
            background-color="transparent"
            placeholder="Idea title"
          ></v-text-field>
        </v-card-title>

        <v-card-text class="px-3">
          <v-textarea
            v-model="cardContent"
            solo
            single-line
            flat
            hide-details
            full-width
            rows="3"
            auto-grow
            background-color="transparent"
            placeholder="Write your idea..."
          ></v-textarea>
          <v-item-group class="mt-6 px-3" style="visibility: hidden">
            <v-btn text outlined disabled class="">
              <v-icon left>mdi-clock-outline</v-icon>Add dates
            </v-btn>
            <v-btn text outlined disabled>
              <v-icon left>mdi-plus</v-icon>Set status
            </v-btn>
          </v-item-group>
        </v-card-text>
      </v-form>

      <v-card-actions class="pa-6 pt-0">
        <v-spacer />
        <CancelButton
          @cancel="cancel"
          v-bind="{label: editCard ? 'Cancel' : 'Discard'}"
        />
        <SubmitButton
          @done="submit"
          v-bind="{
            label: editCard ? 'Save' : 'Add',
            disabled: !titleOrContentNotEmpty(),
          }"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component';
import {Component, Vue} from 'vue-property-decorator';
import {CardInterface, CategoryInterface} from '../../store/modules/cards';

const NoteEditProps = Vue.extend({
  props: {
    editCard: {type: Boolean, default: false},
    card: {type: Object as () => CardInterface, required: false},
  },
});

@Component
export default class NoteEdit extends mixins(NoteEditProps) {
  $notifier: any;
  newCategory: boolean = false;
  formValid: boolean = false;
  sortedCategories: CategoryInterface[] = this.card?.categories
    ? [...this.card?.categories].sort(this.sortByCategories)
    : [];
  cardTitle: string = this.card?.title || '';
  cardContent: string = this.card?.content || '';
  cardStatus: string = this.card?.status || 'Waiting';

  titleOrContentNotEmpty() {
    return this.cardTitle.length > 0 || this.cardContent.length > 0;
  }

  getHeaderColor() {
    return this.sortedCategories?.length > 0
      ? this.sortedCategories?.length === 1
        ? this.sortedCategories[0].color
        : `linear-gradient(135deg, ${this.sortedCategories[0].color} 0%, ${this.sortedCategories[1].color} 100%)`
      : '';
  }

  addCategory() {
    this.newCategory = true;
  }

  closeCategory() {
    this.newCategory = false;
  }

  setCategory(category: CategoryInterface) {
    this.closeCategory();
    const idx: number = this.sortedCategories.findIndex(
      (c: CategoryInterface) => c.name == category.name,
    );
    if (idx < 0) {
      this.sortedCategories.push(category);
    } else {
      this.sortedCategories.splice(idx, 1);
    }
    this.sortedCategories.sort(this.sortByCategories);
  }

  sortByCategories(a: CategoryInterface, b: CategoryInterface) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    } else {
      return 0;
    }
  }

  async submit() {
    const url = this.editCard
      ? 'modules/cards/updateCard'
      : 'modules/cards/createCard';
    const author = this.editCard
      ? undefined
      : {uuid: this.$store.state.modules.user.uuid};
    const success = await this.$store.dispatch(url, {
      uuid: this.card?.uuid,
      meeting: this.$store.state.modules.meeting,
      author,
      title: this.cardTitle,
      content: this.cardContent,
      categories:
        this.sortedCategories.length === 0 ? [] : this.sortedCategories,
      status: this.cardStatus,
    });

    success
      ? this.cancel()
      : this.$notifier.showMessage({
          content: 'There was a network error. Try again.',
          color: 'error',
        });
  }

  cancel() {
    this.formValid = false;
    this.cardTitle = this.card?.title || '';
    this.cardContent = this.card?.content || '';
    this.cardStatus = this.card?.status || 'Waiting';
    this.sortedCategories = [];
    this.$emit('closeModal');
  }
}
</script>

<style scoped>
.author input {
  font-size: 0.75rem !important;
  font-weight: 600;
  text-transform: uppercase !important;
}
</style>
