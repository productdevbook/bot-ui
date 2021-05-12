<template>
  <div class="flex flex-col">
    <div class="mb-6">
      <h1 class="text-xl font-bold text-gray-400 leading-5 pt-1">
        Information
        <i v-if="!edit" title="Edit" class="pl-2 text-sm pointer fas fa-pen" @click="toggle"></i>
        <span v-else>
          <i title="Save" class="pl-2 text-sm text-green-400 pointer fas fa-save" @click="$emit('edit', changes)"></i>
          <i title="Cancel" class="pl-2 text-sm text-red-600 pointer fas fa-ban" @click="edit = false"></i>
        </span>
      </h1>
      <h2 class="text-lg leading-5 text-gray-200">
        {{ title || '' }}
      </h2>
    </div>
    <div>
      <div class="mb-6">
        <div class="flex items-center">
          <div class="flex items-center">
            <span class="text-blue-400 truncate font-extrabold italic font-normal">Name</span>
          </div>
        </div>
        <input v-if="edit" id="input-name" v-model="changes.name" type="text" placeholder="Enter name" />
        <p v-else class="text-md leading-none text-gray-200">{{ name || '' }}</p>
      </div>
      <div class="mb-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <span class="text-blue-400 font-extrabold text-sm italic font-normal">Description</span>
          </div>
        </div>
        <input v-if="edit" id="input-description" v-model="changes.description" type="text" placeholder="Enter name" />
        <p v-else class="text-md leading-none text-gray-200">{{ description || '' }}</p>
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
