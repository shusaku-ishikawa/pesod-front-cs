<template>
  <div
    ref="container"
    class="h-screen pt-10 sm:pt-14 flex"
  >
    <NavbarForCs />
    <Splitpanes
      class="default-theme"
      
    >
      <Pane
        size="40"
        class="sm:block overflow-y-auto  w-full "
      >
        <LeftPane
          :tasks="csTasks"
          :loadingTasks="loadingTasks"
          v-model:activeTask="activeTask"
        />
      </Pane>
      <Pane
        size="50"
        class="relative sm:block flex-grow  w-full sm:w-3/6"
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
          v-if="activeTask == null"
        >
          タスクを選択してください
        </div>
        <div
          v-else
          class="h-full flex flex-col w-full sm:px-1"
        >
          <div class="h-12 flex items-center border-b-2 border-blue-400 p-1 justify-between">
            <div class="flex items-center">
              <UserIcon
                :iconType="activeTask.consulter.icon_type"
              ></UserIcon>
              <div class="ml-2 text-sm overflow-hidden whitespace-nowrap overflow-ellipsis">
                {{ activeTask.consulter.first_name }} {{ activeTask.consulter.last_name }} 様 相談ルーム
              </div>
              
              <div class="ml-2" v-if="activeTask.assignee == null">
                <button @click="onAssignTask" class="rounded shadow border border-gray-400 bg-blue-100 text-xs px-2 py-1">この相談を担当する</button>
              </div>
              <div v-else class="ml-3 flex items-center">
                <div class="text-xs flex items-center rounded border ">
                  <div class="bg-blue-100 py-1 px-2 overflow-hidden whitespace-nowrap overflow-ellipsis">担当者</div>
                  <div class="px-4 overflow-hidden whitespace-nowrap overflow-ellipsis" style="">
                    {{ activeTask.assignee.full_name }}
                  </div>
                </div>
                <div class="ml-2 text-xs">
                  <button @click="showAssigneeModal = true" :disabled="activeTask.status == 0" class="border py-1 whitespace-nowrap overflow-hidden overflow-ellipsis">
                    担当者を変更する
                  </button>
                </div>
              </div>
            </div>
            <!-- <svg
              class="sm:hidden w-8 cusrsor-pointer"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg> -->
          </div>
          <div
            style="background-color: #FDF0EC"
          
            ref="messageArea" 
            class="flex-grow overflow-auto relative pt-5"
          >
            <SkeltonLoader
              v-if="loadingChatLogs"
            />
            <div
              v-else
              ref="scrollContainer"
              class="absolute w-full space-y-4 "
              :class="{ 'pb-2': activeTask.status == 1 }"
            >
              <OriginalTaskCard :task="activeTask.original_task" v-if="activeTask.original_task" />
              
              <ChatDateLabel
                v-if="chatLogs.length > 0"
                :dateStr="chatLogs[0].created_at"
              ></ChatDateLabel>
              <template
                v-for="(log, i) in chatLogs"
                :key="i"
                
              >
                <!-- <UnreadLabel
                  v-if="i > 0 && log.id > originalCursor && chatLogs[i - 1].id <= originalCursor"
                ></UnreadLabel>
                 -->
                <ChatDateLabel
                  v-if="i > 1 && getFormattedDate(chatLogs[i].created_at, 'YYYY/M/D') != getFormattedDate(chatLogs[i - 1].created_at, 'YYYY/M/D')"
                  :dateStr="log.created_at"
                >
                </ChatDateLabel>
                <div style="background-color: #F6E88F" class="rounded-full text-xs mx-2 py-1" v-if="log.message == '<<escalated>>'">
                  エスカレーションしました
                </div>
                <ChatMessageCard
                  v-else
                  :chatLog="log"
                  :isMyMessage="log.speaker != activeTask.consulter.id"
                ></ChatMessageCard>
              </template>
              <div v-if="activeTask.status == 0" class="py-6 text-sm bg-gray-200 mt-2">
                相談は終了しました。
              </div>
              
            </div>
            
          </div>
          <div v-if="activeTask.status == 1 && activeTask.assignee && activeTask.assignee.id == userId">
            <ChatForm
              v-model="message"
              v-model:expanded="formExpanded"
              @send="onSendMessage"
            >
              <template v-slot:menu>
                <button @click="showTemplateModal = true" class="text-xs rounded bg-white border py-0 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  テンプレート  
                </button>
                <button @click="showEscalationModal = true" class="text-xs rounded bg-white border py-0 ml-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  エスカレーション  
                </button>
                <button @click="onCloseTask" class="text-xs rounded bg-white border py-0 ml-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  相談を終了  
                </button>
                
                
              </template> 
            </ChatForm>
            
           
            <!-- <FrameModal
              v-if="productDetailModal"
              @close="productDetailModal = null"
            
            >
              <ProductDetailModal
                :product="productDetailModal"
                @close="productDetailModal = null"
              ></ProductDetailModal>
            </FrameModal> -->
          </div>
        </div>
      </Pane>
      <Pane
        size="30"
        class=" sm:block overflow-y-auto w-full sm:w-2/6"
      >
        <div
          class="text-sm"
          v-if="activeTask == null"
        >
          タスクを選択してください
        </div>
        
        <RightPane
          v-else
          :task="activeTask"
          :counselorTasks="counselorTasks"
          :csTasks="csTasks"
        ></RightPane>
      </Pane>
    </Splitpanes>
    <FrameModal
      v-if="showAssigneeModal"
      @close="showAssigneeModal = false" 
    >
      <ChangeAssigneeModal
        :css="css"
        :task="activeTask"
        @close="showAssigneeModal = false"
        @update:assignee="onAssigneeUpdated"
      />
    </FrameModal>
    <FrameModal
      v-if="connectFailures > 3"
    >
      <ErrorModal />
    </FrameModal>
    <FrameModal
      v-if="showTemplateModal"
      @close="showTemplateModal = false"
    >
      <TemplateModal
        @select:template="onSelectTemplate($event)"
        :templates="templates"
        @close="showTemplateModal = false"
      >
      </TemplateModal>
    </FrameModal>
    <FrameModal
      v-if="showEscalationModal"
      @close="showEscalationModal = false"
    >
      <EscalationModal
        :counselors="counselors"
        :task="activeTask"
        @close="showEscalationModal = false"
        @escalated="onEscalated"
      />
    </FrameModal>
  </div>
