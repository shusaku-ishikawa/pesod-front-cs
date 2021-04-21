<template>
  <div class="inline-block shadow-xl transform align-middle text-sm" >
    <div class="my-20 rounded bg-white px-6 py-4 sm:pb-4">
      <div class="text-left">テンプレート選択</div>
      <div class="mb-2">
        <div
          v-for="(t, i) in templates"
          :key="i"
          class="border rounded mb-1 py-2 px-4 text-left cursor-pointer hover:bg-blue-100"
          @click="selectedTemplate = t"
          :class="{ 'bg-blue-100': selectedTemplate && selectedTemplate.id == t.id }"
          style="min-height: 5rem;"
        >
          {{ t.message }}
        </div>
        
      </div>
      <hr class="mb-3">
      <div class="flex ">
        <button
          @click="onSelect"
          class="border rounded "
          :disabled="selectedTemplate == null"
        >
          下書きに入力
        </button>
        <button
          @click="onClose"
          class="ml-auto bg-gray-200 text-white"
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
