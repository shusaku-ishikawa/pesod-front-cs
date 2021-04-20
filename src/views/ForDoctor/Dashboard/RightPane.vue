<template>
  <div
    class="h-full flex flex-col w-full sm:px-3 sm:py-5 "
  >
    <div>
      <ul class='flex  cursor-pointer text-sm justify-center'>
        <li
          
          v-for="(t, i) in tabs"
          :key="i"
          @click="tab = t.value"
          :class="{ 'bg-primary text-white ': t.value === tab }"
          class='flex-auto py-1 px-4 bg-white rounded-t-lg border'
        >
          {{ t.text }}
        </li>
      </ul>
    </div>
    <div class="w-full relative flex-grow overflow-y-auto">
      <answer-tab
        class="absolute"
        v-if="tab === 'answer'"
        :prescript="prescript"
      ></answer-tab>
      <user-profile-tab
        class="absolute"
        v-if="tab === 'profile'"
        :prescript="prescript"
        :subscriptions="subscriptions"
        :prescripts="prescripts"
        :orders="orders"
      ></user-profile-tab>
        
    </div>
    
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, SetupContext, ref } from "vue";
import AnswerTab from './RightPane/AnswerTab.vue';
import UserProfileTab from './RightPane/UserProfileTab.vue';
import useSubscription from '@/types/Subscription';
import usePrescript from '@/types/Prescript';
import useOrder from '@/types/Order';

import { IAnswer, ISubscription, IAnswerOption, IPrescript, IOrder } from "@/types/Interfaces";
import { useRoute } from "vue-router";

export default defineComponent({
  components: {
    AnswerTab,
    UserProfileTab
  },
  props: {
    prescript: {
      type: Object as () => IPrescript
    }
  },
  setup(props: any, context: SetupContext) {
    const tabs = [
      {
        value: 'answer',
        text: '問診表'
      },
      {
        value: 'profile',
        text: '顧客情報'
      },
      {
        value: 'hairRecord',
        text: '毛髪記録'
      },
      
    ]
    const tab = ref<string>('answer')

    const subscriptions = ref<ISubscription[]>([]);
    const {
      fetchSubscriptions
    } = useSubscription('doctor');

    const prescripts = ref<IPrescript[]>([]);
    const {
      fetchUserPrescripts   
    } = usePrescript('doctor');
    const orders = ref<IOrder[]>([]);
    const {
      fetchUserOrders
    } = useOrder('doctor');
    
    onMounted(async () => {
      // fetchLogs();
      prescripts.value = await fetchUserPrescripts(props.prescript.customer.uuid);
      subscriptions.value = await fetchSubscriptions(props.prescript.customer.uuid)
      orders.value = await fetchUserOrders(props.prescript.customer.uuid);
    });

    const onPage = (page: string) => {
      // alert('page')
      context.emit('page', page);
    };
    

    return {
      onPage,
      tabs,
      tab,
      subscriptions,
      prescripts,
      orders,
    };
  }
})
</script>
