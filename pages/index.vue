<template>
  <div class="bg-gray-800 h-1/2 w-1/2 flex justify-around items-center flex-col py-5 px-5">
    <span class="text-6xl underline">@braks/Bot-Ui</span>
    <span class="text-3xl">Welcome to braks Bot-UI!</span>
    <p>For more information visit <a href="https://github.com/braksgold/bot-ui">website</a></p>
    <div class="flex flex-row justify-center items-center">
      <router-link disabled class="bg-purple-500 btn" to="#">Get started</router-link>
      <router-link class="bg-blue-500 btn" to="/bot">Bots</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  name: 'Home',
  transition(to, from) {
    if (!from) {
      return 'fade';
    }
    const toPath = to.fullPath.split('/');
    const fromPath = from.fullPath.split('/');
    return toPath.length <= fromPath.length ? 'slide-right' : 'slide';
  }
})
export default class Welcome extends Vue {}
</script>
