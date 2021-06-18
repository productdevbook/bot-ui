import type { NuxtConfig } from '@nuxt/types';

export const NuxtHeaderConfig: NuxtConfig['head'] = {
  title: '@braks bot-ui',
  htmlAttrs: {
    lang: 'en'
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: 'Create your ideas and have fun with @braks bots.' },
    { hid: 'og:title', property: 'og:title', content: '@braks bot-ui' },
    {
      hid: 'og:description',
      property: 'og:description',
      content: 'Create your ideas and have fun with @braks bots.'
    },
    { hid: 'og:image', property: 'og:image', content: 'https://braks-bot.vercel.app/icon.png' },
    {
      hid: 'og:site_name',
      property: 'og:site_name',
      content: 'braks-bot.vercel.app'
    },
    {
      hid: 'og:locale',
      property: 'og:locale',
      content: 'en'
    },
    {
      hid: 'og:image:type',
      property: 'og:image:type',
      content: 'image/png'
    }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    {
      rel: 'dns-prefetch',
      href: 'https://fonts.googleapis.com/',
      crossorigin: true
    }
  ]
};
