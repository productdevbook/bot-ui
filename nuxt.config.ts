import type { NuxtConfig } from '@nuxt/types';

const dev = process.env.TARGET_STAGE === 'dev' || true;
const ssr = process.env.SSR === 'true' || false;

const config = {
  dev,

  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr,

  telemetry: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: ssr ? 'server' : 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: '@braks/bot-ui',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@fortawesome/fontawesome-free/css/all.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  // if you're using true instead of paths make sure you understand that component names are created in accordance to directory structure
  // i.e. /components/Loading/Sky -> <loading-sky />
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxt/components',
    '@nuxtjs/tailwindcss'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxtjs/proxy', '@nuxtjs/apollo'],

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.GRAPHQL_ENDPOINT
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ['vuex-module-decorators'],
    plugins: [],
    extractCSS: true,
    postcss: true,
    loadingScreen: true,
    indicator: true,
    splitChunks: {
      commons: true,
      layouts: true,
      pages: true
    },
    babel: { compact: true },
    extend(config, { isDev, isClient, loaders: { vue } }) {
      config.node = {
        fs: 'empty'
      };
      if (isDev) {
        config.mode = 'development';
        config.devtool = 'source-map';
      }
      if (isClient) {
        if (config.optimization?.splitChunks) {
          config.optimization.splitChunks.maxSize = 200000;
        }
        if (vue) {
          vue.transformAssetUrls = {
            img: 'src',
            image: 'xlink:href',
            'b-avatar': 'src',
            'b-img': 'src',
            'b-img-lazy': ['src', 'blank-src'],
            'b-card': 'img-src',
            'b-card-img': 'src',
            'b-card-img-lazy': ['src', 'blank-src'],
            'b-carousel-slide': 'img-src',
            'b-embed': 'src'
          };
        }
      }
    }
  },

  // Hosting
  server: {
    host: '0.0.0.0',
    port: '8085'
  },

  // Vue-Router Configuration
  router: {
    base: '/',
    routeNameSplitter: '/',
    mode: 'history',
    middleware: 'auth'
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
        exclude: 'node_modules/*'
      }
    }
  },

  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },

  env: {
    TARGET_STAGE: process.env.TARGET_STAGE || 'dev'
  },

  publicRuntimeConfig: {
    publicKey: process.env.FAUNADB_PUBLIC_KEY
  },

  serverMiddleware: [
    // Will register file from project server-middleware directory to handle /auth/* requires
    { path: '/auth', handler: '~/server-middleware/auth/index.ts' }
  ]
} as NuxtConfig;

// some dev only options
if (process.env.TARGET_STAGE === 'dev') {
  // config.buildModules?.push('~/modules/ngrok', '~/modules/bot-api');

  config.proxy = {
    disableHostCheck: true,
    '/api': {
      target: process.env.API_URL ?? 'http://localhost:3000', // set a custom api url in Dockerfile if you need to
      changeOrigin: process.env.SSR || false,
      secure: false,
      pathRewrite: {
        '^/api': ''
      },
      onProxyReq(request: any) {
        request.setHeader('origin', '*');
        request.setHeader('Accept', 'application/json');
        request.setHeader('Content-Type', 'application/json');
      }
    }
  };
}

export default config;
