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
    <div class=" flex items-center border-b border-black p-1 justify-between" v-if="prescript">
      <div class="flex items-center">
        <div class="text-lg">
          {{ prescript.customer.first_name }} {{ prescript.customer.last_name }} 様との会話
        </div>
        <ws-state-marker
          class="ml-2"
          :wsState="wsState"
        ></ws-state-marker>
      </div>
      <svg
        @click="onPage('right')"
        class="sm:hidden w-8 cusrsor-pointer"
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    </div>
    <div
      class="flex-grow overflow-auto relative pt-5"
    >

      <div
        class="absolute w-full space-y-4"
      >
        
        <div
          v-if="chatLogs.length > 0"
          class="date flex"
        >
          {{ getDate(chatLogs[0].created_at) }}
        </div>
        <template
          v-for="(log, i) in chatLogs"
          :key="i"
        >
          <div
            class="date flex"
            v-if="i > 1 && getDate(chatLogs[i].created_at) !== getDate(chatLogs[i - 1].created_at)">
            {{ getDate(log.created_at) }}
          </div>
          <chat-message-card
          :chatLog="log"
          :isMyMessage="log.speaker === prescript.customer.id"
          ></chat-message-card>
        </template>
      </div>
      
    </div>
    <div>
      <chat-form
        v-model="message"
        @send="onSendMessage"
      >
        <template v-slot:menu>
          <button
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
          </button>
          <button
            @click="showPrescribeProducts = !showprescribeProducts"
            class="border rounded-lg py-1 text-sm flex items-center"
          >
            処方提案 
          </button>
        </template> 
      </chat-form>
      <div
        v-if="showMessageTemplates"
        style="height: 100px"
        class="relative overflow-y-scroll"
      >
        <ul
          v-if="doctorMessageTemplates.length"
          class="absolute w-full"
        >
          <li
            @click="onSelectTemplate(t)"
            v-for="(t, i) in doctorMessageTemplates"
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
      <frame-modal
        v-if="showPrescribeProducts"
        @close="showPrescribeProducts = false"
      >
        <prescribe-products-modal
          @close="showPrescribeProducts = false"
          @prescribe="onPrescribe"
        />
      </frame-modal>
    </div>
  </div>
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
import { defineComponent, ref, onMounted, SetupContext, onBeforeUnmount, onBeforeMount } from "vue";
import ChatForm from '@/views/ForClient/Diagnostic/Doctors/Detail/Chat/Form.vue';
import ChatMessageCard from '@/views/ForClient/Diagnostic/Doctors/Detail/Chat/MessageCard.vue';

import prescribeProductsModal from './MainPane/PrescribeProductsModal.vue';

import useAuth from '@/types/Auth';
import usePrescript from '@/types/Prescript';
import useChatLog from '@/types/ChatLog';
import useSocket from '@/types/Socket';
import { IPrescript, IChatMessage, IMessageTemplate, IProduct } from '@/types/Interfaces'

import moment from 'moment';
import WsStateMarker from '@/components/WsStateMarker.vue';

export default defineComponent({
  components: {
    ChatForm,
    ChatMessageCard,
    prescribeProductsModal,
    WsStateMarker
  },
  props: {
    prescript: {
      type: Object as () => IPrescript
    }
  },
  setup(props: any, context: SetupContext) {
    
    const {
      token
    } = useAuth();

    const {
      setPrescriptProducts
    } = usePrescript();

    const {
      chatLogs,
      fetchDoctorChatLogs,
      fetchDoctorMessageTemplates
    } = useChatLog()
    
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

    let url: string;
    
    const doctorMessageTemplates = ref<IMessageTemplate[]>([]);
    const showMessageTemplates = ref(false);
    const onSelectTemplate = (t: IMessageTemplate) => {
      // message.value = m;
      showMessageTemplates.value = false;
    };

    const showPrescribeProducts = ref(false);
    

    onMounted(async () => {
      doctorMessageTemplates.value = await fetchDoctorMessageTemplates();

      if (props.prescript == null) return;
      
      url = `${WS_BASE_URL}/chat/doctor/${props.prescript.customer.uuid}/?token=${token.value?.access}`;
      // alert(url)
      try {
        const data = await fetchDoctorChatLogs(props.prescript.id);  
        chatLogs.value = data;
      } catch (err) {
        console.error(err)
        return;
      } 
      prepareWs(url, chatLogs);
      window.setTimeout(() => {
        scrollDown();
      }, 100)
      
    });

    onBeforeUnmount(() => {
      // alert('closing socket')
      close();
    })

    const getDate = (dateStr: string) => {
      return moment(dateStr).format('yyyy/M/D')
    }

    const onSendMessage = () => {
      if (connection.value == null) return;
      if (!message.value.trim()) return;
      if (connection.value.readyState === connection.value.OPEN) {
        // send message
        // messageJson
        const messageJson: IChatMessage = {
          uuid: props.prescript.customer.uuid,
          message: message.value,
        };
        try {
          connection.value.send(JSON.stringify(messageJson));
          message.value = ''; // reset 
        } catch (err) {
          console.error('errr')
        }
      }
    };

    const buildPrescribeMessage = (products: IProduct[]) => {
      let message = '<u>[[処方提案]]</u><br>';
      products.map((p: IProduct) => {
        message = `${message}<strong>${p.name}</strong><br>${p.price.toLocaleString()}円<br>${p.usage}<br><br>`
      })
      
      return message;
    };

    const onPrescribe = async (products: IProduct[]) => {
      showPrescribeProducts.value = false;
      // do prescription
      if (props.prescript == null) return;
      const data = await setPrescriptProducts(props.prescript.prescript_no, products);
      
      if (connection.value == null) return;
      if (connection.value.readyState === connection.value.OPEN) {
        // const message = 
        
        const messageJson: IChatMessage = {
          uuid: props.prescript.customer.uuid,
          message: buildPrescribeMessage(products),
        };
        try {
          connection.value.send(JSON.stringify(messageJson));
          message.value = ''; // reset 
        } catch (err) {
          console.error('errr')
        }
      }
    }

    const onPage = (page: string) => {
      // alert('page')
      context.emit('page', page);
    };

   
    
    return {
      getDate,
      message,
      onSendMessage,
      onPage,
      chatLogs,
      wsState,
      showMessageTemplates,
      doctorMessageTemplates,
      onSelectTemplate,
      showPrescribeProducts,
      onPrescribe,
    }
  }
})
</script>
