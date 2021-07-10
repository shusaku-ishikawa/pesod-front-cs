<template>
  <div
    class="h-full flex flex-col w-full px-1 "
  >
    <div class="h-12 pt-3 border-b-2 border-blue-200">
      <ul class='h-full flex  cursor-pointer text-xs font-normal justify-center'>
        <li
          
          v-for="(t, i) in tabs"
          :key="i"
          @click="tab = t.value"
          style="width: 30px; font-size: 10px; border-bottom: none;"
          :class="{ 'bg-primary font-semibold text-white ': t.value === tab }"
          class='relative flex-auto py-2 px-2 bg-white rounded-t border'
        >
          {{ t.text }}
          <div v-if="t.value == tab" class="arrow-down"></div>
        </li>
      </ul>
    </div>
    <div class=" w-full relative flex-grow overflow-y-auto">
      
      <UserProfileTab
        class="absolute"
        v-if="tab === 'profile'"
        :task="task"
      />
      <PurchaseTab
        class="absolute"
        v-if="tab === 'purchase'"
        :task="task"
        :subscriptions="subscriptions"
        :prescripts="prescripts"
        :orders="orders"
        :loadingSubscriptions="loadingSubscriptions"
        :loadingOrders="loadingOrders"
        :loadingPrescripts="loadingPrescripts"
      />
      <TaskHistoryTab
        class="absolute "
        v-if="tab == 'tasks'"
        :loadingTasks="loadingTasks"
        :counselorTasks="counselorTasks"
        :csTasks="csTasks"
        :task="task"
      />
      <HairRecordTab
        class="absolute "
        :task="task"
        :loadingHairRecords="loadingHairRecords"
        :hairRecords="hairRecords"
        v-if="tab == 'hairRecord'"
      />
    </div>
    
  </div>
</template>
<style lang="scss" scoped>
  .arrow-down {
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid #0AA2E8;

    position: absolute;
    top: 100%;
    left: calc(50% - 5px);
    // margin-left: -20px;
  }
  li {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
<script lang="ts">
import { defineComponent, onMounted, SetupContext, ref, watch } from "vue";
import UserProfileTab from './RightPane/UserProfileTab.vue';
import HairRecordTab from './RightPane/HairRecordTab.vue';
import PurchaseTab from './RightPane/PurchaseTab.vue';
import TaskHistoryTab from './RightPane/TaskHistoryTab.vue'
import useSubscription from '@/types/Subscription';
import usePrescript from '@/types/Prescript';
import useOrder from '@/types/Order';
import useHairRecord from '@/types/HairRecord';

import { IAnswer, ISubscription, IAnswerOption, IPrescript, IOrder, IHairRecord, ITask } from "@/types/Interfaces";
import useAnswer from '@/types/Answer';
import PurchaseTabPrescritpCardVue from "./RightPane/PurchaseTabPrescritpCard.vue";

export default defineComponent({
  components: {
    UserProfileTab,
    PurchaseTab,
    TaskHistoryTab,
    HairRecordTab
  },
  props: {
    task: {
      type: Object as () => ITask
    },
    counselorTasks: {
      type: Object as () => ITask[]
    },
    csTasks: {
      type: Object as () => ITask[]
    },
    
  },
  setup(props: any, context: SetupContext) {
    const tabs = [
      
      {
        value: 'profile',
        text: '顧客情報'
      },
      {
        value: 'purchase',
        text: '診察・購入履歴'
      },
      {
        value: 'tasks',
        text: '相談履歴'
      },
      {
        value: 'hairRecord',
        text: '毛髪記録'
      },
      
    ]
    const tab = ref<string>('profile')
    
    const hairRecords = ref<IHairRecord[]>([]);
    const loadingHairRecords = ref(false);
    const {
      fetchUserHairRecords  
    } = useHairRecord();
    const loadHairRecordData = async () => {
      loadingHairRecords.value = true;
      hairRecords.value = await fetchUserHairRecords(props.task.consulter.uuid);
      loadingHairRecords.value = false;
    }
    
    const {
      prescripts,
      fetchUserPrescripts
    } = usePrescript()

    const subscriptions = ref<ISubscription[]>([]);
    const {
      fetchSubscriptions
    } = useSubscription();

    // const tasks = ref<ITask[]>([]);
    

    const orders = ref<IOrder[]>([]);
    const {
      fetchUserOrders
    } = useOrder();
    
    // const loadingTasks = ref(false);
    const loadingSubscriptions = ref(false)
    const loadingOrders = ref(false)
    const loadingPrescripts = ref(false);
    
    const loadCustomerData = async () => {
      // loadingTasks.value = true;
      loadingSubscriptions.value = true;
      loadingOrders.value = true;
      loadingPrescripts.value = true;
      const [
        // tasksData,
        prescriptsData,
        subscData,
        orderData
      ] = await Promise.all([
        // fetchUserTasks(props.task.consulter.uuid),
        fetchUserPrescripts(props.task.consulter.uuid),
        fetchSubscriptions(props.task.consulter.uuid),
        fetchUserOrders(props.task.consulter.uuid)
      ])
      // tasks.value = tasksData;
      prescripts.value = prescriptsData;
      subscriptions.value = subscData;
      orders.value = orderData
      
      loadingPrescripts.value = true;
      loadingSubscriptions.value = false;
      loadingOrders.value = false;

    }
    watch(() => props.task, () => {
      loadCustomerData();
      loadHairRecordData();
    })
    onMounted(async () => {
      // fetchLogs();
      loadCustomerData();
      loadHairRecordData();
    });

  

    return {
      tabs,
      tab,
      prescripts,
      subscriptions,
      orders,
      hairRecords,
      loadingSubscriptions,
      loadingPrescripts,
      loadingOrders,
      loadingHairRecords
    };
  }
})
</script>