</template>
<style scoped lang="scss">
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
import { computed, watch, defineComponent, onMounted, ref, SetupContext } from "vue";
import NavbarForCs from '@/components/NavbarForCs.vue';
import LeftPane from '@/views/ForCs/Dashboard/LeftPane.vue';
import RightPane from '@/views/ForCs/Dashboard/RightPane.vue';
import EscalationModal from '@/views/ForCs/Dashboard/MainPane/EscalationModal.vue'
// chat 
import SkeltonLoader from '@/views/ForCs/Dashboard/MainPane/SkeltonLoader.vue';
import ChatForm from '@/views/ForCs/Dashboard/MainPane/Chat/Form.vue';
import ChatMessageCard from '@/views/ForCs/Dashboard/MainPane/Chat/MessageCard.vue';
import ChatDateLabel from '@/views/ForCs/Dashboard/MainPane/Chat/DateLabel.vue'
import UnreadLabel from '@/views/ForCs/Dashboard/MainPane/Chat/UnreadLabel.vue';
import ChangeAssigneeModal from '@/views/ForCs/Dashboard/MainPane/ChangeAssigneeModal.vue'
import ErrorModal from '@/views/ForCs/Dashboard/MainPane/ErrorModal.vue'
import TemplateModal from '@/views/ForCs/Dashboard/MainPane/TemplateModal.vue'
import useTasks from '@/types/Task';
import useAuth from '@/types/Auth';
import useChatLog from '@/types/ChatLog';
import useCss from '@/types/Cs'
import useCounselors from '@/types/Counselor'
import { ITask, ICs, ICounselor, INotification, IChatMessage, IProduct, IMessageTemplate } from "@/types/Interfaces";
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import { getFormattedDate } from '@/mixins/dateUtils'

