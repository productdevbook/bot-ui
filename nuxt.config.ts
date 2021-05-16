import type { NuxtConfig } from '@nuxt/types';
import {
  NuxtBuildConfig,
  NuxtBuildModules,
  NuxtModules,
  NuxtHeaderConfig,
  NuxtPluginsConfig,
  NuxtRouterConfig,
  NuxtServerMiddlewareConfig,
  NuxtToasterConfig
} from './config';

const dev = process.env.TARGET_STAGE === 'dev' || true;
const ssr = process.env.SSR === 'true' || false;
const target = process.env.RENDER_TARGET || 'static';

const config = {
  dev,

  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr,

  telemetry: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: NuxtHeaderConfig,

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@fortawesome/fontawesome-free/css/all.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: NuxtPluginsConfig,

  // Auto import components (https://go.nuxtjs.dev/config-components)
  // if you're using true instead of paths make sure you understand that component names are created in accordance to directory structure
  // i.e. /components/Loading/Sky -> <loading-sky />
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: NuxtBuildModules,

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: NuxtModules,

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: NuxtBuildConfig,

  // Vue-Router Configuration
  router: NuxtRouterConfig,

  layoutTransition: {
    name: 'default',
    mode: 'out-in'
  },

  pageTransition: {
    name: 'slide',
    mode: 'out-in'
  },

  // Loading indicator
  loading: {
    color: '#2cc158',
    throttle: 200,
    height: '6px',
    continuous: true
  },

  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}',
        exclude: ['node_modules/*', 'types']
      }
    }
  },

  eslint: {
    exclude: 'types/*'
  },

  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },

  publicRuntimeConfig: {
    graphQlEndpoint: process.env.GRAPHQL_ENDPOINT,
    refreshInterval: process.env.REFRESH_INTERVAL || 600,
    stage: process.env.TARGET_STAGE || 'dev'
  },

  serverMiddleware: NuxtServerMiddlewareConfig,

  apollo: {
    clientConfigs: {
      default: '~/plugins/apollo/config.ts'
    }
  },

  toast: NuxtToasterConfig
} as NuxtConfig;

// some dev only options
if (process.env.TARGET_STAGE === 'dev') {
  // Hosting
  config.server = {
    host: '0.0.0.0',
    port: '8085'
  };
  // config.buildModules?.push('~/modules/ngrok', '~/modules/bot-api');
}

export default config;
