<template>
  <div class="w-full h-full flex flex-1 justify-center flex-row flex-wrap gap-8">
    <div class="w-full text-center flex flex-col gap-2">
      <span class="text-3xl lg:text-5xl">Bots</span>
      <span class="text-md lg:text-xl text-gray-500">
        Click on a card to start editing your bot or enter a name in the searchbar to look for it.
      </span>
    </div>
    <search
      :value="query"
      placeholder="Enter a name to find your bot"
      class="w-full md:w-1/2 flex justify-center items-center"
      @input="($event) => (query = $event)"
    ></search>
    <list-group row class="h-full w-full flex-wrap items-start justify-center gap-8">
      <list-item
        v-for="bot of filteredBots"
        :key="bot.id"
        :element="bot"
        size="xl"
        @click="$router.push(`/bot/${bot.id}`)"
      ></list-item>
    </list-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import getBots from './get_bots.graphql';
import ListGroup from '~/components/list/group.vue';
import ListItem from '~/components/list/item.vue';
import Search from '~/components/search.vue';
import { Bots } from '~/types/types';

@Component({
  name: 'Bot',
  components: { ListGroup, ListItem, Search },
  transition(to, from) {
    if (!from) {
      return 'fade';
    }
    const toPath = to.fullPath.split('/');
    const fromPath = from.fullPath.split('/');
    return {
      name: toPath.length < fromPath.length ? 'slide-right' : 'slide',
      mode: 'out-in'
    };
  }
})
export default class InfoBot extends Vue {
  query = '';
  bots: Pick<Bots, 'id' | 'name' | 'description'>[] = [];

  get id() {
    return this.$route.params.id;
  }

  get filteredBots() {
    return this.bots.filter((_) => _.name.toLowerCase().includes(this.query.toLowerCase())) || [];
  }

  /**
   activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch();
    }
  }
   */

  fetch() {
    try {
      const botObserver = this.$apollo.subscribe<{ bots: any[] }>({
        query: getBots
      });
      botObserver.subscribe((ev) => (this.bots = ev.data.bots), console.log);
    } catch (e) {
      console.log(e);
    }
  }
}
</script>
