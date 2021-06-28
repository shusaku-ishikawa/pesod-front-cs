<template>
  <div class="mt-14 inline-block shadow-xl transform align-middle text-sm" style="max-width: 700px" >
    <div class=" h-full rounded bg-white px-6 py-4 sm:pb-4">
      <div class="text-left">テンプレート選択</div>
      <div v-if="templates.length" class="mb-2">
        <div
          v-for="(t, i) in templates"
          :key="i"
          class="border rounded mb-1 py-2 px-4 text-left cursor-pointer hover:bg-blue-100"
          @click="onSelect(t)"
          :class="{ 'bg-blue-100': selectedTemplate && selectedTemplate.id == t.id }"
          style="min-height: 5rem;"
          v-html="htmlify(t.message)"
        >
        </div>
        
      </div>
      <div
        class="mb-2 text-xs pt-4"
        v-else
      >
        選択可能なテンプレートがありません。
        
      </div>
      <hr class="mb-3">
      <div class="flex ">
        <!-- <button
          @click="onSelect"
          class="border rounded "
          :disabled="selectedTemplate == null"
        >
          下書きに入力
        </button> -->
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
    const onSelect = (t: any) => {
      context.emit('select:template', t);
    }
    const htmlify = (m: string) => {
      return m.replaceAll('\n', '<br>')
    }
    return {
      selectedTemplate,
      onClose,
      htmlify,
      onSelect
    }
  }
})
</script>
