import type { NuxtConfig } from '@nuxt/types';

export const NuxtServerMiddlewareConfig: NuxtConfig['serverMiddleware'] = [];

if (process.env.TARGET_ENV === 'dev') {
  NuxtServerMiddlewareConfig.push(
    // Will register file from project server-middleware directory to handle /auth/* requires
    { path: '/auth', handler: '~/server-middleware/auth/index.ts' }
  );
}
