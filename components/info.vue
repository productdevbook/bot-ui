<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-xl font-bold text-gray-200 leading-5 pt-1">
      Information
      <i v-if="!edit" title="Edit" class="pl-2 text-sm pointer fas fa-pen" @click="toggle"></i>
      <span v-else>
        <i title="Save" class="pl-2 text-sm text-green-400 pointer fas fa-save" @click="$emit('edit', changes)"></i>
        <i title="Cancel" class="pl-2 text-sm text-red-600 pointer fas fa-ban" @click="edit = false"></i>
      </span>
    </h1>
    <h2 class="text-lg leading-5 text-gray-500">
      {{ title || '' }}
    </h2>
    <div class="flex flex-col">
      <label for="name" class="label uppercase font-extrabold text-blue-400"> Name </label>
      <div class="relative">
        <div class="absolute text-gray-600 dark:text-gray-400 flex items-center pl-4 h-full">
          <i :class="icon" class="fas text-white"></i>
        </div>
        <input id="name" v-model="changes.name" :disabled="!edit" :placeholder="name" class="input-field" type="text" />
      </div>
    </div>
    <div class="flex flex-col">
      <label for="description" class="label uppercase font-extrabold text-blue-400"> Description </label>
      <div class="relative">
        <div class="absolute text-gray-600 dark:text-gray-400 flex items-center pl-4 h-full">
          <i class="fas fa-pen text-white"></i>
        </div>
        <input
          id="description"
          v-model="changes.description"
          :disabled="!edit"
          :placeholder="description"
          :class="!edit ? 'bg-gray-800' : ''"
          class="input-field"
          type="text"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component({
  name: 'InfoTab'
})
export default class InfoTab extends Vue {
  @Prop({ type: String, required: false, default: 'fa-robot' }) icon!: string;
  @Prop({ type: String, required: true }) title!: string;
  @Prop({ type: String, required: true }) name!: string;
  @Prop({ type: String, required: false }) description?: string;

  toggle() {
    this.edit = true;
    this.changes.name = this.name;
    this.changes.description = this.description;
  }

  edit = false;
  changes: Record<string, string | undefined> = {
    name: '',
    description: ''
  };
}
</script>
