<template>
  <v-app id="app" dark>
    <v-app-bar class="header" app color="black" collapse-on-scroll elevation="20">
      <v-btn
        v-if="$auth.loggedIn && $vuetify.breakpoint.smAndDown"
        color="grey darken-1"
        class="mx-2"
        title="Logout"
        fab
        small
        @click="logout"
      >
        <v-avatar class="hidden-sm-and-down" color="grey darken-1 shrink" size="36">
          <img src="~static/default_avatar.png" alt="Avatar" />
        </v-avatar>
      </v-btn>

      <v-tabs slider-size="sm" centered class="ml-n9" color="white lighten-1">
        <v-tab to="/"> Home </v-tab>
        <v-tab v-if="$auth.loggedIn" disabled> Projects </v-tab>
        <v-tab v-if="$vuetify.breakpoint.smAndUp" disabled to="/about"> About</v-tab>
      </v-tabs>

      <v-btn v-if="$auth.loggedIn" class="mx-2" title="Logout" fab small color="dark" @click="logout">
        <v-avatar class="hidden-sm-and-down" color="grey darken-1 shrink" size="36">
          <img src="~static/default_avatar.png" alt="Avatar" />
        </v-avatar>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fill-height fluid class="justify-center">
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
  data: () => ({}),
  auth: true
})
export default class V2Layout extends Vue {
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
