<template>
  <v-dialog value="true" max-width="430px" persistent>
    <v-card>
      <v-card-title class="card-title bold">
        <v-icon class="pl-1 pr-3">mdi-playlist-check</v-icon>
        Selected topics
      </v-card-title>

      <v-card-subtitle class="card-title py-8">
        Every approved idea of the selected topics will be added to this topic.
      </v-card-subtitle>

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
import {Vue, Component} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import {MeetingInterface} from '~/store/modules/meeting';

const topicDisplayFilterProps = Vue.extend({
  props: {
    topics: {type: Array as () => MeetingInterface[], required: true},
    selectedTopics: {type: Array as () => string[], required: true},
  },
});

@Component({})
export default class TopicDisplayFilterProps extends mixins(
  topicDisplayFilterProps,
) {
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
