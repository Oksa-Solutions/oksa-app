<template>
  <v-list dense flat>
    <DeleteConfirmationModal
      v-if="showDelModal"
      v-bind="{
        content: `${$setContent('ABOUT_TO_DELETE_CATEGORY')} ${selectedCategory.name}.`,
      }"
      :categoryName="selectedCategory.name"
      @delete="reallyDelete"
    />
    <v-list-item-group>
      <v-list-item
        v-for="(category, i) in categories"
        :key="category.name"
        :style="{
          background: editCategories ? '' : activeCategoryColor(category),
        }"
        @click="editCategories ? null : filterCategories(category)"
      >
        <v-list-item-action>
          <v-icon
            v-if="editCategories && showTrashBin"
            @click="() => showDeleteModal(category)"
            :class="'remove-' + i"
          >
            mdi-delete
          </v-icon>
          <v-icon
            v-else-if="editCategories && !showTrashBin"
            @click="() => editCategoryName(category)"
          >
            mdi-pencil
          </v-icon>
          <v-icon v-else :color="category.color" :class="'category-' + i">
            mdi-label
          </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-card-text
            @click="
              editCategories
                ? showTrashBin
                  ? showDeleteModal(category)
                  : editCategoryName(category)
                : null
            "
            v-text="category.name"
            class="semibold"
          />
        </v-list-item-content>
      </v-list-item>

      <v-list-item :disabled="editCategories" link @click="newCategory = true">
        <v-list-item-action>
          <v-icon>mdi-plus</v-icon>
        </v-list-item-action>
        <v-list-item-content>{{ $setContent('CREATE_CATEGORY') }}</v-list-item-content>
      </v-list-item>
      <CreateCategoryModal
        v-if="editCategoryModal || newCategory"
        :categoryName="selectedCategory.name"
        :categoryColor="selectedCategory.color"
        :newCategory="newCategory"
        @clicked="closeCategory"
        @discard="closeCategory"
      />
    </v-list-item-group>
  </v-list>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component, Prop} from 'vue-property-decorator';
import {mapState} from 'vuex';
import {MeetingInterface} from '~/store/modules/meeting';
import {CategoryInterface} from '../../store/modules/cards';

@Component({
  computed: mapState({
    categories: (state: any) => state.modules.meeting.categories,
    meeting: (state: any) => state.modules.meeting,
  }),
  props: {
    editCategories: {type: Boolean, required: true},
    showTrashBin: {type: Boolean, required: true},
    deleteSelected: {type: Boolean, required: true},
  },
})
export default class CategoriesListing extends Vue {
  @Prop() categories!: CategoryInterface[];
  @Prop() meeting!: MeetingInterface;
  @Prop() editCategories!: Boolean;
  @Prop() showTrashBin!: Boolean;
  @Prop() deleteSelected!: Boolean;
  $notifier: any;
  $route: any;
  newCategory: boolean = false;
  editCategoryModal: boolean = false;
  showDelModal: boolean = false;
  selectedCategory: CategoryInterface = {
    name: '',
    color: '',
  };

  async deleteCategory(category: CategoryInterface) {
    const remainingCategories = this.categories.filter(
      (c: CategoryInterface) => c.name !== category.name,
    );
    const updateSet = {
      meeting: {
        uuid: this.meeting.uuid,
      },
      categories: remainingCategories,
    };
    // Delete category from meeting
    const success: boolean = await this.$store.dispatch(
      'modules/meeting/deleteCategory',
      updateSet,
    );
  }

  reallyDelete(del: boolean) {
    if (del) {
      this.deleteCategory(this.selectedCategory);
    }
    this.showDelModal = false;
  }

  async showDeleteModal(category: CategoryInterface) {
    this.selectedCategory = category;
    this.showDelModal = true;
  }
  activeCategoryColor(category: CategoryInterface) {
    return this.$store.state.modules.filters.filteredCategories.includes(
      category.name,
    )
      ? '#e9e9e9'
      : '';
  }

  editCategoryName(category: CategoryInterface) {
    this.selectedCategory = category;
    this.editCategoryModal = true;
  }

  filterCategories(category: CategoryInterface) {
    this.$store.dispatch(
      'modules/filters/modifyCategoryFilters',
      category.name,
    );
  }

  closeCategory() {
    this.newCategory = false;
    this.editCategoryModal = false;
  }
}
</script>
