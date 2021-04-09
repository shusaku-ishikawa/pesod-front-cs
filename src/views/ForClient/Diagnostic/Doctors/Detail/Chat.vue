<template>
  <base-layout v-if="myPrescript">
    <template v-slot:title>
      <div class="">
        <svg
          @click="() => { router.push({ name: 'DiagnosticTop' }) }"
          xmlns="http://www.w3.org/2000/svg"
          class="absolute h-6 w-6 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
        <div>
          診察ルーム
        </div>
      </div>
    </template>
    <!-- <div class="flex-grow flex flex-col"> -->
    
    <div
      ref="messageArea"
      class="relative overflow-y-auto flex-grow "
    >
       <page-title class="mb-3">
          <div class="flex items-center">
            <div>診察室</div>
            <div class="flex items-center text-sm ml-2">
              <div>[</div>
              <img
                v-if="doctor.image"
                :src="doctor.image"
                alt="doctor"
                style="height: 30px; width: 30px"
              >
              <svg
                v-else
                style="height: 30px; width: 30px"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
              <div class="px-2">
                {{ doctor.first_name }} {{ doctor.last_name }}
              </div>
              <div>]</div>
            </div>
          </div>
          
          <ws-state-marker
            :wsState="wsState"
          ></ws-state-marker>
      </page-title>
    
      <div class="absolute w-full space-y-4 pb-5">
        
        <chat-date-label
          v-if="chatLogs.length > 0"
          :dateStr="chatLogs[0].created_at"
        ></chat-date-label>
        <template
          v-for="(log, i) in chatLogs"
          :key="i"
        >
         
          <chat-date-label
            v-if="i > 1 && getDate(chatLogs[i].created_at) !== getDate(chatLogs[i - 1].created_at)"
            :dateStr="log.created_at"
          ></chat-date-label>
          <chat-message-card
          :chatLog="log"
          :isMyMessage="log.speaker === myPrescript.customer.id"
          ></chat-message-card>
          
        </template>
        
        <!-- <div
          class="px-2"
          v-if="myPrescript.prescript_products.length" 
        >
          <div
            class="bg-blue-400 text-white"
          >
            処方提案を受けています
          </div>
          <div
            class="flex items-center"
          >
            <button
              @click="onAcceptPrescriptProducts"
              class="bg-blue-400 text-white "
            >
              承諾
            </button>
            <button
              class="bg-gray-200 ml-2"
            >
              拒否
            </button>
            
          </div>
        </div> -->
      </div>
    </div>
    <!--  -->
    <div
      v-if="myPrescript.prescript_products.length && myPrescript.status >= 4"
      class="bg-gray-100 text-center py-3"
    >
      <div class="text-lg">診察は終了です。</div>
      <div>「<span class="text-blue-400 cursor-pointer" @click="router.push({ name: 'DiagnosticTop' })">お手続きメニュー</span>」へ戻る </div>
    </div>
    <chat-form
      v-if="myPrescript.status == 3"
      v-model="message"
      @send="onSendMessage"
    >
      <template v-slot:menu>
        <button
          @click="onAccept"
          class="rounded border text-sm ">
          はい
        </button>
        <button
          @click="onDeny"
          class="rounded border text-sm">
          いいえ
        </button>
        <button
          @click="sendMessage('承知しました')"
          class="rounded border text-sm">
          承知しました
        </button>
      
        <!-- <button
          @click="showMessageTemplates = !showMessageTemplates"
          class="border rounded-lg py-1 text-sm flex items-center"
        >
          <div>テンプレート</div>
          <svg
            v-if="!showMessageTemplates"
            class="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          <svg
            v-else
            class="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button> -->
      </template> 
    </chat-form>
    <div
      v-if="showMessageTemplates"
      style="height: 100px"
      class="relative overflow-y-scroll"
    >
      <ul
        v-if="customerMessageTemplates.length"
        class="absolute w-full"
      >
        <li
          @click="onSelectTemplate(t)"
          v-for="(t, i) in customerMessageTemplates"
          :key="i"
          class="border-b border-gray-100 hover:bg-gray-50"
        >
          {{ t.message }}
        </li>
      </ul>
      <div
        v-else
      >
        テンプレートがありません。
      </div>
    </div>
    <!-- </div> -->
  </base-layout>
</template>
<style lang="scss" scoped>
  div.date {
    padding: 0 10px;
  }
  div.date:before,
  div.date:after {
     content: "";
     flex: 1 1;
     border-bottom: 1px solid lightgray;
     margin: auto;
}
</style>
<script lang="ts">
import { callWithErrorHandling, computed, defineComponent, onBeforeMount, onBeforeUnmount, onMounted, ref, SetupContext } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useChatLog from '@/types/ChatLog';
import useDoctor from '@/types/Doctor';
import useSocket from '@/types/Socket';

