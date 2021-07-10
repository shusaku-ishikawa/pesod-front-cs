<template>
  <div class="w-full p-1 border-t">
    <form
      class="relative"
      @submit.prevent="() => {}"  
    >
      <svg
        v-if="expand == false"
        @click="expand = true"
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 absolute cursor-pointer right-1 top-1 bg-white" viewBox="0 0 20 20" fill="currentColor">
        <path stroke="#374151" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8V4m0 0h4M3 4l4 4m8 0V4m0 0h-4m4 0l-4 4m-8 4v4m0 0h4m-4 0l4-4m8 4l-4-4m4 4v-4m0 4h-4" />
      </svg>
      <svg
        v-else
        @click="expand = false"
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 absolute cursor-pointer right-1 top-1 bg-white" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
      <textarea 
        style="resize: none"
        placeholder="メッセージを入力"
        class="text-sm focus:outline-none w-full p-2 pr-6 overflow-y-scroll"
        cols="30"
        :rows="expand ? 20 : 2"
        :value="modelValue  "
        @input="onInputMessage"
      ></textarea>
      <div class="flex ">
        <slot name="menu"></slot>
        <button
          @click="onSendMessage"
          :disabled="!modelValue.trim()"
          class="ml-auto bg-gray-100 rounded-lg border text-sm overflow-hidden overflow-ellipsis whitespace-nowrap" 
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
    const htmlify = (m: string) => {
      return m.replaceAll('\n', '<br>')
    }
    // const unhtmlify = (val: string) => {
      
    // }
   
    return {
      // unhtmlify,
      htmlify,
      expand,
      // message,
      onInputMessage,
      onSendMessage,
    };
  }
})
</script>