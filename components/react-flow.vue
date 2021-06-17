<template>
  <div id="braks-flowchart" style="display: flex; width: 100%; height: 100%"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { init } from './react/init-chart';

@Component({})
export default class Flow extends Vue {
  @Prop({
    type: Array,
    required: false,
    default: () => []
  })
  elements: any;

  mounted() {
    init(this.$el as HTMLElement, this.elements, this.reactClick);
  }

  reactClick(event) {
    console.log('Reactflow clicked', event);
  }
}
</script>
