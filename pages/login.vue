<template>
  <form id="login-form" :class="error ? 'border border-red-500' : ''">
    <span class="text-3xl underline py-2 font-bold">Login</span>
    <div class="flex flex-col">
      <label for="username"> Username </label>
      <input id="username" v-model="username" type="text" placeholder="Enter username" @input="error = false" />
    </div>
    <div class="flex flex-col">
      <label for="password"> Password </label>
      <input id="password" v-model="password" type="password" placeholder="Enter password" @input="error = false" />
    </div>

    <transition name="fade" mode="out-in">
      <span v-show="error" class="text-red-500 text-center py-1">
        There was an issue while logging you in... Please check your credentials and try again.
      </span>
    </transition>
    <button class="bg-green-500 btn" @click.prevent="submit">Login</button>
  </form>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import login from '~/pages/login.graphql';

@Component({
  name: 'LoginForm',
  layout: 'login',
  transition(to, from) {
    if (!from) {
      return 'fade';
    }
    const toPath = to.fullPath.split('/');
    const fromPath = from.fullPath.split('/');
    return toPath.length <= fromPath.length ? 'slide' : 'slide-right';
  }
})
export default class LoginForm extends Vue {
  username = '';
  password = '';
  error = false;

  async submit() {
    try {
      const res = await this.$apollo.mutate<{ login: { accessToken: string } }>({
        mutation: login,
        variables: {
          data: {
            username: this.username,
            password: this.password
          }
        }
      });
      await this.$apolloHelpers.onLogin(res.data.login.accessToken);
      await this.$router.replace('/');
    } catch (e) {
      console.log(e);
      this.error = true;
    }
  }
}
</script>
<style>
#login-form {
  @apply py-3 px-5 bg-gray-800 rounded flex flex-col justify-around items-center w-full h-full md:w-1/2 md:h-1/2;
}

#password,
#username {
  @apply text-gray-600
  dark:text-gray-400
  focus:outline-none
  focus:border-indigo-700
  dark:focus:border-indigo-700
  dark:border-gray-700
  dark:bg-gray-700
  bg-white
  font-normal
  w-64
  h-10
  flex
  items-center
  pl-3
  text-sm
  border-gray-300
  rounded
  border
  shadow;
}

label {
  @apply text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2;
}
</style>
