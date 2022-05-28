import {Middleware, Context} from '@nuxt/types';

const darkmodeMiddleware: Middleware = (context: Context) => {
  context.$vuetify.theme.dark =
    context?.store?.state?.modules?.base?.darkMode || false;
};

export default darkmodeMiddleware;
