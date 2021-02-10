<template>
  <base-layout>
    <template v-slot:title>
      <page-title>
        <div>
          診察室
        </div>
        <div
          class="w-3 h-3 shadow-lg rounded-full ml-1 text-white"
          :class="{ 'bg-green-400': wsState === 1, 'bg-gray-600': wsState === 3 }"
        >
          
        </div>
      </page-title>
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
      <div
        ref="messageArea"
        class="relative overflow-y-auto flex-grow"
      >
        <div class="absolute w-full space-y-4 pb-5">
          <chat-message-card
          v-for="(m, i) in messages"
          :key="i"
          :message="m"
          ></chat-message-card>
        </div>
      </div>
      <chat-form
        v-model="message"
        @send="onSendMessage"
      />
      
    </div>
  </base-layout>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useChat from '@/types/Chat';
import useDoctor from '@/types/Doctor';
import useSocket from '@/types/Socket';

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
      fetchMessages,
      addMessage
    } = useChat();
    
    const {
      connection,
      connect
    } = useSocket();
    
    const messageArea = ref<HTMLElement | null>(null);
    const scrollDown = () => {
      if (messageArea.value == null) return;
      messageArea.value.scrollTop = messageArea.value.scrollHeight;

    };

    const wsState = ref<number | null>(null);
    const wsStateStr = computed(() => {
      if (wsState.value === 1) {
        return 'Open';
      } else if (wsState.value === 3) {
        // close
        return 'Closed';
      }
    });
    const prepareWs = () => {
      connect('ws://localhost:8000/')
      wsState.value == 0;
      if (connection.value == null) return;
      connection.value.onopen = (ev) => {
        if (connection.value == null) return;
        // connection.value.send('hoge');
        console.log('on open');
        wsState.value = connection.value.OPEN;
        
      };
      connection.value.onmessage = (ev: MessageEvent) => {
        console.log('message ' + ev.data);
        const messageJson = JSON.parse(ev.data);
        
        const newMessage = {
          id: 1,
          ...messageJson
        };
        addMessage(newMessage);
        window.setTimeout(() => {
          scrollDown()
        }, 100);
        // scrollDown();
      };
      connection.value.onclose = (ev: CloseEvent) => {
        console.log('on close')
        if (connection.value == null) return;
        wsState.value = connection.value.CLOSED;
      };
      connection.value.onerror = (ev: Event) => {
        console.log('on error')
        if (connection.value == null) return;
        
      };
      
    };
    
    const message = ref<string>('');
    const onSendMessage = () => {
      if (connection.value == null) return;
      if (!message.value.trim()) return;
      if (connection.value.readyState === connection.value.OPEN) {
        // send message
        // messageJson
        const messageJson = {
          speaker: {
            id: 1,
            name: 'Robert'
          },
          message: message.value
        };
        try {
          connection.value.send(JSON.stringify(messageJson));
          message.value = ''; // reset 
        } catch (err) {
          console.error('errr')
        }
      }
    };

    onMounted(() => {
      fetchMessages();
      prepareWs();
      window.setTimeout(() => {
        scrollDown();
      }, 100)
      
    });

    const { id } = route.params;
    const intDoctorId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id);
    const doctor = doctors.value.find(d => d.id === intDoctorId);
    
    
    return {
      connection,
      router,
      doctor,
      messageArea,
      message,
      messages,
      onSendMessage,
      wsState,
      wsStateStr
    };
  }
})
</script>