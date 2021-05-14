<template>
  <div class="bg-gray-800 min-w-1/4 min-h-1/4 flex flex-col justify-center items-center">
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred - {{ error.statusCode }}</h1>
    <button @click="$router.replace('/')">Home page</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  props: ['error'],
  layout: 'login',
  transition: 'default'
})
export default class ErrorPage extends Vue {}
</script>
