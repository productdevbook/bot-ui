<template>
  <div class="h-full">
    <search class="mb-6" placeholder="Search" :value="query" @input="($event) => (query = $event)"></search>
    <div :class="[id ? 'flex flex-row justify-between' : '']"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import ListGroup from './list/group.vue';
import ListItem from './list/item.vue';
import Search from './search.vue';

@Component({
  name: 'Sidebar',
  components: { ListGroup, ListItem, Search }
})
export default class Sidebar extends Vue {
  query = '';

  get id() {
    return this.$route.params.id;
  }

  get interactionId() {
    return this.$route.params.interactionId;
  }
}
</script>
