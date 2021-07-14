<template>
  <div class="inline-block shadow-xl transform align-middle" >
    <div class=" bg-white">
      <div class="">
        <div
          v-if="loading"
          style="width: 600px"
          class=" rounded-tr rouned-br rounded-bl p-2 w-full mx-auto"
        >
          <div class="animate-pulse flex space-x-4">
              <div class="flex-1 space-y-4 py-1">
                <div class="space-y-2">
                  <div v-for="i in 4" :key="i" class="h-6 bg-blue-100 rounded"></div>
                  
                </div>

            </div>
          </div>
        </div>
        <div
          class="flex max-w-screen "
          v-else
          style="width: 700px; height: 500px;"
        >
          <div
            ref="messageArea"
            style="background-color: #F6F8EA; width: 60%" 
            class="flex-grow overflow-auto relative py-5"
          >
            <div
              class="absolute w-full space-y-4"
            >
    
              <ChatDateLabel
                v-if="chatLogs.length > 0"
                :dateStr="chatLogs[0].created_at"
              />
              <div v-if="chatLogs.length == 0">
                会話がありません。
              </div>
              <template
                v-for="(log, i) in chatLogs"
                :key="i"
              >
                <ChatDateLabel
                  v-if="i > 1 && getDate(chatLogs[i].created_at) !== getDate(chatLogs[i - 1].created_at)"
                  :dateStr="log.created_at"
                />
                <ChatPrescriptCard
                  v-if="checkIfPrescription(log.message)"
                  :products="products"
                  :chatLog="log"
                />
                <div style="background-color: #F6E88F" class="rounded-full text-xs mx-2 py-1" v-if="log.message == '<<escalated>>'">
                  エスカレーションしました
                </div>
                <ChatMessageCard
                  v-if="!checkIfPrescription(log.message) && log.message != '<<escalated>>'"
                  :chatLog="log"
                  :isMyMessage="log.speaker != task.consulter.id"
                
                />
              </template>
              <div class="py-10 bg-gray-100">
                診察は終了です。
              </div>
            </div>
            
          </div>
        </div>
          
      </div>
      <div class="flex border-t p-2">
       
        <button
          @click="onClose"
          class="ml-auto bg-gray-200 text-white"
        >
          閉じる
        </button>
      </div>
    </div>
    <!-- <FrameModal
      v-if="productDetailModal"
      @close="productDetailModal = null"
    
    >
      <ProductDetailModal
        :product="productDetailModal"
        @close="productDetailModal = null"
      />
    </FrameModal> -->
  </div>
</template>
<style lang="scss" scoped>
  table {
    tr {
      th {
        background-color: #C4E2FF;
        white-space: nowrap;
        font-weight: 600;
        padding: 3px 10px;
        text-align-last: justify;
        text-justify: inter-ideograph;
      }
      th.no-justify {
        text-align-last: right;
        text-justify:auto;
      }
      td {
        text-align: left;
        padding: 0px 10px;
      }
      th, td {
        border: lightgray solid 1px;
      }
    }
  }
</style>
<script lang="ts">
import { defineComponent, ref, onMounted, SetupContext, computed } from "vue";
import { IChatLog, IProduct, IPrescript, ISignup, ISubscription, IAnswer, ITask } from '@/types/Interfaces';
// import useSubscription from "@/types/Subscription";
import useChatLog from "@/types/ChatLog";
import ChatDateLabel from '../MainPane/Chat/DateLabel.vue'
import ChatMessageCard from '../MainPane/Chat/MessageCard.vue';
import ChatPrescriptCard from '../MainPane/Chat/PrescriptCard.vue'


import moment from 'moment'
import useProducts from "@/types/Product";
import useAnswer from "@/types/Answer";
export default defineComponent({
  components: {
    ChatDateLabel,
    ChatMessageCard,
    ChatPrescriptCard,
    // ProductDetailModal
  },
  props: {
    task: {
      type: Object as () => ITask,
    }
  },
  emits: [
    'close',
  ],
  setup(props: any, context: SetupContext) {
    const {
      chatLogs,
      fetchCsChatLogs,
      fetchCounselorChatLogs
    } = useChatLog();

    const {
      products,
      fetchProducts   
    } = useProducts()

    
    const onClose = () => {
      context.emit('close')  
    };
    
    const loading = ref(false);
    onMounted(async () => {
      const chatLogMethod = props.task.consultation_type == 0 ? fetchCsChatLogs : fetchCounselorChatLogs;
      loading.value = true;
      const [
        productsData,
        chatLogsData
      ] = await Promise.all([
        fetchProducts(),
        chatLogMethod(props.task.consulter.uuid),
      ])
      products.value = productsData; 
      chatLogs.value = chatLogsData.filter((c: IChatLog) => c.consultation_task == props.task.id);
      loading.value = false
    })
    const getDate = (dateStr: string) => {
      return moment(dateStr).format('yyyy/M/D')
    }
    const checkIfPrescription = (message: string) => {
      try {
        const r = JSON.parse(message);
        return Array.isArray(r);
      } catch (err) {
        return false;
      }
    }
    // const productDetailModal = ref<IProduct | null>(null)
    // const onShowProductModal = (pId: string) => {
    //   productDetailModal.value = products.value.find((p: IProduct) => p.id == pId) || null;
    //   if (productDetailModal.value == null) {
    //     alert('現在販売されていない商品です。' + pId)
    //   }
    // }
    return {
      // productDetailModal,
      // onShowProductModal,
      checkIfPrescription,
      onClose,
      products,
      chatLogs,
      loading,
      getDate
    }
  }
})
</script>
