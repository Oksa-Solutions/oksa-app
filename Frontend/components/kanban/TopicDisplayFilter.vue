<template>
  <v-dialog value="true" max-width="430px" persistent>
    <v-card class="rounded-lg">
      <v-card-title class="headline pb-6">
        <v-icon class="mr-4 realBlack--text">mdi-playlist-check</v-icon>
        <h4>Selected topics</h4>
      </v-card-title>

      <v-card-text>
        <p>
          Every approved idea of the selected topics will be added to this topic.
        </p>
      </v-card-text>

      <v-text-field
        hide-details
        single-line
        append-icon="mdi-magnify"
        label="Filter"
        cols="1"
        class="px-6 pt-0 pb-4 flex-grow-1 flex-shrink-0"
        :value="searchText"
        @input="(searchText) => submitSearchText(searchText)"
        @click:clear="submitSearchText('')"
        clearable
        color="primary"
      />

      <div
        v-for="topic in topics.filter((t) =>
          t.name.toLowerCase().includes(searchText.toLowerCase()),
        )"
        :key="topic.uuid"
        class="d-flex flex-row pl-2 pr-6 pb-2"
      >
        <v-icon class="px-4" @click="toggleSelected(topic)">
          {{
            selected.includes(topic.uuid)
              ? 'mdi-checkbox-marked'
              : 'mdi-checkbox-blank-outline'
          }}
        </v-icon>
        <TopicItem v-bind="{topic}" />
      </div>

      <v-card-actions class="px-6 pt-2 pb-4">
        <v-spacer />
        <CancelButton @cancel="closeModal(true)" v-bind="{label: 'Cancel'}" />
        <SubmitButton @done="closeModal(false)" v-bind="{label: 'Done'}" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {MeetingInterface} from '~/store/modules/meeting';

@Component({
  props: {
    topics: {type: Array as () => MeetingInterface[], required: true},
    selectedTopics: {type: Array as () => string[], required: true},
  },
})
export default class TopicDisplayFilterProps extends Vue {
  selected: string[] = [];
  searchText: string = '';

  mounted() {
    this.selected = [...this.selectedTopics];
  }

  submitSearchText(s: string) {
    this.searchText = s || '';
  }

  closeModal(cancel: boolean) {
    this.$emit('closed', cancel ? [...this.selectedTopics] : this.selected);
  }

  toggleSelected(t: MeetingInterface) {
    const idx = this.selected.findIndex((uuid: string) => uuid === t.uuid);
    idx === -1
      ? this.selected.push(t.uuid)
      : (this.selected = this.selected.filter(
          (uuid: string) => uuid != t.uuid,
        ));
  }
}
</script>
