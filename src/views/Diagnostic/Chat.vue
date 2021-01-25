<template>
  <div class="flex-grow flex flex-col">
    <div class="flex items-center shadow-lg">
      <div class="">
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
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import useChat from '@/types/Chat';
import useDoctor from '@/types/Doctor';

import ChatMessageCard from '@/views/Diagnostic/Chat/MessageCard.vue';
import ChatForm from '@/views/Diagnostic/Chat/Form.vue';

export default defineComponent({
  components: {
    ChatMessageCard,
    ChatForm,
  },
  setup() {
    const route = useRoute();

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

    const { doctorId } = route.params;
    const intDoctorId = Array.isArray(doctorId) ? parseInt(doctorId[0]) : parseInt(doctorId);
    const doctor = doctors.value.find(d => d.id === intDoctorId);

    return {
      doctor,
      messages
    };
  }
})
</script>