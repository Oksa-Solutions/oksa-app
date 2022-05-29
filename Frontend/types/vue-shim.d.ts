import Vue from 'vue';
// import {Store} from 'vuex';
// import {RootState} from '../store'

declare module '*.vue' {
  export default Vue;
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    middleware?: string | string[];
  }
}
