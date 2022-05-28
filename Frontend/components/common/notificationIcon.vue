<template>
  <div
    class="rounded-circle elevation-2 pa-2"
    style="position: relative; visibility: hidden"
  >
    <div v-if="notifications.length > 0" class="notificationDot" />
    <v-icon>mdi-bell</v-icon>
  </div>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component';
import {Vue, Component} from 'vue-property-decorator';
import {mapState} from 'vuex';

const notificationsProps = Vue.extend({
  computed: mapState({
    notifications: (state: any) => state.modules.profile.notifications,
  }),
});

@Component
export default class NotificationIcon extends mixins(notificationsProps) {}
</script>

<style scoped>
.notificationDot {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 12px;
  height: 12px;
  background: linear-gradient(115.87deg, #ff7b3d 0%, #f4619b 100%);
  border-radius: 50%;
  border: 1.5px solid #fff;
  z-index: 1;
}
</style>
