import {Context} from '@nuxt/types';
import {Inject} from '@nuxt/types/app';
import {LANGUAGES} from '~/assets/languages';

export default (context: Context, inject: Inject) => {
  inject('setContent', (content: string) => {
    return LANGUAGES[context.store.state.modules.base.language][content];
  });
};