import ChatMessageCard from './Chat/MessageCard.vue';
import ChatForm from './Chat/Form.vue';
import { IDoctor, IChatMessage, IMessageTemplate, IPrescript } from '@/types/Interfaces';
import usePrescript from '@/types/Prescript';
import useAuth from '@/types/Auth';

import WsStateMarker from '@/components/WsStateMarker.vue';

import moment from 'moment';

import ChatDateLabel from './Chat/DateLabel.vue';

export default defineComponent({
  components: {
    ChatMessageCard,
    ChatForm,
    WsStateMarker,
    ChatDateLabel
  },
  props: {
    doctor: {
      type: Object as () => IDoctor
    },
    
  },
  setup(props: any, context: SetupContext) {
    const route = useRoute();
    const router = useRouter();

    const {
      getToken
    } = useAuth();

    const {
      myPrescript,
      getPrescript,
      acceptPrescriptProducts,
      deletePrescriptProducts
    } = usePrescript();

    const {
      doctors,
      fetchDoctors
    } = useDoctor();

    const {
      chatLogs,
      fetchDoctorChatLogs,
      fetchCustomerMessageTemplates
    } = useChatLog();
    
    const {
      WS_BASE_URL,
      connection,
      connect,
      close,
      messageArea,
      scrollDown,
      wsState,
      wsStateStr,
      message,
      prepareWs
    } = useSocket();
    

    const customerMessageTemplates = ref<IMessageTemplate[]>([]);
    const showMessageTemplates = ref(false);
    const onSelectTemplate = (t: IMessageTemplate) => {
      // message.value = m;
      showMessageTemplates.value = false;
    };
    

    // alert(JSON.stringify(myPrescript.value))
    
    const sendMessage = (messageStr: string) => {
      if (myPrescript.value == null) return;
      if (connection.value == null) return;
      if (connection.value.readyState === connection.value.OPEN) {
        // send message
        // messageJson
        const messageJson: IChatMessage = {
          uuid: myPrescript.value.customer.uuid,
          message: messageStr,
        };
        connection.value.send(JSON.stringify(messageJson));
      }
    }
    
    const onAccept = async () => {
      if (myPrescript.value == null) return;
      if (myPrescript.value.prescript_products?.length) {
        // accept
        const data = await acceptPrescriptProducts();
      }
      myPrescript.value = await getPrescript();

      sendMessage('はい')
    };
    const onDeny = async () => {
      if (myPrescript.value == null) return;
      if (myPrescript.value.prescript_products?.length) {
        const data = await deletePrescriptProducts(myPrescript.value.prescript_no);
      }
      myPrescript.value = await getPrescript();
      sendMessage('いいえ')
    }
    
    const onSendMessage = () => {
      if (!message.value.trim()) return;
      sendMessage(message.value);
      message.value = '';
    };

    const onMessageReceivedCallback = async (messageJson: IChatMessage) => {
      if (messageJson.message.includes('table')) {
        
        myPrescript.value = await getPrescript();
        // if (data.prescript_products.length > 0) {
          
        // }
      }  
    };

    onMounted(async () => {
      myPrescript.value = await getPrescript();

      customerMessageTemplates.value = await fetchCustomerMessageTemplates();

      if (myPrescript.value == null) return;
      if (myPrescript.value.status != 3) {
        router.replace({ name: 'DiagnosticTop' })
      }
      try {
        const data = await fetchDoctorChatLogs(myPrescript.value.id);  
        chatLogs.value = data;
      } catch (err) {
        console.error(err.response)
        return;
      }
      const url = `${WS_BASE_URL}/chat/doctor/${myPrescript.value?.customer.uuid}/?token=${getToken()?.access}`;
    
      prepareWs(url, chatLogs, onMessageReceivedCallback);
      window.setTimeout(() => {
        scrollDown();
      }, 100)
      
    });

    onBeforeUnmount(() => {
      // alert('closing socket')
      close();
    })

    const getDate = (dateStr: string) => {
      return moment(dateStr).format('yyyy/MM/DD')
    }

   
    return {
      sendMessage,
      myPrescript,
      connection,
      router,
      messageArea,
      message,
      chatLogs,
      onSendMessage,
      wsState,
      wsStateStr,
      getDate,
      onSelectTemplate,
      customerMessageTemplates,
      showMessageTemplates,
      onDeny,
      onAccept
    };
  }
})
</script>