<template>
  <div class="grid flex-1 lg:mt-16 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-12 gap-6">
    <div class="col-span-3 hidden sm:hidden md:hidden lg:hidden xl:block">
      <sidebar></sidebar>
    </div>
    <div class="sm:col-span-1 lg:col-span-2 xl:col-span-6 flex justify-center">
      <div class="flex flex-col w-full lg:flex-row justify-center">
        <div class="h-full md:h-2/3 w-full flex items-center justify-center">
          <div class="h-full w-full grid sm:grid-cols-1 md:grid-cols-2 gap-4 rounded dark:bg-gray-800 shadow py-3 px-3">
            <transition name="fade" mode="out-in" class="col-span-1">
              <div v-if="$apollo.loading" class="flex justify-center items-center">Loading...</div>
              <info-tab
                v-else
                title="Here you can edit your interaction/s. Just pick an interaction from the list or create a new one! Easy, right?"
                :name="interaction.name"
                :description="interaction.description"
              >
              </info-tab>
            </transition>
            <div class="col-span-1">Some buttons here</div>
          </div>
        </div>
      </div>
    </div>
    <div class="sm:col-span-1 xl:col-span-3">Chat goes here</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import getInteractions from './get_interactions.graphql';
import InfoTab from '~/components/info.vue';
import Sidebar from '~/components/sidebar.vue';
import { Interactions } from '~/types/types';

@Component({
  name: 'InteractionInfo',
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
export default class InteractionInfo extends Vue {
  interactions: Interactions[] = [];

  get interaction() {
    return this.interactions[0];
  }

  fetch() {
    try {
      const interactionObserver = this.$apollo.subscribe<{ interactions: Interactions[] }>({
        query: getInteractions,
        variables: {
          id: this.$route.params.iaId
        }
      });
      interactionObserver.subscribe(
        (ev) => {
          console.log(ev);
          this.interactions = ev.data.interactions;
        },
        () => this.$router.replace(`/bot/${this.$route.params.id}`)
      );
    } catch (e) {
      console.log(e);
    }
  }
}
</script>
