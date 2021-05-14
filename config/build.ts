import type { NuxtConfig } from '@nuxt/types';

export const NuxtBuildConfig: NuxtConfig['build'] = {
  transpile: ['vuex-module-decorators'],
  plugins: [],
  extractCSS: true,
  postcss: true,
  loadingScreen: true,
  indicator: true,
  splitChunks: {
    commons: true,
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
};
