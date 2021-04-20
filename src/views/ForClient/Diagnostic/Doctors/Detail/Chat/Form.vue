<template>
  <div class="w-full p-1">
    <form
      class="relative"
      @submit.prevent="() => {}"  
    >
      <svg
        @click="expand = !expand"
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 absolute cursor-pointer right-2 top-1 bg-white" viewBox="0 0 20 20" fill="currentColor">
        <path stroke="#374151" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8V4m0 0h4M3 4l4 4m8 0V4m0 0h-4m4 0l-4 4m-8 4v4m0 0h4m-4 0l4-4m8 4l-4-4m4 4v-4m0 4h-4" />
      </svg>
      <textarea 
        style="resize: none"
        placeholder="メッセージを入力"
        class="focus:outline-none w-full border-t p-2 pr-8 overflow-y-scroll"
        cols="30"
        :rows="expand ? 20 : 2"
        :value="modelValue"
        @input="onInputMessage"
      ></textarea>
      <div class="flex ">
        <slot name="menu"></slot>
        <button
          @click="onSendMessage"
          :disabled="!modelValue.trim()"
          class="ml-auto bg-gray-100 rounded-lg border text-sm" 
        >
          送信
        </button>
      </div>
    </form>
    
  </div>
</template>
<script lang="ts">
import { ref, computed, defineComponent, SetupContext, onMounted, } from 'vue';
import useChatLog from '@/types/ChatLog';
import { IMessageTemplate } from '@/types/Interfaces';

export default defineComponent({
  components: {
  },
  props: {
    modelValue: {
      type: String
    }
  },
  setup(props, ctx: SetupContext) {
    // const message = ref<string>('');
    
    const {
      fetchCustomerMessageTemplates
    } = useChatLog();

    const onInputMessage = (ev: InputEvent) => {
      const { target } = ev;
      console.log('innput chagne')
      if (!(target instanceof HTMLTextAreaElement)) return;
      ctx.emit('update:modelValue', target.value);
    };

    const onSendMessage = () => {
      ctx.emit('send');
    };
    
    const expand = ref(false);
    
   
    return {
      expand,
      // message,
      onInputMessage,
      onSendMessage,
    };
  }
})
</script>