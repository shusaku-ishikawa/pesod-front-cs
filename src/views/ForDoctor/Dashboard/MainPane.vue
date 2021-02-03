<template>
  <div
    class="h-full flex flex-col w-full sm:px-1"
  >
    <div  class=" sm:hidden py-1 bg-gray-200 flex">
      一覧に戻る
    </div>
    <div class="sm:hidden flex items-center border-b border-black p-2 justify-between">
      <div class="text-left">
        <div class="text-2xl">
          ペルソナ太郎
        </div>
        <div class="text-sm">
          ID:000
        </div>
      </div>
      <svg
        class="w-10"
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    </div>
    <div
      class="flex-grow overflow-auto relative"
    >
      <div
        class="absolute w-full space-y-4"
      >
        <chat-message-card
          v-for="(m, i) in messages"
          :key="i"
          :message="m"
        ></chat-message-card>
      </div>
      
    </div>
    <div>
      <chat-form></chat-form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import ChatForm from '@/views/ForClient/Diagnostic/Doctors/Detail/Chat/Form.vue';
import ChatMessageCard from '@/views/ForClient/Diagnostic/Doctors/Detail/Chat/MessageCard.vue';
import useChat from '@/types/Chat';

export default defineComponent({
  components: {
    ChatForm,
    ChatMessageCard
  },
  setup() {
    const {
      fetchMessages,
      messages
    } = useChat();
    
    onMounted(() => {
      fetchMessages();
    });

    return {
      messages
    };
  }
})
</script>
