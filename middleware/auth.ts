import { Context } from '@nuxt/types';

export default ({ route, redirect, app }: Context) => {
  if (process.env.TARGET_STAGE !== 'dev') {
    const requiresAuth = !route.name?.includes('login');
    const hasToken = !!app.$apolloHelpers.getToken();
    if (requiresAuth) {
      if (!hasToken) {
        redirect('/login');
      }
    } else if (!requiresAuth) {
      if (hasToken) {
        redirect('/');
      }
    }
  }
};
