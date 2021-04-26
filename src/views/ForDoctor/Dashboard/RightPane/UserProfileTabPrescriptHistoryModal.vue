<template>
  <div class="inline-block shadow-xl transform align-middle" >
    <div class=" rounded bg-white px-6 mt-10 py-3 sm:pb-4">
      <div class="text-left">診察履歴</div>
      <div class="mb-2">
        <div
          v-if="loading"
          style="width: 600px"
          class="border shadow rounded-tr rouned-br rounded-bl p-2 w-full mx-auto"
        >
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
        <div
          ref="messageArea"
          style="width: 700px; height: 500px" 
          class="flex-grow overflow-auto relative pt-5"
        >
          <div
            class="absolute w-full space-y-4"
          >
   
            <chat-date-label
              v-if="chatLogs.length > 0"
              :dateStr="chatLogs[0].created_at"
            ></chat-date-label>
            <template
              v-for="(log, i) in chatLogs"
              :key="i"
            >
              <chat-date-label
                v-if="i > 1 && getDate(chatLogs[i].created_at) !== getDate(chatLogs[i - 1].created_at)">
                :dateStr="log.created_at"
              </chat-date-label>
              <chat-message-card
              :chatLog="log"
              :isMyMessage="log.speaker === userId"
              ></chat-message-card>
            </template>
          </div>
          
        </div>
      </div>
      <hr class="mb-3">
      <div class="flex ">
       
        <button
          @click="onClose"
          class="ml-auto bg-gray-200 text-white"
        >
          閉じる
        </button>
      </div>
    </div>
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
import { IChatLog, IMessageTemplate, IOrder, IPrescript, ISignup, ISubscription } from '@/types/Interfaces';
import useSubscription from "@/types/Subscription";
import useChatLog from "@/types/ChatLog";
import ChatDateLabel from '../MainPane/Chat/DateLabel.vue'
import ChatMessageCard from '../MainPane/Chat/MessageCard.vue';

import moment from 'moment'
export default defineComponent({
  components: {
    ChatDateLabel,
    ChatMessageCard
  },
  props: {
    prescript: {
      type: Object as () => IPrescript,
    }
  },
  emits: [
    'close',
  ],
  setup(props: any, context: SetupContext) {
    const chatLogs = ref<IChatLog[]>([]);
    const {
      fetchDoctorChatLogs  
    } = useChatLog();

    
    const onClose = () => {
      context.emit('close')  
    };
    const userId = computed(() => {
      return props.prescript.doctor.id;
    })
    const loading = ref(false);
    onMounted(async () => {
      loading.value = true;
      chatLogs.value = await fetchDoctorChatLogs(props.prescript.id);
      loading.value = false
    })
    const getDate = (dateStr: string) => {
      return moment(dateStr).format('yyyy/M/D')
    }
    return {
      onClose,
      userId,
      chatLogs,
      loading,
      getDate
    }
  }
})
</script>
