<template>
  <div
    class="h-full flex flex-col w-full sm:px-1"
  >
    <div
      
      class=" sm:hidden py-1 bg-gray-200">
      <div class="absolute left-0 flex text-sm items-center">
        <svg
          @click="onPage('left')"
          class="w-6 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        <div>担当患者一覧</div>
      </div>
      <div>
        診察室
      </div>
    </div>
    <div class="sm:hidden flex items-center border-b border-black p-1 justify-between ">
      <div class="text-left">
        <div class="text-lg">
          ペルソナ太郎
        </div>
        <div class="text-xs">
          ID:000
        </div>
      </div>
      <svg
        @click="onPage('right')"
        class="w-8 cusrsor-pointer"
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
import { defineComponent, onMounted, SetupContext } from "vue";
import ChatForm from '@/views/ForClient/Diagnostic/Doctors/Detail/Chat/Form.vue';
import ChatMessageCard from '@/views/ForClient/Diagnostic/Doctors/Detail/Chat/MessageCard.vue';
import useChat from '@/types/Chat';

export default defineComponent({
  components: {
    ChatForm,
    ChatMessageCard
  },
  setup(_, context: SetupContext) {
    const {
      fetchMessages,
      messages
    } = useChat();
    
    onMounted(() => {
      fetchMessages();
    });

    const onPage = (page: string) => {
      // alert('page')
      context.emit('page', page);
    };

    return {
      onPage,
      messages
    };
  }
})
</script>
