import {Middleware, Context} from '@nuxt/types';

const teamMiddleware: Middleware = async (context: Context) => {
  if (context?.params?.uuid !== context?.store?.state?.modules?.team?.uuid) {
    return context.redirect('/dashboard');
  } else {
    const currentOrg =
      context?.store?.state?.modules?.organisation || undefined;
    const currentTeam = context?.store?.state?.modules?.team || undefined;
    if (currentOrg && currentTeam) {
      await context?.store?.dispatch('modules/team/readTeam', {
        uuid: currentTeam.uuid,
      });
    } else {
      return context.redirect('/dashboard');
    }
  }
};

export default teamMiddleware;
