import {Middleware, Context} from '@nuxt/types';

// This protects routes which need user to be logged in

const authMiddleware: Middleware = (context: Context) => {
  if (!context?.store?.state?.modules?.auth?.loggedIn) {
    return context.redirect('/signin');
  }
};

export default authMiddleware;
