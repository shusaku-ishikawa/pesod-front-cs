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
        <div>

          <img
            v-if="prescript.customer.icon_type == 0"
            class="w-8"
            src="@/assets/img/doctor/icon_man.png" alt=""
          >
          <img
            v-if="prescript.customer.icon_type == 1"
            class="w-8"
            src="@/assets/img/doctor/icon_woman.png" alt=""
          >
          <img
            v-if="prescript.customer.icon_type == 2"
            class="w-8"
            src="@/assets/img/doctor/icon_dog.png" alt=""
          >
          <img
            v-if="prescript.customer.icon_type == 3"
            class="w-8"
            src="@/assets/img/doctor/icon_cat.png" alt=""
          >
          <img
            v-if="prescript.customer.icon_type == 4"
            class="w-8"
            src="@/assets/img/doctor/icon_robot.png" alt=""
          >
        </div>
        
        <div class="ml-2 text-base">
          {{ prescript.customer.first_name }} {{ prescript.customer.last_name }} 様 診察ルーム
        </div>
        <div class="ml-2">
          <img class="h-6" v-if="prescript.status == 3" src="@/assets/img/doctor_now_long.png" alt="">
          <img class="h-6" v-else src="@/assets/img/doctor_end_long.png" alt="">
        
        </div>
      </div>
      <svg
        @click="onPage('right')"
        class="sm:hidden w-8 cusrsor-pointer"
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    </div>
    <div
      style="background-color: #E7FAFF"
    
      ref="messageArea" 
      class="flex-grow overflow-auto relative pt-5"
    >
      <div
        v-if="loadingChatLogs"
        class="absolute w-full space-y-4"
      
      >
        <div
          v-for="i in 4"
          :key="i"
          :class="{ 'ml-auto': i % 2, 'mr-auto': (i+1) % 2, 'w-3/5': true }"
          class="  p-2 ">
          <div class="animate-pulse flex space-x-4">
              <div class="flex-1 space-y-4 py-1">
                <div class="space-y-2">
                  <div class="h-4 bg-blue-100 rounded"></div>
                  <div class="h-4 bg-blue-100 rounded"></div>
                  <div class="h-4 bg-blue-100 rounded"></div>
                  
                </div>

            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        ref="scrollContainer"
        class="absolute w-full space-y-4 pb-2"
      >
        <unread-label
          v-if="originalCursor == 0"
        ></unread-label>
        
        <chat-date-label
          v-if="chatLogs.length > 0"
          :dateStr="chatLogs[0].created_at"
        ></chat-date-label>
        <template
          v-for="(log, i) in chatLogs"
          :key="i"
          
        >
          <unread-label
            v-if="i > 0 && log.id > originalCursor && chatLogs[i - 1].id <= originalCursor"
          ></unread-label>
          
          <chat-date-label
            v-if="i > 1 && getDate(chatLogs[i].created_at) != getDate(chatLogs[i - 1].created_at)"
            
            :dateStr="log.created_at"
          >
          </chat-date-label>
          
          <chat-prescript-card
            v-if="checkIfPrescription(log.message)"
            :products="products"
            :chatLog="log"
            @showProductDetail="onShowProductModal"
          ></chat-prescript-card>
          <chat-message-card
            v-else
            :chatLog="log"
            :isMyMessage="log.speaker === userId"
          ></chat-message-card>
        </template>
       
        <div v-if="prescript.stattus == 0 || prescript.status == 4" class="py-10 bg-gray-100">
          診察は終了です。
        </div>
      </div>
      
    </div>
    <div v-if="prescript.status == 3">
      <chat-form
        v-model="message"
        @send="onSendMessage"
      >
        <template v-slot:menu>
      
          <button
            @click="showMessageTemplates = !showMessageTemplates"
            class="border rounded-lg py-1 text-xs p-1 flex items-center"
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
            class="border rounded-lg py-1 text-xs flex items-center"
          >
            処方提案 
          </button>
        </template> 
      </chat-form>
      <frame-modal
        v-if="showMessageTemplates"
        @close="showMessageTemplates = false"
      >
        <template-modal
          :templates="doctorMessageTemplates.filter(t => t.is_select)"
          @select:template="onSelectTemplate"
          @close="showMessageTemplates = false"
        ></template-modal>
      </frame-modal>
      <frame-modal
        v-if="showPrescribeProducts"
        @close="showPrescribeProducts = false"
      >
        <prescribe-products-modal
          @close="showPrescribeProducts = false"
          :products="products"
        
          @prescribe="onPrescribe"
        />
      </frame-modal>
      <frame-modal
        v-if="productDetailModal"
        @close="productDetailModal = null"
      
      >
        <product-detail-modal
          :product="productDetailModal"
          @close="productDetailModal = null"
        ></product-detail-modal>
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
import { defineComponent, ref, onMounted, SetupContext, onBeforeUnmount, onBeforeMount, watch, onUpdated } from "vue";

