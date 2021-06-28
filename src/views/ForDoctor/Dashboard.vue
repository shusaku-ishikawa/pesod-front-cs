<template>
  <div
    ref="container"
    class="h-screen pt-10 sm:pt-14 flex"
  >
    <navbar-for-doctor />
    <splitpanes
      class="default-theme"
      
    >
      <pane
        size="20"
        class="sm:block overflow-y-auto  w-full sm:w-1/6"
        :class="{ 'block': activePage === 'left', 'hidden': activePage !== 'left' }"
      >
        <left-pane
          v-model:searchWord="searchWord"
          :prescripts="displayPrescripts"
          :loadingPrescripts="loadingPrescripts"
          v-model:activePrescript="activePrescript"
          @page="onPage"
        ></left-pane>
      </pane>
      <pane
        size="50"
        class="relative sm:block flex-grow  w-full sm:w-3/6"
        :class="{ 'block': activePage === 'main', 'hidden': activePage !== 'main' }"
      >
        <div class="absolute top-12 w-full" style="z-index: 1000">
          <div
            v-for="(n, i) in notifications" :key="i"
            class="flex items-center text-sm mb-1 text-white rounded shadow w-3/4 py-3 px-3 inline-block mx-auto"
            :class="{ 'bg-red-600': n.level > 0, 'bg-green-600': n.level == 0 }"
          >
            <div class="flex-grow text-center">
              {{ n.message }}
              
            </div>
            <div class="ml-auto">
              <svg xmlns="http://www.w3.org/2000/svg"
              @click="onDismissNotification(i)"
              class="cursor-pointer h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        <div
          class="text-sm"
          v-if="activePrescript == null"
        >
          顧客を選択してください。
        </div>
        <main-pane
          v-else
          :prescript="activePrescript"
          :loadingChatLogs="loadingChatLogs"
          @sendMessage="onSendMessage"
          @connectionError="onConnectionError"
          @setOnMessage="onSetOnMessage"
          @done:prescription="onActivePrescriptDone"
        ></main-pane>
      </pane>
      <pane
        size="30"
        class=" sm:block overflow-y-auto w-full sm:w-2/6"
        :class="{ 'block': activePage === 'right', 'hidden': activePage !== 'right' }"
      >
        <div
          class="text-sm"
          v-if="activePrescript == null"
        >
          顧客を選択してください。
        </div>
        
        <right-pane
          v-else
          @page="onPage"
          :prescript="activePrescript"
        ></right-pane>
      </pane>
    </splitpanes>
    
  </div>
