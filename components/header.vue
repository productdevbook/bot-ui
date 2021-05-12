<template>
  <div class="flex flex-row justify-center items-center md:items-center mx-auto flex-initial" style="height: 10%">
    <transition-group name="fade" mode="out-in">
      <h1 v-if="botList" key="title" class="md:text-lg xl:text-xl mx-auto">Select a Bot</h1>
      <h1 v-else-if="botProfile" key="title" class="md:text-lg xl:text-xl mx-auto">Bot Profile</h1>
      <h1 v-else-if="interactionInfo" key="title" class="md:text-lg xl:text-xl mx-auto">Edit Conversation</h1>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  name: 'Header'
})
export default class Header extends Vue {
  get botList() {
    return this.$route.name === 'index/bot';
  }

  get botProfile() {
    return this.$route.name === 'index/bot/id';
  }

  get interactionInfo() {
    return this.$route.name === 'index/bot/id/interaction/interactionId';
  }
}
</script>