import prescribeProductsModal from './MainPane/PrescribeProductsModal.vue';
import ChatPrescriptCard from './MainPane/Chat/PrescriptCard.vue';
import useAuth from '@/types/Auth';
import usePrescript from '@/types/Prescript';
import useChatLog from '@/types/ChatLog';
import useSocket from '@/types/Socket';
import { IPrescript, IChatMessage, IMessageTemplate, IProduct, IChatLog } from '@/types/Interfaces'

import moment from 'moment';
import WsStateMarker from '@/components/WsStateMarker.vue';
import ProductDetailModal from './MainPane/ProductDetailModal.vue';

import ChatForm from './MainPane/Chat/Form.vue';
import ChatMessageCard from './MainPane/Chat/MessageCard.vue';
import ChatDateLabel from './MainPane/Chat/DateLabel.vue'
import TemplateModal from './MainPane/TemplateModal.vue';
import { template } from "lodash";
// import WsStateMarker from '@/components/WsStateMarker.vue';
import UnreadLabel from './MainPane/Chat/UnreadLabel.vue';
import useProducts from "@/types/Product";

export default defineComponent({
  components: {
    ChatForm,
    ChatMessageCard,
    ChatPrescriptCard,
    prescribeProductsModal,
    // WsStateMarker,
    ChatDateLabel,
    TemplateModal,
    UnreadLabel,
    ProductDetailModal
  },
  props: {
    
    prescript: {
      type: Object as () => IPrescript
    },
    // chatLogs: {
    //   type: Object as () => IChatLog[]
    // },
    // loadingChatLogs: Boolean
  },
  emits: [
    'sendMessage',
    'connectionError',
    'done:prescription',
  ],
  setup(props: any, context: SetupContext) {
    
    const {
      token,
      getUUID,
      getUserId,
    } = useAuth();

    const {
      setPrescriptProducts
    } = usePrescript();

    const loadingChatLogs = ref(false);
    const {
      chatLogs,
      fetchDoctorChatLogs,
      fetchDoctorMessageTemplates,
      getChatCursor,
      updateChatLogCursor
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

    const {
      products,
      fetchProducts
    } = useProducts();

    // const chatLogReady = ref(false);

    let url: string;
    
    const uuid = ref<string>('');
    const userId = ref<string>('');

    const originalCursor = ref<number>(0);
    const scrollContainer = ref<HTMLElement | null>(null);

    // const getCurrentCursor = async () => {
    //   const chatCursor = await getChatCursor(props.prescript.prescript_no);
    //   originalCursor.value = chatCursor.cursor || 0;
      
    // }
    const onMessage = async (ev: any) => {
      const newMessage = JSON.parse(ev.data);
      chatLogs.value.push(newMessage);
      await updateChatLogCursor(props.prescript.customer.id, props.prescript.prescript_no, newMessage.chat_id)
      scrollDown();
      if (newMessage.message.includes('ご承認有難うございます。') && newMessage.message.includes('診察は以上となります。')) {
        context.emit('done:prescription')
        // alert('done')
      }
    }
    const doctorMessageTemplates = ref<IMessageTemplate[]>([]);
    const showMessageTemplates = ref(false);
    
     onMounted(async () => {
      userId.value = await getUserId();
      const uuidData = await getUUID();
      // await getCurrentCursor()
      uuid.value = uuidData.uuid;
      doctorMessageTemplates.value = await fetchDoctorMessageTemplates();
      products.value = await fetchProducts();
      context.emit('setOnMessage', onMessage)
    
    })
    
    const sendMessage = (messageStr: string) => {
      if (!props.prescript.connection) throw Error('No connection')
      if (props.prescript.connection.readyState != props.prescript.connection.OPEN) {
        context.emit('connectionError', 'connection not open')
        return;
      }
        const messageJson: IChatMessage = {
          uuid: uuid.value,
          message: messageStr,
        };
        context.emit('sendMessage', messageJson);
        message.value = '';
        setTimeout(() => {
          scrollDown()
          
        }, 300)
    
    }

    
    const onSelectTemplate = (t: IMessageTemplate) => {
      showMessageTemplates.value = false;
      sendMessage(t.message);
      
    };
    const scrollToLastRead = () => {
      if (scrollContainer.value) {
        console.log('scroll strt')
        const elemArray = Array.from(scrollContainer.value.children);
        // alert(originalCursor.value)
        const lastReadElement = elemArray.find((c: any) => {
          return c.getAttribute('id') == originalCursor.value
        })  
        if (lastReadElement && messageArea.value) {
          const outerRect = messageArea.value.getBoundingClientRect()
          const elemRect = lastReadElement.getBoundingClientRect()
          if (messageArea.value == null) return;
          window.setTimeout(() => {
            const scroll = elemRect.top - outerRect.height + elemRect.height + 10
            
            messageArea.value?.scrollBy({ top: scroll })  
          }, 100)
        }
      }
    }
   
    const showPrescribeProducts = ref(false);
    
    watch(() => props.prescript, async () => {
      context.emit('setOnMessage', onMessage)
    
      message.value = '';
      const cur = await getChatCursor(props.prescript.prescript_no);
      originalCursor.value = cur.cursor;
      loadingChatLogs.value = true
      chatLogs.value = await fetchDoctorChatLogs(props.prescript.prescript_no);
      loadingChatLogs.value = false;
      if (chatLogs.value.length) {
        const lastLogId = chatLogs.value[chatLogs.value.length - 1].id;
        const ret = await updateChatLogCursor(props.prescript.customer.id, props.prescript.id, lastLogId || 0);
        // scrollToLastRead();
      }
      scrollToLastRead()
      
    }, { immediate: true })
   
    const getDate = (dateStr: string) => {
      return moment(dateStr).format('yyyy/M/D')
    }

    

    const onSendMessage = () => {
      if (message.value.trim() != '') {
        sendMessage(message.value);
      }
    };

    const buildPrescribeMessage = (productList: IProduct[]) => {
      const plist = productList.map((p: IProduct) => {
        return p.id;  
      });
      return JSON.stringify(plist);
      
      
    };

    const onPrescribe = async (productList: IProduct[]) => {
      showPrescribeProducts.value = false;
      // do prescription
      if (props.prescript == null) return;
      const data = await setPrescriptProducts(props.prescript.prescript_no, productList);
      
      const messageStr = buildPrescribeMessage(productList);
      const template2 = doctorMessageTemplates.value.find((t: any) => t.message_flow == 2);
      const template3 = doctorMessageTemplates.value.find((t: any) => t.message_flow == 3);
      const template4 = doctorMessageTemplates.value.find((t: any) => t.message_flow == 4);

      if (template2) {
        window.setTimeout(() => {
          sendMessage(template2.message)  
        }, 100);
      }
      if (template3) {
        window.setTimeout(() => {
          sendMessage(template3.message)  
        }, 500);
      }
      window.setTimeout(() => {
        sendMessage(messageStr);
      }, 1000)
      
      if (template4) {
        window.setTimeout(() => {
          sendMessage(template4.message)
          
        }, 2000)
      }
      window.setTimeout(() => {
        // :chatLog="{ message: '' }"
          
        sendMessage("以上の処方でよろしいでしょうか。<br>良い場合は「はい」変更を希望さ れる場合は、「いいえ」とお応え 下さい。")
      }, 3000)
    }

    
    const productDetailModal = ref<IProduct | null>(null)
    const onShowProductModal = (pId: string) => {
      productDetailModal.value = products.value.find((p: IProduct) => p.id == pId) || null;
      if (productDetailModal.value == null) {
        alert('現在販売されていない商品です。' + pId)
      }
    }
    const checkIfPrescription = (message: string) => {
      try {
        const r = JSON.parse(message);
        return Array.isArray(r);
      } catch (err) {
        return false;
      }
    }
    return {
      products,
      uuid,
      userId,
      messageArea,
      scrollContainer,
      originalCursor,
      getDate,
      message,
      onSendMessage,
      wsState,
      showMessageTemplates,
      doctorMessageTemplates,
      onSelectTemplate,
      showPrescribeProducts,
      onPrescribe,
      loadingChatLogs,
      chatLogs,
      productDetailModal,
      onShowProductModal,
      checkIfPrescription
    }
  }
})
</script>
