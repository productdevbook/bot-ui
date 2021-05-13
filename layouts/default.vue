<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <span
        v-if="$route.name !== 'index'"
        title="Back"
        class="
          opacity-30
          hover:opacity-100
          pointer
          absolute
          rounded
          text-gray-200
          left-4
          top-1/2
          w-8
          h-8
          bg-gray-600
          flex
          items-center
          justify-center
        "
        @click="$router.go(-1)"
      >
        <i class="fas fa-chevron-left"></i>
      </span>
    </transition>
    <!--
    <input
      v-model="stars"
      type="checkbox"
      class="top-8 right-8 fixed"
      name="stars-button"
      title="Sterne einblenden (Animationen können die Webseite verlangsamen)"
    />
    -->
    <button class="btn bg-red-500 fixed top-0 right-0" @click="logout">Logout</button>
    <span class="rounded h-3 w-3 border-1">
      <i
        title="Menu"
        class="fas fa-bars fixed top-8 left-8 text-lg text-gray-400 pointer"
        @click="visibleSidebar = !visibleSidebar"
      ></i>
    </span>
    <div class="w-full h-full flex justify-center items-center" @click="hide">
      <Nuxt keep-alive :keep-alive-props="{ max: 10 }" :class="visibleSidebar" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import '@/assets/scss/app.scss';
import { timer, Subscription } from 'rxjs';

@Component({
  name: 'V2Layout',
  data: () => ({
    stars: false
  })
})
export default class V2Layout extends Vue {
  visibleSidebar: boolean = false;
  stars: boolean = false;
  interval?: Subscription;

  mounted() {
    this.refreshSession();
  }

  beforeDestroy() {
    this.interval.unsubscribe();
  }

  hide(): void {
    this.visibleSidebar = false;
  }

  refreshSession() {
    const expiry = ((Number(process.env.REFRESH_INTERVAL) ?? 300) - 60) * 1000;
    this.interval = timer(1, expiry).subscribe(async () => {
      try {
        const response = await fetch('/auth/refresh-token', {
          headers: {
            Authorization: `Bearer ${this.$apolloHelpers.getToken()}`
          }
        });
        console.log(response);
      } catch (e) {
        console.log(e);
        // await this.$router.replace('/login');
      }
    });
  }

  async logout() {
    await this.$apolloHelpers.onLogout();
    await this.$router.replace('/login');
  }
}
</script>
