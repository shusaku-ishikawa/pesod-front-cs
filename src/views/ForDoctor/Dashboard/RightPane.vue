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
        :answers="answers"
        :loadingAnswers="loadingAnswers"
      ></answer-tab>
      <user-profile-tab
        class="absolute"
        v-if="tab === 'profile'"
        :prescript="prescript"
        :subscriptions="subscriptions"
        :prescripts="prescripts"
        :orders="orders"
        :loadingSubscriptions="loadingSubscriptions"
        :loadingOrders="loadingOrders"
        :loadingPrescripts="loadingPrescripts"
      ></user-profile-tab>
        
    </div>
    
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, SetupContext, ref, watch } from "vue";
import AnswerTab from './RightPane/AnswerTab.vue';
import UserProfileTab from './RightPane/UserProfileTab.vue';
import useSubscription from '@/types/Subscription';
import usePrescript from '@/types/Prescript';
import useOrder from '@/types/Order';

import { IAnswer, ISubscription, IAnswerOption, IPrescript, IOrder } from "@/types/Interfaces";
import useAnswer from '@/types/Answer';

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

    const {
      answers,
      fetchAnswers
    } = useAnswer('doctor');
    const loadingAnswers = ref(false);
    const setAnswers = async () => {
      loadingAnswers.value = true;
      const data = await fetchAnswers(props.prescript.customer.uuid);
      console.log(data)
      loadingAnswers.value = false
      answers.value = data;
      // fetchLogs();
    }
    

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
    
    const loadingSubscriptions = ref(false)
    const loadingOrders = ref(false)
    const loadingPrescripts = ref(false);
    
    const updateData = async () => {
      loadingSubscriptions.value = true;
      loadingOrders.value = true;
      loadingPrescripts.value = true;
      prescripts.value = await fetchUserPrescripts(props.prescript.customer.uuid);
      loadingPrescripts.value = false;
      subscriptions.value = await fetchSubscriptions(props.prescript.customer.uuid)
      loadingSubscriptions.value = false;
      orders.value = await fetchUserOrders(props.prescript.customer.uuid);
      loadingOrders.value = false;

    }
    watch(() => props.prescript, () => {
      updateData();
      setAnswers();
    })
    onMounted(async () => {
      // fetchLogs();
      updateData();
      setAnswers();
    });

    const onPage = (page: string) => {
      // alert('page')
      context.emit('page', page);
    };
    

    return {
      onPage,
      tabs,
      tab,
      answers,
      subscriptions,
      prescripts,
      orders,
      loadingSubscriptions,
      loadingPrescripts,
      loadingOrders,
      loadingAnswers
    };
  }
})
</script>
