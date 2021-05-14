<template>
  <div class="flex justify-start md:justify-center flex-1 flex-col items-center lg:flex-row">
    <div
      class="grid sm:grid-cols-1 md:grid-cols-2 row-span-4 gap-4 rounded dark:bg-gray-800 shadow-lg p-6 sm:w-full lg:w-1/2"
    >
      <transition name="fade" mode="out-in">
        <info-tab
          class="col-span-1"
          title="View or change your basic bot information here, or click edit conversation to get started editing this bots behavior!"
          :name="bot.name"
          :description="bot.description"
          @edit="update"
        ></info-tab>
      </transition>
      <div class="col-span-1 flex justify-center items-center">
        <div class="flex flex-col justify-center gap-4 h-full">
          <button class="btn btn-labeled flex flex-initial items-center bg-purple-500" @click="pushStart">
            <span class="btn-label"><i class="fas fa-cog" /></span>
            Edit conversation
          </button>
          <button class="btn btn-labeled flex items-center bg-blue-500">
            <span class="btn-label"><i class="fas fa-tree" /></span>
            Show flowchart
          </button>
          <button class="btn btn-labeled flex items-center bg-green-500">
            <span class="btn-label"><i class="fas fa-download" /></span>
            Download data
          </button>
          <button class="btn btn-labeled flex items-center bg-red-500">
            <span class="btn-label"><i class="fas fa-trash" /></span>
            Delete bot
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import getBot from './get.graphql';
import updateBot from './update.graphql';
import InfoTab from '~/components/info.vue';
import Sidebar from '~/components/sidebar.vue';

@Component({
  name: 'InfoBot',
  components: { InfoTab, Sidebar },
  transition(to, from) {
    if (!from) {
      return 'fade';
    }
    const toPath = to.fullPath.split('/');
    const fromPath = from.fullPath.split('/');
    return toPath.length < fromPath.length ? 'slide-right' : 'slide';
  }
})
export default class InfoBot extends Vue {
  bot = {
    id: '',
    name: '',
    description: '',
    order: [] as string[]
  };

  fetch() {
    try {
      const botObserver = this.$apollo.subscribe<{ bot: any }>({
        query: getBot
      });
      botObserver.subscribe((ev) => (this.bot = ev.data.bot), console.log);
    } catch (e) {
      console.log(e);
    }
  }

  async update(bot) {
    const toUpdate = { ...this.bot, ...bot };
    try {
      const updated = await this.$apollo.mutate({
        mutation: updateBot,
        variables: {
          id: this.bot.id,
          data: toUpdate
        }
      });
      console.log(`Bot updated at ${updated}`);
    } catch (e) {
      console.log(e);
      // todo error handling
    }
  }

  pushStart() {
    return this.$router.push(`/v2/bot/${this.bot.id}/interaction/${this.bot.order[0]}`);
  }
}
</script>
