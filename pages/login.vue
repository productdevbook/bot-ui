<template>
  <form id="login-form" :class="error ? 'border border-red-500' : ''">
    <div class="headline">Welcome!</div>
    <span class="subline">
      Log into your account to get started!
      <br />
      If you don't have an account yet, you're currently out of luck.
      <br />
      Public registrations will be open soon.
    </span>
    <div class="flex flex-col flex-around justify-center items-center gap-6">
      <div class="flex flex-col">
        <label for="username" class="label uppercase font-extrabold text-blue-400"> Username </label>
        <div class="relative">
          <div class="absolute text-gray-600 dark:text-gray-400 flex items-center pl-4 h-full cursor-pointer">
            <i class="fas fa-user text-white"></i>
          </div>
          <input
            id="username"
            v-model="username"
            class="input-field"
            type="text"
            placeholder="Enter username"
            @input="error = false"
          />
        </div>
      </div>
      <div class="flex flex-col">
        <label for="password" class="label uppercase font-extrabold text-blue-400"> Password </label>
        <div class="relative">
          <div class="absolute text-gray-600 dark:text-gray-400 flex items-center pl-4 h-full cursor-pointer">
            <i class="fas fa-passport text-white"></i>
          </div>
          <input
            id="password"
            v-model="password"
            class="input-field"
            type="password"
            placeholder="Enter password"
            @input="error = false"
          />
        </div>
      </div>

      <transition name="fade" mode="out-in">
        <span v-show="error" class="text-red-500 text-center py-1">
          There was an issue while logging you in...
          <br />
          Please check your credentials and try again.
        </span>
      </transition>
      <button :disabled="disabled" :class="disabled ? 'bg-gray-700 btn-disabled' : 'bg-green-500 btn'" @click.prevent="submit">
        <transition-group name="fade" mode="out-in">
          <span v-show="$apollo.loading" key="loading"> <i class="fas fa-spinner fa-spin"></i></span>
          <span v-show="!$apollo.loading" key="login-text">Login</span>
        </transition-group>
      </button>
    </div>
  </form>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import login from '~/pages/login.graphql';

@Component({
  name: 'LoginForm',
  layout: 'login',
  transition: 'default'
})
export default class LoginForm extends Vue {
  username = '';
  password = '';
  error = false;

  get disabled() {
    return this.error || this.password === '' || this.username === '';
  }

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
      await this.$store.dispatch('user/login', { id: '0', username: this.username, roles: ['user'] });
      await this.$router.replace('/');
    } catch (e) {
      console.log(e);
      this.error = true;
    }
  }
}
</script>
<style>
.headline {
  @apply text-3xl underline pt-2 font-bold text-gray-200 max-w-sm text-center;
}

.subline {
  @apply max-w-sm text-center text-gray-500 text-sm lg:text-lg;
}

#login-form {
  @apply shadow-xl py-3 px-5 lg:px-3 bg-gray-800 rounded gap-6 flex flex-col justify-around items-center min-h-1/3 min-w-1/3;
}
</style>
