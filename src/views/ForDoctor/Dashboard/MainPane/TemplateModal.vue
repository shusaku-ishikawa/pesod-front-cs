<template>
  <div class="inline-block shadow-xl transform align-middle" >
    <div class="my-20 rounded bg-white px-6 py-4 sm:pb-4">
      <div class="mb-3 border-b">
        <div
          v-for="(t, i) in templates"
          :key="i"
          class="border-b py-2 text-left cursor-pointer"
          @click="selectedTemplate = t"
          :class="{ 'bg-blue-100': selectedTemplate && selectedTemplate.id == t.id }"
        >
          {{ t.message }}
        </div>
        
      </div>
      <div class="flex ">
        <button
          @click="onSelect"
          class="primary"
          :disabled="selectedTemplate == null"
        >
          選択
        </button>
        <button
          @click="onClose"
        >
          閉じる
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, SetupContext } from "vue";
import { IMessageTemplate } from '@/types/Interfaces';
import { runInContext } from "lodash";

export default defineComponent({
  components: {
    
  },
  props: {
    templates: {
      type: Object as () => IMessageTemplate[]
    }
  },
  emits: [
    'close',
    'select:template'
  ],
  setup(_, context: SetupContext) {
    const selectedTemplate = ref<IMessageTemplate | null>(null);
    
    const onClose = () => {
      context.emit('close')  
    };
    const onSelect = () => {
      if (selectedTemplate.value == null) return;
      context.emit('select:template', selectedTemplate.value);
    }
    return {
      selectedTemplate,
      onClose,
      onSelect
    }
  }
})
</script>
