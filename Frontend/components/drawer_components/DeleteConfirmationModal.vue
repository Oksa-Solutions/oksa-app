<template>
  <v-dialog value="true" max-width="340px" persistent>
    <v-card class="rounded-lg">
      <v-card-text>
        <v-card-title class="headline pb-6 realBlack--text">
          <v-icon class="mr-4" color="error">mdi-delete</v-icon>
          <h4 prepend-icon="mdi-delete">{{ $setContent('CONFIRMATION') }}</h4>
        </v-card-title>

        <v-card-subtitle class="px-6 py-3 rounded-0 semibold realBlack--text">
          {{ content }}
          <br />{{ $setContent('UNDOABLE') }}
        </v-card-subtitle>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <CancelButton @cancel="cancel" v-bind="{label: $setContent('CANCEL')}" />
        <v-btn color="error" @click="submit">{{ $setContent('DELETE') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
//import Vue from 'vue';
//import Component from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';

@Component({
  props: {
    // categoryName: {type: String, required: true},
    content: {type: String, required: true},
  },
})
export default class DeleteConfirmationModal extends Vue {
  cancel() {
    this.$emit('delete', false);
  }

  submit() {
    this.$emit('delete', true);
  }
}
</script>
