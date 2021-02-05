<template>
  <div class="w-full p-1">
    <form
      class="relative"
      @submit.prevent="() => {}"  
    >
      <textarea 
        class="focus:outline-none w-full border-t p-2"
        cols="30"
        rows="2"
        v-model="message"
      ></textarea>
      <div class="flex justify-between">
        <button
          @click="showMessageTemplates = true"
          class="border rounded-lg py-1 text-sm"
        >
          テンプレート
        </button>
        <button
          class="bg-gray-100 rounded-lg border text-sm" 
        >
          送信
        </button>
        
        <div
          v-if="showMessageTemplates"
          class="absolute bottom-10 "
        >
          <message-template-modal
            @select="onSelectTemplate($event)"
            @close="showMessageTemplates = false"
          ></message-template-modal>
        </div>
      </div>
    </form>
    
  </div>
</template>
<script lang="ts">
import { ref, computed, defineComponent, SetupContext, } from 'vue';
import MessageTemplateModal from './MessageTemplateModal.vue';

export default defineComponent({
  components: {
    MessageTemplateModal
  },
  props: {
  },
  setup(props, ctx: SetupContext) {
    const message = ref<string>('');
    
    const showMessageTemplates = ref(false);
    const onSelectTemplate = (m: string) => {
      message.value = m;
      showMessageTemplates.value = false;
    };

    return {
      message,
      onSelectTemplate,
      showMessageTemplates
    };
  }
})
</script>