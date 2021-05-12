<template>
  <transition-group
    :class="[row && !grid ? 'flex-row' : 'flex-col', grid ? 'grid' : 'flex', scroll ? 'overflow-scroll' : '']"
    name="fade"
    mode="out-in"
    tag="div"
  >
    <slot></slot>
  </transition-group>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component({
  name: 'List'
})
export default class List extends Vue {
  @Prop({ type: Boolean, required: false, default: false }) row!: boolean;
  @Prop({ type: Boolean, required: false, default: false }) grid!: boolean;
  @Prop({ type: Boolean, required: false, default: false }) scroll!: boolean;
}
</script>
