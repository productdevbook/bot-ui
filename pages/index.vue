<template>
  <div class="bg-gray-800 flex gap-8 justify-around items-center flex-col p-8 lg:p-12 rounded shadow-xl">
    <span class="text-4xl lg:text-6xl underline text-gray-200">@braks Bot-Ui</span>
    <span class="text-xl lg:text-3xl text-gray-400">Welcome {{ username }}!</span>
    <p>For more information visit <a href="https://github.com/braksgold/bot-ui">website</a></p>
    <div class="flex flex-row flex-wrap justify-center items-center">
      <router-link disabled class="bg-purple-500 btn" to="#">Get started</router-link>
      <router-link class="bg-blue-500 btn" to="/bot">Bots</router-link>
    </div>
    <react-flow></react-flow>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import ReactFlow from '../components/react-flow.vue';

@Component({
  name: 'Home',
  components: { ReactFlow },
  transition(to, from) {
    if (!from) {
      return 'default';
    }
    const toPath = to.fullPath.split('/');
    const fromPath = from.fullPath.split('/');
    return toPath.length <= fromPath.length && (from.name !== 'login' || to.name === 'login') ? 'slide-right' : 'slide';
  }
})
export default class Welcome extends Vue {
  get username() {
    return this.$store.getters['user/me'].username;
  }
}
</script>
