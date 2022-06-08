import {Context} from '@nuxt/types';
import {Inject} from '@nuxt/types/app';
import {LANGUAGES} from '~/assets/languages';

declare module 'vue/types/vue' {
  interface Vue {
    $setContent(content: string): string
  }
}

export default (context: Context, inject: Inject) => {
  inject('setContent', (content: string) => {
    return LANGUAGES[context.store.state.modules.base.language][content];
  });
};
