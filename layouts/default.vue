<template>
  <v-app id="app" dark>
    <v-app-bar class="header" app color="black" collapse-on-scroll elevation="20">
      <v-btn
        v-if="$auth.loggedIn && $vuetify.breakpoint.smAndDown"
        color="grey darken-1"
        size="32"
        class="mx-2"
        title="Logout"
        fab
        dark
        small
        @click="logout"
      >
        <v-avatar class="hidden-sm-and-down" color="grey darken-1 shrink" size="36">
          <img src="~static/default_avatar.png" alt="Avatar" />
        </v-avatar>
      </v-btn>

      <v-tabs slider-size="sm" centered class="ml-n9" color="white lighten-1">
        <v-tab v-for="link in links" :key="link">
          {{ link }}
        </v-tab>
        <v-tab v-if="$vuetify.breakpoint.smAndUp"> About</v-tab>
      </v-tabs>

      <v-btn v-if="$auth.loggedIn" class="mx-2" title="Logout" fab dark small color="dark" @click="logout">
        <v-avatar class="hidden-sm-and-down" color="grey darken-1 shrink" size="36">
          <img src="~static/default_avatar.png" alt="Avatar" />
        </v-avatar>
      </v-btn>
      <v-btn v-else to="/login" class="mx-2" title="Login" fab dark small color="blue">
        <v-icon dark> {{ login }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fill-height fluid class="justify-center">
        <!--
        <transition name="fade" mode="out-in">
          <span v-if="$route.name !== 'index'" title="Back" class="nav-item nav-back grow" @click="$router.go(-1)">
            <i class="fas fa-chevron-left pr-1"></i>
          </span>
        </transition>
        <div title="Logoff" class="nav-item top-4 right-4 grow text-red-900 hover:text-red-500" @click="logout">
          <i class="fas fa-power-off"></i>
        </div>
        -->
        <Nuxt keep-alive :keep-alive-props="{ max: 10 }" />
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import '@/assets/scss/app.scss';
import { Component, Vue } from 'nuxt-property-decorator';
import { mdiLogin } from '@mdi/js';

@Component({
  name: 'V2Layout',
  data: () => ({})
})
export default class V2Layout extends Vue {
  links = ['Home', 'Bots'];
  login = mdiLogin;

  mounted() {
    if (this.$auth.loggedIn) {
      this.$auth.refreshTokens();
    }
  }

  async logout() {
    await this.$auth.logout();
  }
}
</script>

<style lang="scss">
.header {
  .v-toolbar__content {
    border-bottom: 0.5px solid white;
  }
}
</style>
