import { Context } from '@nuxt/types';

// Check if user has a JWT token present, if not redirect back to login
export default ({ route, redirect, app: { $apolloHelpers }, $config }: Context) => {
  if ($config.stage === 'dev') {
    const requiresAuth = !route.name?.includes('login');
    const hasToken = !!$apolloHelpers.getToken();
    if (requiresAuth) {
      if (!hasToken) {
        $apolloHelpers.onLogout();
        redirect('/login');
      }
    } else if (!requiresAuth) {
      if (hasToken) {
        redirect('/');
      }
    }
  }
};
