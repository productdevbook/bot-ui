<template>
  <div
    :title="truncate ? element.name : ''"
    :class="[
      active ? 'bg-green-700 hover:bg-green-800' : 'bg-gray-800 hover:bg-gray-600',
      truncate ? 'flex justify-center bg-transparent' : 'rounded shadow'
    ]"
    class="pointer px-4 py-2"
    @click="$emit('click', element.id)"
  >
    <slot name="avatar"></slot>
    <div v-if="!truncate" class="col-span-8">
      <slot name="name">
        <span
          :class="[
            active ? 'text-white' : 'text-blue-400',
            size === 'sm' ? 'text-xs' : '',
            size === 'md' ? 'text-sm' : '',
            size === 'lg' ? 'text-md' : '',
            size === 'xl' ? 'text-lg' : ''
          ]"
          class="font-bold italic font-normal"
          >Name</span
        >
        <p
          :class="[
            size === 'sm' ? 'text-sm' : '',
            size === 'md' ? 'text-md' : '',
            size === 'lg' ? 'text-lg' : '',
            size === 'xl' ? 'text-xl' : ''
          ]"
          class="leading-none text-gray-400"
        >
          {{ element.name || '' }}
        </p>
      </slot>
      <slot name="description">
        <span
          :class="[
            active ? 'text-white' : 'text-blue-400',
            size === 'sm' ? 'text-xs' : '',
            size === 'md' ? 'text-sm' : '',
            size === 'lg' ? 'text-md' : '',
            size === 'xl' ? 'text-lg' : ''
          ]"
          class="italic font-bold font-normal"
        >
          Description
        </span>
        <p
          :class="[
            size === 'sm' ? 'text-sm' : '',
            size === 'md' ? 'text-md' : '',
            size === 'lg' ? 'text-lg' : '',
            size === 'xl' ? 'text-xl' : ''
          ]"
          class="leading-none text-gray-400"
        >
          {{ element.description || '' }}
        </p>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component({
  name: 'ListItem'
})
export default class ListItem extends Vue {
  @Prop({ type: Object, required: true }) element!: Record<string, string>;
  @Prop({ type: Boolean, required: false, default: false }) truncate!: boolean;
  @Prop({ type: Boolean, required: false, default: false }) active!: boolean;
  @Prop({ type: String, required: false, default: 'sm' }) size!: string;
}
</script>
