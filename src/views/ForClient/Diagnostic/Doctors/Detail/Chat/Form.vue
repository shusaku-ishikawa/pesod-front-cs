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
    
   
    return {
      // message,
      onInputMessage,
      onSendMessage,
    };
  }
})
</script>