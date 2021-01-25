<template>
  <base-layout>
    <template v-slot:title>
      <div
        class="bg-gray-400 py-2 w-full"
      >
        毛髪診断士に相談
      </div>
    </template>
    <div class="flex-grow flex flex-col">
      <div class="grid grid-cols-12 flex-grow flex flex-col">
        <div class="col-span-12 sm:col-span-10 sm:col-start-2 flex flex-col">
          <div class="flex items-center">
            <div>
              <svg
                class="w-10 h-10"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              毛髪診断士
            </div>
          </div>
          <div class="relative overflow-y-auto flex-grow">
            
            <chat-message-card
            v-for="(m, i) in messages"
            :key="i"
            :message="m"
            ></chat-message-card>
          </div>
        </div>
        
      </div>
    </div>
  </base-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ChatMessageCard from '@/views/Diagnostic/ChatMessageCard.vue';
import { useRoute } from 'vue-router';
import useChat from '@/types/Chat';

export default defineComponent({
  components: {
    ChatMessageCard
  },
  setup() {
    
    return null;
  }
})
</script>