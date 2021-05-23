<template>
  <div id="braks-flowchart"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { init } from './react/flowchart';

@Component({})
export default class Flow extends Vue {
  @Prop({
    type: Object,
    required: false,
    default: () => [
      {
        id: '1',
        type: 'input', // input node
        data: { label: 'Input Node' },
        position: { x: 250, y: 25 }
      },
      // default node
      {
        id: '2',
        // you can also pass a React component as a label
        data: {
          label: 'Default Node'
        },
        position: { x: 100, y: 125 }
      },
      {
        id: '3',
        type: 'output', // output node
        data: { label: 'Output Node' },
        position: { x: 250, y: 250 }
      },
      // animated edge
      { id: 'e1-2', source: '1', target: '2', animated: true },
      { id: 'e2-3', source: '2', target: '3' }
    ]
  })
  elements!: any;

  mounted() {
    init(this.$el, this.elements, this.reactClick);
  }

  reactClick(event) {
    console.log('Reactflow clicked', event);
  }
}
</script>
