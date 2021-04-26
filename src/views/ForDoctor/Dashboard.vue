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
            v-for="(n, i) in notifications" :key="i" class="flex items-center text-sm mb-1 bg-red-600 text-white rounded shadow w-3/4 py-3 px-3 inline-block mx-auto"
          >
            <div class="flex-grow text-center">
              {{ n }}
              
            </div>
            <div class="ml-auto">
              <svg xmlns="http://www.w3.org/2000/svg"
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
          :chatLogs="activeChatLogs"
          :loadingChatLogs="loadingChatLogs"
          @sendMessage="onSendMessage"
          @connectionError="onConnectionError"
          @page="onPage"
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
import { IPrescript, IChatMessage } from "@/types/Interfaces";
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

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
    const activeChatLogs = ref([])
    const loadingChatLogs = ref(false);
    const loadingPrescripts = ref(false);
    
    
    // alert(JSON.stringify(prescript.value))
    const notifications = ref([
      
    ]);
    const addNotification = n => {
      notifications.value.push(n)
      window.setTimeout(() => {
        notifications.value = notifications.value.filter(d => d != n)
      }, 2000);
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
      prepareWs
    } = useSocket();

    const searchWord = ref('');
    const displayPrescripts = computed(() => {
      if (!searchWord.value) return prescripts.value;
      return prescripts.value.filter((p) => {
        return p.customer.first_name.includes(searchWord.value) || p.customer.last_name.includes(searchWord.value)
      })
    })
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

      connection.value.onmessage = (ev) => {
        const newMessage = JSON.parse(ev.data)
        if (prescript.id == activePrescript.value.id) {
          activeChatLogs.value.push(newMessage)
        } else {
          // console.log('received mesage ');
          console.log(prescript.customer.first_name + 'receive message' + ev.data)
          // activePrescript.value.unread_flag = true;
          prescripts.value.find(p => p.id == prescript.id).unread_flag = true
        }
        // console.log('message ' + ev.data);
        // const messageJson = JSON.parse(ev.data);
        
        // const newMessage = {
        //   id: 1,
        //   ...messageJson
        // };
        // chatLogRef.value.push(newMessage);
        // window.setTimeout(() => {
        //   scrollDown()
        // }, 100);
        // // scrollDown();
        // if (onMessageCallback != null) {
        //   onMessageCallback(messageJson)
        // }
      };
      connection.value.onclose = (ev) => {
        console.log(ev)
        addNotification(`Prescript #${prescript.id} Connection closed: error code: ${ev.code}`)
        console.log('on close')
        // if (connection.value == null) return;
        // wsState.value = connection.value.CLOSED;
      };
      connection.value.onerror = (ev) => {
        // alert('on error')
        console.log(ev)
        connection.value.close();
        
        // router.push({ name: 'DoctorLogin' })
        // console.log(ev)
        // if (connection.value == null) return;
        
      };
      return connection;
      // alert(url)
      // prepareWs(url, chatLogs);
      // window.setTimeout(() => {
      //   scrollDown();
      // }, 100)
      // loading.value = false;
    }

    watch(() => activePrescript.value, async (_, oldVal) => {
      // if (oldVal && oldVal.connection) oldVal.connection.close();
      // activePrescript.value.connection = getWsConnection(activePrescript.valeu)
      if (activePrescript.value.connection.readyState != 1) {
        activePrescript.value.connection.close();
        activePrescript.value.connection = getWsConnection(activePrescript.value) // new WebSocket()
      }
      activePrescript.value.unread_flag = false;
      loadingChatLogs.value = true;
      activeChatLogs.value = await fetchDoctorChatLogs(activePrescript.value.id);
      const lastLogId = activeChatLogs.value[activeChatLogs.value.length - 1].id;
      const ret = await updateChatLogCursor(activePrescript.value.customer.id, activePrescript.value.id, lastLogId);
      
      loadingChatLogs.value = false;
    })
    const prepConnections = () => {
      prescripts.value.map(p => {
        const conn = getWsConnection(p);
        p.connection = conn;
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
    }
    const onPage = (event) => {
      activePage.value = event;
    }
    const onConnectionError = (error) => {
      addNotification(error)
    }
    return {
      onPage,
      searchWord,
      container,
      activePage,
      prescripts,
      onSendMessage,
      activePrescript,
      loadingChatLogs,
      activeChatLogs,
      loadingPrescripts,
      displayPrescripts,
      notifications,
      onConnectionError
    };
  }
})
</script>
