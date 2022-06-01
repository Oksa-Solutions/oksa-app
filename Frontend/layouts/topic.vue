<template>
  <v-app Dark>
    <!-- <FssHome /> -->
    <!--MainDrawer-->

    <SignInComponent />

    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :temporary="!miniVariant && mcols >= 6"
      mini-variant-width="72"
      :stateless="mcols < 12"
      fixed
      app
      class="elevation-3 mainDrawer"
    >
      <v-btn
        v-show="mcols < 12"
        fab
        absolute
        bottom
        right
        elevation="1"
        color="primary"
        @click="toggleMenu"
        class="fabDrawer"
      >
        <v-icon large
          >mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon
        >
      </v-btn>

      <div class="drawerWrap">
        <v-list>
          <v-list-item link @click="settings = true">
            <v-list-item-avatar color="secondary">
              <span style="padding: 6px; width: 100%; height: 100%">
                <v-icon class="black--text"> $vuetify.icons.oksa </v-icon>
              </span>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="meetingName bold text-h5 text-wrap">
                {{ this.$store.state.modules.meeting.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-dialog v-model="shareMeeting" max-width="340">
            <template v-slot:activator="{on, attrs}">
              <v-list-item dense link v-bind="attrs" v-on="on">
                <v-list-item-action>
                  <v-icon>mdi-share</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title
                    v-text="$setContent('SHARE_TOPIC')"
                    class="semibold"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>

            <ShareMeetingModal @clicked="closeShare" />
          </v-dialog>
        </v-list>

        <v-divider></v-divider>

        <v-subheader v-if="!miniVariant" class="subheader semibold">
          {{ $setContent('STATUS') }}
        </v-subheader>
        <StatusListing />

        <v-divider></v-divider>

        <v-subheader v-if="!miniVariant" class="subheader semibold">
          {{ $setContent('CATEGORIES') }}
          <v-spacer></v-spacer>
          <v-btn v-if="editCategories" icon @click="this.toggleTrashBinIcon">
            <v-icon color="var(--v-primary-base)">{{
              !this.showTrashBin ? 'mdi-delete' : 'mdi-pencil'
            }}</v-icon>
          </v-btn>
          <v-btn
            v-if="editCategories"
            plain
            text
            color="var(--v-primary-base)"
            @click="closeCategoryEditing"
          >
            {{ $setContent('BACK') }}
          </v-btn>
          <v-btn
            v-if="!editCategories"
            text
            color="var(--v-primary-base)"
            @click="startCategoryEditing"
          >
            {{ $setContent('EDIT') }}
          </v-btn>
        </v-subheader>
        <CategoriesListing
          :editCategories="this.editCategories"
          :deleteSelected="this.deleteSelected"
          :showTrashBin="this.showTrashBin"
        />

        <v-divider></v-divider>

        <v-list nav dense>
          <v-list-item-group>
            <v-dialog v-model="credits" max-width="380">
              <template v-slot:activator="{on, attrs}">
                <v-list-item link v-bind="attrs" v-on="on">
                  <v-list-item-action>
                    <v-icon>mdi-information</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="$setContent('CREDITS')"
                      class="semibold"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>

              <CreditsModal @clicked="closeCredits" />
            </v-dialog>

            <v-dialog v-model="settings" max-width="340">
              <template v-slot:activator="{on, attrs}">
                <v-list-item link v-bind="attrs" v-on="on">
                  <v-list-item-action>
                    <v-icon>mdi-cog</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="$setContent('TOPIC_SETTINGS')"
                      class="semibold"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>

              <SettingsModal @clicked="closeSettings" />
            </v-dialog>
          </v-list-item-group>
        </v-list>
      </div>
    </v-navigation-drawer>

    <!--END OF MainDrawer-->

    <v-main class="main">
      <v-container fluid>
        <v-row justify="center" class="stickyTop">
          <v-col sm="12" md="6" dense>
            <v-app-bar
              color="realWhite"
              class="justify-center rounded-lg elevation-2"
            >
              <v-app-bar-nav-icon @click="toggleMenu" />
              <v-text-field
                hide-details
                single-line
                flat
                solo
                prepend-inner-icon="mdi-magnify"
                :label="$setContent('SEARCH_TOPIC')"
                cols="1"
                class="mb-0 flex-grow-1 flex-shrink-0"
                :value="searchText"
                @input="(searchText) => submitSearchText(searchText)"
                @click:clear="submitSearchText('')"
                clearable
              />
              <v-btn icon disabled>
                <v-icon>mdi-view-agenda-outline</v-icon>
              </v-btn>
            </v-app-bar>
          </v-col>
        </v-row>

        <nuxt />
      </v-container>
    </v-main>
    <Snackbar />
  </v-app>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';
import {mapState} from 'vuex';
import {EDIT_SEARCH_TEXT} from '../store/mutationTypes';

@Component({
  props: {},
  computed: mapState({
    searchText: (state: any) => state.modules.filters.searchText,
    categories: (state: any) => state.modules.meeting.categories,
  }),
})
export default class DefaultLayout extends Vue {
  editCategories: boolean = false;
  showTrashBin: boolean = false;
  deleteSelected: boolean = false;
  miniVariant: boolean = false;
  shareMeeting: boolean = false;
  credits: boolean = false;
  settings: boolean = false;
  title = 'Oksa.io';
  window = {
    width: 0,
  };
  mcols: number = 4;
  drawer: boolean = false;

  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    this.drawer = this.mcols < 6;
    this.miniVariant = this.mcols < 12;
  }

  submitSearchText(value: string) {
    this.$store.commit(`modules/filters/${EDIT_SEARCH_TEXT}`, value || '');
  }

  toggleMenu() {
    if (this.mcols < 6) {
      // Large screens show mini drawer or full width drawer
      this.miniVariant = !this.miniVariant;
      this.drawer = true;
    } else if (this.mcols < 12) {
      // Medium screens show mini drawer or temporary drawer
      this.miniVariant = !this.miniVariant;
      this.drawer = true;
    } else {
      // Small screens show temporary drawer or no drawer at all
      this.drawer = !this.drawer;
      this.miniVariant = false;
    }
  }

  toggleTrashBinIcon() {
    this.showTrashBin = !this.showTrashBin;
  }

  closeShare() {
    this.shareMeeting = false;
  }

  closeCredits() {
    this.credits = false;
  }

  closeSettings() {
    this.settings = false;
  }

  startCategoryEditing() {
    this.editCategories = true;
    // Reset category filters
    this.$store.state.modules.filters.filteredCategories.forEach(
      (categoryName: string) => {
        this.$store.dispatch(
          'modules/filters/modifyCategoryFilters',
          categoryName,
        );
      },
    );
  }

  closeCategoryEditing() {
    this.editCategories = false;
    this.deleteSelected = false;
    this.showTrashBin = false;
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

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  }
}
</script>

<style scoped>
v-subheader {
  text-transform: capitalize;
}
.meetingName {
  word-break: break-word;
}
.subheader {
  text-transform: uppercase;
}
.mainDrawer {
  overflow: visible;
}
.drawerWrap {
  overflow: hidden;
}
.stickyTop {
  top: 0;
  position: sticky;
  position: -webkit-sticky;
  z-index: 5;
}

/***** GRADIENTS */
.g-carrot-rose {
  background: linear-gradient(
    135deg,
    var(--v-carrot-base) 0%,
    var(--v-rose-base) 100%
  ) !important;
}
</style>
