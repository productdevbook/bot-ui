<template>
  <div class="welcome-page d-flex justify-space-around align-center text-center">
    <div class="demo-flow-wrapper">
      <div class="headlines" :style="$vuetify.breakpoint.smAndUp ? 'left: 10%' : ''">
        <div>
          <h1>Create your ideas and accelerate your work with @braks Bot.</h1>
          <h4>Use a flowchart editor to create fun conversations with your own chat bot.</h4>
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
export default class Welcome extends Vue {}
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
