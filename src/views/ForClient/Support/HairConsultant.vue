<template>
  <base-layout>
    <template v-slot:title>
      <page-title>

        <div class="flex items-center absolute left-0">
          <router-link
            :to="{ name: 'SupportTop' }"
            v-slot="{ href, navigate }"
          >
            <page-title-back
              :href="href"
              @click="navigate"
            ></page-title-back>
          </router-link>
          <div>
            相談窓口
          </div>
        </div>
        
        <div>毛髪診断士に相談</div>
        <div
          class="w-3 h-3 shadow-lg rounded-full ml-1 text-white"
          :class="{ 'bg-green-400': wsState === 1, 'bg-gray-600': wsState === 3 }"
        > </div>
      </page-title>
    </template>
    <div class="flex-grow flex flex-col">
      <div
        ref="messageArea"
        class="relative overflow-y-auto flex-grow"
      >
        <div class="absolute w-full space-y-4 py-5">
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
import { defineComponent, onMounted, ref } from 'vue';
import ChatMessageCard from '@/views/ForClient/Diagnostic/Doctors/Detail/Chat/MessageCard.vue';
import ChatForm from '@/views/ForClient/Diagnostic/Doctors/Detail/Chat/Form.vue';

import { useRoute } from 'vue-router';
import useChatLog from '@/types/ChatLog';
import useSocket from '@/types/Socket';

export default defineComponent({
  components: {
    ChatForm,
    ChatMessageCard
  },
  setup() {
    const {
      chatLogs,
    } = useChatLog();

    const {
      connection,
      connect,
      messageArea,
      scrollDown,
      wsState,
      wsStateStr,
      message,
      prepareWs
    } = useSocket();
    
    const url = 'ws://localhost:8000/';
    
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
      prepareWs(url, chatLogs);
      window.setTimeout(() => {
        scrollDown();
      }, 100)
      
    });

    return {
      onSendMessage,
      message,
      chatLogs,
      messageArea,
      wsState
    };
  }
})
</script>