import OriginalTaskCard from '@/views/ForCs/Dashboard/MainPane/OriginalTaskCard.vue'

import { assign, cloneDeep } from "lodash";
export default defineComponent({
  components: {
    NavbarForCs,
    LeftPane,
    RightPane,
    Splitpanes,
    Pane,
    ChatForm,
    ChatMessageCard,
    SkeltonLoader,
    ChatDateLabel,
    // UnreadLabel,
    EscalationModal,
    ChangeAssigneeModal,
    ErrorModal,
    TemplateModal,
    OriginalTaskCard,
  },
  
  setup(props: any, context: SetupContext) {
    const {
      token,
      getUUID,
      getUserId,
    } = useAuth();
    
    const {
      css,
      fetchCss,
    } = useCss()
    
    const {
      counselors,
      fetchCounselors
    } = useCounselors()

    const {
      tasks,
      fetchConsultationTasks,
      fetchCsTasks,
      assignTask,
      closeTask
    } = useTasks();

    const loadingChatLogs = ref(false);
    const {
      chatLogs,
      fetchCsMessageTemplates,
      fetchCsChatLogs,
    } = useChatLog()
    
    
    // const tasks = ref([]);
    
    const activeTask = ref<ITask | null>(null);
    const counselorTasks = computed(() => {
      return tasks.value.filter((t: ITask) => t.consultation_type == 1)
    })
    const csTasks = computed(() => {
      return tasks.value.filter((t: ITask) => t.consultation_type == 0)
    })
    
    const loadingTasks = ref(false);
    
    // alert(JSON.stringify(prescript.value))
    const notifications = ref<INotification[]>([]);
    const addNotification = (n: INotification) => {
      notifications.value.push(n)
    }
    const onDismissNotification = (index: number) => {
      notifications.value.splice(index, 1);
    }


    const WS_BASE_URL = `${process.env.VUE_APP_WS_HOST}/ws`;
  
    // tasks
    
    const updateTask = async (taskId: number) => {
      const taskList = await fetchCsTasks();
      const updatedOne = taskList.find((t: ITask) => t.id == taskId)
      if (updatedOne) {
        const activeIndex = tasks.value.findIndex((t: ITask) => t.id == taskId);
        if (activeIndex >= 0) {
          tasks.value.splice(activeIndex, 1, updatedOne);
        }
      }
    }

    // chat 
    const message = ref('');
    const formExpanded = ref(false);
    const uuid = ref<string>('');
    const userId = ref<string>('');
    const originalCursor = ref<number>(0);
    const scrollContainer = ref<HTMLElement | null>(null);

    const messageArea = ref<HTMLElement | null>(null);
    const scrollDown = () => {
      if (messageArea.value == null) return;
      messageArea.value.scrollTop = messageArea.value.scrollHeight;
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
    
    
    
    const sendMessage = (messageStr: string) => {
      console.log('snedMessage')
      console.log(activeTask.value?.connection)
      if (activeTask.value == null || activeTask.value.connection == null) return;
      if (activeTask.value.connection.readyState != activeTask.value.connection.OPEN) {
        alert('Connection not open')
        return;
      }
      if (uuid.value == null) return;
      const messageJson: IChatMessage = {
        uuid: uuid.value,
        message: messageStr,
      };
      activeTask.value.connection.send(JSON.stringify(messageJson))
      message.value = '';
      
    }
    const onSendMessage = () => {
      if (message.value.trim() == null) return;
      sendMessage(message.value);
      formExpanded.value = false
    }
    
    const connectFailures = ref(0);
    watch(connectFailures, () => {
      if (connectFailures.value > 3) {
        // need reload
        
      }
    })
    const getWsConnection = (task: ITask) => {
      // const connection = ref(null);
      const url = `${WS_BASE_URL}/chat/cs/${task.consulter?.uuid}/?token=${token.value?.access}`;
      const connection = new WebSocket(url);
      connection.onopen = (ev) => {
        console.log('open' + task.consulter?.first_name)
        
      };
      
      connection.onmessage = async (ev: any) => {
        const messageJson = JSON.parse(ev.data);

        // if active
        if (activeTask.value != null && activeTask.value.id == task.id) {
          chatLogs.value.push(messageJson);
          // await updateChatLogCursor(activeTask.value.customer?.id || 0, activeTask.value.id, messageJson.chat_id)
          window.setTimeout(() => {
            scrollDown();  
          }, 200)
          
          if (messageJson.message.includes('ご承認有難うございます。') && messageJson.message.includes('診察は以上となります。')) {
            await updateTask(activeTask.value?.id || 0);
            addNotification({
              level: 0,
              message: `${activeTask.value.consulter?.first_name} ${activeTask.value.consulter?.last_name}様が処方を承認しました。`
            })
            activeTask.value = null;
            
          }
        
        } else {
          const targetIndex = tasks.value.findIndex((t: ITask) => t.id == task.id)
          const target: ITask = tasks.value[targetIndex];
          const copy = cloneDeep(target);
          if (messageJson.message.includes('ご承認有難うございます。') && messageJson.message.includes('診察は以上となります。')) {
            if (task.consulter?.id) {
              // await updateChatLogCursor(prescript.customer.id, prescript.prescript_no, messageJson.chat_id)
            }
            if (target) await updateTask(target.id || 0)
            addNotification({
              level: 0,
              message: `${task.consulter?.first_name} ${task.consulter?.last_name}様が処方を承認しました。`
            })
            // alert('done')
          } else {
            copy.unread_flag = true;  
            tasks.value.splice(targetIndex, 1, copy);
          }
        }
      }
      connection.onclose = (ev) => {
        // reconnect
        const newConnection = getWsConnection(task);
        
        const index = tasks.value.findIndex((t: ITask) => t.id == task.id);
        if (index >= 0) {
          const newTaskObject = {
            ...tasks.value[index],
            connection: newConnection
          }
          tasks.value.splice(index, 1, newTaskObject)
          if (task.id == activeTask.value?.id) {
            activeTask.value = newTaskObject
          }
        }
        // const notification = {
        //   level: 1,
        //   message: `task #${task.id} Connection closed: error code: ${ev.code}`
        // }
        // addNotification(notification)
      };
      connection.onerror = (ev) => {
        connectFailures.value = connectFailures.value + 1;
        if (connectFailures.value > 3) return;
        connection.close();  
      };
      return connection;
    }
    // templates
    const showTemplateModal = ref(false);
    const templates = ref<any>([])
    const onSelectTemplate = (t: IMessageTemplate) => {
      sendMessage(t.message)
      showTemplateModal.value = false;
    }

    // asign
    
    const showAssigneeModal = ref(false);
    const showEscalationModal = ref(false);

    const onCloseTask = async () => {
      if (activeTask.value == null || activeTask.value.id == null) return;
      if (!confirm('クローズして良いですか？')) return;
      const task = await closeTask(activeTask.value.id);
      const index = tasks.value.findIndex((t: ITask) => t.id == activeTask.value?.id)
      if (index >= 0) tasks.value.splice(index, 1, task)
      addNotification({
        level: 0,
        message: `${activeTask.value.consulter?.first_name} ${activeTask.value.consulter?.last_name}様の相談をクローズしました。`
      }) 
      activeTask.value = null;
    }
    const onAssignTask = async () => {
      if (activeTask.value == null || activeTask.value.id == null) {
        
        return
      }
      const t = await assignTask(activeTask.value.id, userId.value);
      console.log(t)
      const updatedTask = {
        ...t,
        connection: activeTask.value.connection
      }
      const index = tasks.value.findIndex((t: ITask) => t.id == activeTask.value?.id);
      if (index >= 0) {
        
        tasks.value.splice(index, 1, updatedTask)
        activeTask.value = tasks.value[index]
      }
      addNotification({
        level: 0,
        message: `${activeTask.value?.consulter?.first_name} ${activeTask.value?.consulter?.last_name}様の相談の担当を開始しました。`
      })
      // activeTask.value = t;
    }

    // 
    watch(() => activeTask.value, async () => {
      if (activeTask.value == null) return;
      activeTask.value.unread_flag = false;
      message.value = '';
      
      loadingChatLogs.value = true
      
      const [chatLogData] = await Promise.all([
        // getChatCursor(activeTask.value.prescript_no),
        fetchCsChatLogs(activeTask.value.consulter?.uuid || ''),
      ])
      // originalCursor.value = cur.cursor;
      chatLogs.value = chatLogData.filter((c: any) => c.consultation_task == activeTask.value?.id);
      console.log(chatLogData)
      
      loadingChatLogs.value = false;
      
      if (chatLogs.value.length) {
        const lastLogId = chatLogs.value[chatLogs.value.length - 1].id;
        // if (activeTask.value.consulter) {
        //   await updateChatLogCursor(activeTask.value.customer.id || 0, activeTask.value.id, lastLogId || 0);    
        // }
      }
      window.setTimeout(() => {
        scrollDown()
      }, 200)
      // scrollToLastRead()
    });
    const onAssigneeUpdated = (assignee: ICs) => {
      showAssigneeModal.value = false;
      
      if (activeTask.value) activeTask.value.assignee = assignee;

      addNotification({
        level: 0,
        message: `${assignee.full_name}に担当を変更しました。`
      });

    }
    const onEscalated = (nextAssignee: ICounselor) => {
      sendMessage('<<escalated>>')
      // update task

      addNotification({
        level: 0,
        message: `${nextAssignee.full_name}へエスカレーションしました`
      })
    }    
    onMounted(async () => {
      // userId.value = await getUserId();
      loadingTasks.value = true
      const [userIdData, uuidData, tasksData, cssData, counselorsData, templatesData] = await Promise.all([
        getUserId(),
        getUUID(),
        fetchConsultationTasks(),
        fetchCss(),
        fetchCounselors(),
        fetchCsMessageTemplates()
      ])
      userId.value = userIdData;
      uuid.value = uuidData.uuid;
      tasks.value = tasksData.map((t: ITask) => {
        return {
          ...t,
          connection: t.consultation_type == 0 && t.status == 1 ? getWsConnection(t) : null
        }
      });
      css.value = cssData;
      counselors.value = counselorsData;
      templates.value = templatesData;
      
      loadingTasks.value = false
      console.log(tasks.value)
    })

    
    return {
      // tasks
      tasks,
      counselorTasks,
      csTasks,
      activeTask,
      loadingTasks,
      
      // chat
      connectFailures,
      getFormattedDate,
      uuid,
      userId,
      messageArea,
      scrollContainer,
      originalCursor,
      message,
      formExpanded,
      onSendMessage,
      loadingChatLogs,
      chatLogs,
      // templates
      showTemplateModal,
      templates,
      onSelectTemplate,
      // assign
      onAssignTask,
      onCloseTask,
      showEscalationModal,
      showAssigneeModal,
      onAssigneeUpdated,
      onEscalated,
      css,
      counselors,
      // notif
      notifications,
      onDismissNotification,
    };
  }
})
</script>
