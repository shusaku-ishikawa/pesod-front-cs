<template>
  <base-layout>
    <template v-slot:title>
       <div class="bg-gray-400 py-2">
          診断
        </div>
    </template>
    <div class="flex-grow flex flex-col">
      <div class="flex items-center shadow-lg">
        <div class="flex items-center">
          <svg
            class="w-10 h-10 cursor-pointer"
            @click="() => { router.push({ name: 'DiagnosticDoctorDetailTop' }) }"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          <svg
            class="w-10 h-10"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
        </div>
        <div>
          {{ doctor.name }}
        </div>
      </div>
      <div class="relative overflow-y-auto flex-grow flex flex-col">
        <div
          class="flex-grow overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
          <div class="absolute w-full space-y-4 ">
            <chat-message-card
            v-for="(m, i) in messages"
            :key="i"
            :message="m"
            ></chat-message-card>
          </div>
        </div>
      </div>
      <chat-form />
    </div>
  </base-layout>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useChat from '@/types/Chat';
import useDoctor from '@/types/Doctor';

import ChatMessageCard from './Chat/MessageCard.vue';
import ChatForm from './Chat/Form.vue';

export default defineComponent({
  components: {
    ChatMessageCard,
    ChatForm,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const {
      doctors
    } = useDoctor();
    const {
      messages,
      fetchMessages
    } = useChat();

    onMounted(() => {
      fetchMessages();  
    });

    const { id } = route.params;
    const intDoctorId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id);
    const doctor = doctors.value.find(d => d.id === intDoctorId);

    return {
      router,
      doctor,
      messages
    };
  }
})
</script>