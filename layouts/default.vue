<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <span v-if="$route.name !== 'index'" title="Back" class="nav-item nav-back grow" @click="$router.go(-1)">
        <i class="fas fa-chevron-left pr-1"></i>
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
    <span class="nav-item nav-menu grow">
      <i title="Menu" class="fas fa-bars" @click="visibleSidebar = !visibleSidebar"></i>
    </span>
    <div title="Logoff" class="nav-item top-4 right-4 grow hover:text-red-500" @click="logout">
      <i class="fas fa-power-off"></i>
    </div>
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
    await this.$store.dispatch('user/logout');
  }
}
</script>

<style>
.nav-item {
  @apply flex
  justify-center
  items-center
  rounded-full
  opacity-20
  hover:opacity-100
  fixed
  cursor-pointer;
}

.nav-menu {
  @apply w-6 h-6 lg:w-12
  lg:h-12
  fixed
  top-4
  left-4
  text-xl
  lg:border
  lg:text-2xl
  text-gray-400;
}

.nav-back {
  @apply w-8
  h-8
  fixed
  border
  border-2 border-gray-700
  text-gray-200
  left-4
  top-1/2
  bg-gray-600;
}

.grow {
  @apply transition
  duration-200
  ease-out
  transform
  hover:scale-110;
}
</style>
