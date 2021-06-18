<template>
  <div class="welcome-page d-flex justify-space-around align-center text-center">
    <div class="demo-flow-wrapper">
      <div
        class="headlines"
        :style="{
          left: $vuetify.breakpoint.mdAndUp ? '10%' : false,
          top: '25%',
          'margin-top': $vuetify.breakpoint.smAndDown ? '2rem' : false
        }"
      >
        <div v-if="!$auth.loggedIn">
          <h1 class="text-h5 text-md-h3">
            Create your ideas & accelerate your work with <br />
            <strong>@braks Bots</strong>.
          </h1>
          <h4 class="mt-4 text-h6">Use the flowchart editor to create fun conversations with your own chat bot.</h4>
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

        <div class="actions mt-4">
          <v-btn :to="$auth.loggedIn ? '/bot' : '/login'" class="ma-2" outlined color="success"> Get started</v-btn>
          <v-btn target="_blank" href="https://github.com/bcakmakoglu/bot-ui" class="ma-2" outlined color="blue">
            Check the repo
          </v-btn>
        </div>
      </div>

      <div id="demo-flow"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { OnLoadParams } from 'react-flow-renderer';
import { initDemo } from '../components/react/init-chart';

@Component({
  name: 'Home',
  auth: false,
  layout: (ctx) => {
    return ctx.app.$auth.$state.loggedIn ? 'default' : 'basic';
  },
  transition(to, from) {
    if (!from) {
      return 'default';
    }
    const toPath = to.fullPath.split('/');
    const fromPath = from.fullPath.split('/');
    return toPath.length <= fromPath.length && (from.name !== 'login' || to.name === 'login') ? 'slide-right' : 'slide';
  }
})
export default class Welcome extends Vue {
  mounted() {
    initDemo(document.getElementById('demo-flow'), this.onDemoLoad);
  }

  onDemoLoad(params: OnLoadParams) {
    params.setTransform({ x: 650.0, y: 75.0, zoom: 1.1 });
  }

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
  align-items: center;
  justify-content: center;
  display: flex;
  flex-flow: column;
  z-index: 10;
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

.demo-flow-wrapper {
  display: flex;
  justify-content: center;
}

.actions {
  display: flex;
  justify-content: center;
  flex-flow: row;
  align-items: center;
}
</style>
