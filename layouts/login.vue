<template>
  <div id="app">
    <Nuxt />
  </div>
</template>
<script lang="ts">
import '@/assets/scss/app.scss';
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  name: 'LoginLayout'
})
export default class LoginLayout extends Vue {}
</script>