</template>
<style scoped>
  .splitpanes--vertical>.splitpanes__splitter {
    min-width: 6px!important;
    background: linear-gradient(90deg, #ccc, #111);
  }

  /* .splitpanes--horizontal > .splitpanes__splitter {
    min-height: 6px;
    background: linear-gradient(0deg, #ccc, #111);
  } */
  .splitpanes.default-theme .splitpanes__pane {
    background-color: white;
  }
</style>
<script lang="js">
import { computed, watch, defineComponent, onMounted, ref } from "vue";
import NavbarForDoctor from '@/components/NavbarForDoctor.vue';
import LeftPane from './Dashboard/LeftPane.vue';
import MainPane from './Dashboard/MainPane.vue';
import RightPane from './Dashboard/RightPane.vue';

import { useRoute, useRouter } from 'vue-router';
import usePrescript from '@/types/Prescript';
import useAuth from '@/types/Auth';
import useChatLog from '@/types/ChatLog';
import useSocket from '@/types/Socket'
import { IPrescript, INotification, IChatMessage } from "@/types/Interfaces";
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import { cloneDeep } from "lodash";
export default defineComponent({
  components: {
    NavbarForDoctor,
    LeftPane,
    MainPane,
    RightPane,
    Splitpanes,
    Pane
  },
  
  setup() {
    const container = ref(null);
    const activePage = ref('main');
    
    const route = useRoute();
    const router = useRouter();

    

    const {
      token,
      profile,
    } = useAuth();

    const {
      // chatLogs,
      fetchDoctorChatLogs,
      updateChatLogCursor
    } = useChatLog('doctor')
    
    // const prescripts = ref([]);
    const activePrescript = ref(null);
    const loadingPrescripts = ref(false);
    
    
    // alert(JSON.stringify(prescript.value))
    const notifications = ref ([
      
    ]);
    const addNotification = (n) => {
      notifications.value.push(n)
    }

    const {
      prescripts,
      fetchPrescripts  
    } = usePrescript('doctor');
    
    const {
      WS_BASE_URL,
      close,
      messageArea,
      scrollDown,
      wsState,
      wsStateStr,
      message,
    } = useSocket();

    const searchWord = ref('');
    const displayPrescripts = computed(() => {
      if (!searchWord.value) return prescripts.value;
      return prescripts.value.filter((p) => {
        return p.customer.first_name.includes(searchWord.value) || p.customer.last_name.includes(searchWord.value)
      })
    })
    const onMessageForInactive = (prescript) => {
      return async (ev) => {
        
        const newMessage = JSON.parse(ev.data)
        const targetIndex = prescripts.value.findIndex(p => p.id == prescript.id)
        const target = prescripts.value[targetIndex];
        if (target == null) {
          throw Error('no matching prescript')
        }
        const cp = cloneDeep(target)

        if (newMessage.message.includes('ご承認有難うございます。') && newMessage.message.includes('診察は以上となります。')) {
          const d = await updateChatLogCursor(prescript.customer.id, prescript.prescript_no, newMessage.chat_id)
          cp.status = 4
          cp.unread_flag = false;
          addNotification({
            level: 0,
            message: `${prescript.customer.first_name} ${prescript.customer.last_name}様が処方を承認しました。`
          })
          // alert('done')
        } else {
          cp.unread_flag = true;  
        }

          
        prescripts.value.splice(targetIndex, 1, cp)
        
        
        // if (activePrescript.value && prescript.id == activePrescript.value.id) {
        //   if (newMessage.message.includes('ご承認有難うございます。') && newMessage.message.includes('診察は以上となります。')) {
        //     const d = await updateChatLogCursor(prescript.customer.id, prescript.prescript_no, newMessage.chat_id)
        //     const cp = cloneDeep(activePrescript.value);
        //     cp.status = 4
        //     cp.unread_flag = false;
        //     addNotification({
        //       level: 0,
        //       message: `${prescript.customer.first_name} ${prescript.customer.last_name}様が処方を承認しました。`
        //     })
        //    // alert('done')
        //   }
        //   //  else {
        //   //   cp.unread_flag = true;  
        //   // }

        // } else {
        //   // console.log('received mesage ');
          
        //   console.log(prescript.customer.first_name + 'receive message' + ev.data)
        //   // activePrescript.value.unread_flag = true;
        //   const targetIndex = prescripts.value.findIndex(p => p.id == prescript.id)
        //   const target = prescripts.value[targetIndex];
        //   if (target == null) return;
          
        //   const cp = cloneDeep(target)

        //   if (newMessage.message.includes('ご承認有難うございます。') && newMessage.message.includes('診察は以上となります。')) {
        //     const d = await updateChatLogCursor(prescript.customer.id, prescript.prescript_no, newMessage.chat_id)
        //     cp.status = 4
        //     cp.unread_flag = false;
        //     addNotification({
        //       level: 0,
        //       message: `${prescript.customer.first_name} ${prescript.customer.last_name}様が処方を承認しました。`
        //     })
        //    // alert('done')
        //   } else {
        //     cp.unread_flag = true;  
        //   }

          
        //   prescripts.value.splice(targetIndex, 1, cp)
        
          //prescripts.value.find(p => p.id == prescript.id).unread_flag = true
        
      }
    }
    // const connections = ref([]);
    const getWsConnection = (prescript) => {
      const connection = ref(null);
      const url = `${WS_BASE_URL}/chat/doctor/${prescript.customer.uuid}/?token=${token.value?.access}`;
      connection.value = new WebSocket(url);  
      // if (connection.value.readyState != connection.value.OPEN) {
      //   router.push({ name: 'DoctorLogin' })
      // }
      connection.value.onopen = (ev) => {
        console.log('open' + prescript.customer.first_name)
        
      };
      
      connection.value.onmessage = onMessageForInactive(prescript)
      connection.value.onclose = (ev) => {
        const notification = {
          level: 1,
          message: `Prescript #${prescript.id} Connection closed: error code: ${ev.code}`
        }
        addNotification(notification)
      };
      connection.value.onerror = (ev) => {
        connection.value.close();  
      };
      return connection;
    }

    watch(() => activePrescript.value, async (_, oldVal) => {
      
      if (oldVal) {
        const previous = prescripts.value.find(p => p.id == oldVal.id)
        if (previous) {
          previous.connection.onclose = null
          previous.connection && previous.connection.close()
          
          previous.connection = await getWsConnection(previous);
        }
      }
      
      activePrescript.value.unread_flag = false;
    })
    const prepConnections = () => {
      prescripts.value.map(p => {
        if (p.status == 3) {
          const conn = getWsConnection(p);
          p.connection = conn;
          
        }
        
      })
      console.log(prescripts)
    }
    
    onMounted(async () => {
      // userId.value = await getUserId();
      loadingPrescripts.value = true
      const data = await fetchPrescripts();
      prescripts.value = data.filter(p => p.status > 2);
      
      prepConnections()
      loadingPrescripts.value = false
      console.log(prescripts.value)
    })
    
    const onSendMessage = (event) => {
      
      activePrescript.value.connection.send(JSON.stringify(event));
      console.log('after send')
    }
    const onPage = (event) => {
      activePage.value = event;
    }
    const onConnectionError = (error) => {
      prepConnections()
      
      addNotification({
        level: 1,
        message: error
      })
    }
    const onSetOnMessage = (f) => {
      activePrescript.value.connection.onmessage = f
    }
    const onActivePrescriptDone = () => {
      if (activePrescript.value == null) return
      const cp = cloneDeep(activePrescript.value)
      cp.status = 4
      const index = prescripts.value.findIndex(p => p.id == activePrescript.value.id);
      if (index >= 0) {
        prescripts.value.splice(index, 1, cp);

      }
      notifications.value.push({
        level: 0,
        message: `${activePrescript.value.customer.first_name} ${activePrescript.value.customer.last_name}様が処方を承認しました。`
      })
      activePrescript.value = null
    }
    const onDismissNotification = (index) => {
      notifications.value.splice(index, 1);
    }
    return {
      onPage,
      searchWord,
      container,
      activePage,
      prescripts,
      onSendMessage,
      activePrescript,
      loadingPrescripts,
      displayPrescripts,
      notifications,
      onConnectionError,
      onSetOnMessage,
      onActivePrescriptDone,
      onDismissNotification
    };
  }
})
</script>
