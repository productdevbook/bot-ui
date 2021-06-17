<template>
  <v-overlay class="logout-overlay" z-index="99" opacity="0" :value="true">
    <h1 class="text-h5">You're being logged out...</h1>
    <v-progress-circular class="mt-4" indeterminate color="indigo"></v-progress-circular>
  </v-overlay>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  name: 'Logout',
  layout: 'basic',
  transition: 'default',
  auth: true,
  async created() {
    await this.$auth.logout();
    await this.$router.replace('/');
  }
})
export default class Logout extends Vue {}
</script>
<style lang="css">
.logout-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
