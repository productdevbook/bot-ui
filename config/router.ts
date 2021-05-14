import type { NuxtConfig } from '@nuxt/types';

export const NuxtRouterConfig: NuxtConfig['router'] = {
  base: '/',
  routeNameSplitter: '/',
  mode: 'history',
  middleware: 'auth'
};
