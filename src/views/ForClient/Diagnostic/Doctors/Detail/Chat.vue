<template>
  <base-layout>
    <template v-slot:title>
      <div class="bg-gray-400 py-2">
        診察室
      </div>
    </template>
    <div class="flex-grow flex flex-col">
      <div class="flex items-center">  
        <svg
          class="w-10 h-10"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
        </svg>
        <div>
          {{ doctor.name }}
        </div>
      </div>
      <div class="relative overflow-y-auto flex-grow">
      
        <div class="absolute w-full space-y-4 ">
          <chat-message-card
          v-for="(m, i) in messages"
          :key="i"
          :message="m"
          ></chat-message-card>
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