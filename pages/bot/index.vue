<template>
  <div class="w-full flex flex-1 justify-center">
    <list-group
      :class="[id ? 'gap-0' : 'gap-4']"
      :grid="true"
      class="h-full w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 grid-rows-6"
    >
      <div
        key="bot-search"
        class="row-span-1 col-span-1 md:col-span-2 lg:col-span-4 xl:col-span-6 flex justify-center items-center"
      >
        <search
          :value="query"
          placeholder="Enter a name to find your bot"
          class="sm:w-full md:w-1/2"
          @input="($event) => (query = $event)"
        ></search>
      </div>
      <list-item
        v-for="bot of filteredBots"
        :key="bot.id"
        :element="bot"
        size="xl"
        class="row-span-2 col-span-1"
        @click="$router.push(`/v2/bot/${bot.id}`)"
      ></list-item>
    </list-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import getBots from './bots.graphql';
import ListGroup from '~/components/list/group.vue';
import ListItem from '~/components/list/item.vue';
import Search from '~/components/search.vue';

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
  bots: any[] = [];

  get id() {
    return this.$route.params.id;
  }

  get filteredBots() {
    return this.bots.filter((_) => _.name.toLowerCase().includes(this.query.toLowerCase())) || [];
  }

  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch();
    }
  }

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
