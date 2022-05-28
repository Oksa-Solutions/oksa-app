import {Context} from '@nuxt/types';
import {Inject} from '@nuxt/types/app';
import Vue from 'vue';
import {MeetingInterface} from '~/store/modules/meeting';

export default (context: Context, inject: Inject) => {
  inject('initialLoad', async () => {
    if (context?.store?.state?.modules?.user?.uuid !== '') {
      await context.store.dispatch('modules/user/read', {
        uuid: context.store.state.modules.user.uuid,
      });
    } else {
      const dontCreateUserPaths = ['signin'];
      if (!dontCreateUserPaths.includes(context?.route?.name || '')) {
        await context.store.dispatch('modules/user/create');
      }
    }
  });
};
