// import Vue from 'vue';
// import {Store} from 'vuex';
// import {RootState} from '../store'
import {Vue} from 'vue-property-decorator';

declare module '*.vue' {
  export default Vue;
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    middleware?: string | string[];
  }
}
