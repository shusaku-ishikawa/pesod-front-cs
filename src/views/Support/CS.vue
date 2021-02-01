<template>
  <base-layout>
    <template v-slot:title>
      <div
        class="bg-gray-400 py-2 w-full flex items-center"
      >
        <router-link
          :to="{ name: 'SupportTop' }"
          v-slot="{ href, navigate }"
        >
          <svg
            :href="href"
            @click="navigate"
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </router-link>
        <div>毛髪診断士に相談</div>
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
import ChatMessageCard from '@/views/Diagnostic/Doctors/Detail/Chat/MessageCard.vue';
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