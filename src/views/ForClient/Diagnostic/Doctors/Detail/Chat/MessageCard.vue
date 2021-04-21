<template>
  <div
    class="flex items-end px-1"
    :class="{ 'justify-end': isMyMessage }"
  >
    
    <div
      class="flex items-end space-y-1 mx-2"
      :class="{ 'flex-row-reverse ': isMyMessage }"
      
    >
      <span
        v-html="chatLog.message"
        :class="{ 'rounded-bl-none bg-gray-100': !isMyMessage, 'rounded-br-none': isMyMessage }"
        class="text-left sm:max-w-sm md:max-w-md break-words leading-5 px-4 py-4 rounded-lg inline-block text-gray-600 "
        :style="{ 'font-size': '12px', 'background-color': isMyMessage ? '#CCEAFF' : '' }"
      >
        
      </span>
      <div class="text-xs mx-2">
        {{ HHMM(chatLog.created_at) }}
      </div>
    </div>
    
    <!-- <img
      v-if="isMyMessage"
      src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" class="w-6 h-6 rounded-full order-1"> -->
  </div>
</template>
<script lang="ts">
import moment from 'moment';

import { computed, defineComponent, SetupContext, } from 'vue';

import { IChatLog } from '@/types/Interfaces';
import usePrescript from '@/types/Prescript';

export default defineComponent({
  components: {
    
  },
  props: {
    chatLog: {
      type: Object as () => IChatLog,
      required: true
    },
    isMyMessage: {
      type: Boolean
    }
  },
  setup(props: any, ctx: SetupContext) {
    

    
    
    
    const HHMM = (dateStr: string) => {
      return moment(dateStr).format('H:mm')
    }
    
    const htmlify = (m: string) => {
      return m.replaceAll('\n', '<br>')
    }
    return {
      HHMM,
      htmlify
    };
  }
})
</script>