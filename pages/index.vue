<template>
  <div class="welcome-page d-flex justify-space-around align-center text-center">
    <div class="demo-flow-wrapper">
      <div class="headlines" :style="$vuetify.breakpoint.smAndUp ? 'left: 10%' : ''">
        <div v-if="!$auth.loggedIn">
          <h1>Create your ideas and accelerate your work with @braks Bot.</h1>
          <h4 class="mt-4">Use the flowchart editor to create fun conversations with your own chat bot.</h4>
        </div>
        <div v-else class="blue--text">
          <h1>
            <span>
              Hello,
              <strong> {{ username }} </strong>
              ! <br />
            </span>
          </h1>
          <h4><span>Start a new project or edit one of your existing ones.</span></h4>
        </div>
      </div>

      <div id="demo-flow"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { initDemo } from '../components/react/init-chart';

@Component({
  name: 'Home',
  auth: false,
  transition(to, from) {
    if (!from) {
      return 'default';
    }
    const toPath = to.fullPath.split('/');
    const fromPath = from.fullPath.split('/');
    return toPath.length <= fromPath.length && (from.name !== 'login' || to.name === 'login') ? 'slide-right' : 'slide';
  },
  mounted() {
    initDemo(document.getElementById('demo-flow'));
  }
})
export default class Welcome extends Vue {
  get username() {
    return this.$auth.user?.username || '';
  }
}
</script>
<style lang="scss">
.headlines {
  word-break: break-word;
  position: fixed;
  max-width: 420px;
  height: 75%;
  align-items: center;
  display: flex;
}

.welcome-page {
  height: 100%;
  width: 100vw;
}

.demo-flow-wrapper,
#demo-flow,
.react-flow {
  flex: 1 1 auto;
  min-height: 360px;
  height: 100%;
}
</style>
