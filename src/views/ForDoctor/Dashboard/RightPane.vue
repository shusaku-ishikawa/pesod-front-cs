<template>
  <div
    class="h-full flex flex-col w-full pt-4 px-1 "
  >
    <div class="">
      <ul class='flex  cursor-pointer text-xs font-semibold justify-center'>
        <li
          
          v-for="(t, i) in tabs"
          :key="i"
          @click="tab = t.value"
          style="width: 30px; font-size: 11px"
          :class="{ 'bg-primary text-white ': t.value === tab }"
          class='relative flex-auto py-1 bg-white rounded-t border'
        >
          {{ t.text }}
          <div v-if="t.value == tab" class="arrow-down"></div>
        </li>
      </ul>
    </div>
    <div class=" w-full relative flex-grow overflow-y-auto">
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
      ></user-profile-tab>
      <purchase-tab
        class="absolute"
        v-if="tab === 'purchase'"
        :prescript="prescript"
        :subscriptions="subscriptions"
        :prescripts="prescripts"
        :orders="orders"
        :loadingSubscriptions="loadingSubscriptions"
        :loadingOrders="loadingOrders"
        :loadingPrescripts="loadingPrescripts"
      ></purchase-tab>
      
      <hair-record-tab
        class="absolute "
        :prescript="prescript"
        :loadingHairRecords="loadingHairRecords"
        :hairRecords="hairRecords"
        v-if="tab == 'hairRecord'"
      ></hair-record-tab>
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
</style>
<script lang="ts">
import { defineComponent, onMounted, SetupContext, ref, watch } from "vue";
import AnswerTab from './RightPane/AnswerTab.vue';
import UserProfileTab from './RightPane/UserProfileTab.vue';
import HairRecordTab from './RightPane/HairRecordTab.vue';
import PurchaseTab from './RightPane/PurchaseTab.vue';
import useSubscription from '@/types/Subscription';
import usePrescript from '@/types/Prescript';
import useOrder from '@/types/Order';
import useHairRecord from '@/types/HairRecord';

import { IAnswer, ISubscription, IAnswerOption, IPrescript, IOrder, IHairRecord } from "@/types/Interfaces";
import useAnswer from '@/types/Answer';

export default defineComponent({
  components: {
    AnswerTab,
    UserProfileTab,
    PurchaseTab,
    HairRecordTab
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
        value: 'purchase',
        text: '診察・購入履歴'
      },
      
      {
        value: 'hairRecord',
        text: '毛髪記録'
      },
      
    ]
    const tab = ref<string>('answer')
    
    const hairRecords = ref<IHairRecord[]>([]);
    const loadingHairRecords = ref(false);
    const {
      fetchUserHairRecords  
    } = useHairRecord();
    const loadHairRecordData = async () => {
      loadingHairRecords.value = true;
      hairRecords.value = await fetchUserHairRecords(props.prescript.customer.uuid);
      loadingHairRecords.value = false;
      console.log(hairRecords.value)
    }
    const {
      answers,
      fetchAnswers
    } = useAnswer();

    const loadingAnswers = ref(false);
    const loadAnswerData = async () => {
      loadingAnswers.value = true;
      const data = await fetchAnswers(props.prescript.customer.uuid);
      console.log(data)
      loadingAnswers.value = false
      answers.value = data.filter((a: any) => a.prescript == props.prescript.id);
      console.log(props.prescript )
      // fetchLogs();
    }
    

    const subscriptions = ref<ISubscription[]>([]);
    const {
      fetchSubscriptions
    } = useSubscription();

    const prescripts = ref<IPrescript[]>([]);
    const {
      fetchUserPrescripts   
    } = usePrescript();
    const orders = ref<IOrder[]>([]);
    const {
      fetchUserOrders
    } = useOrder();
    
    const loadingSubscriptions = ref(false)
    const loadingOrders = ref(false)
    const loadingPrescripts = ref(false);
    
    const loadCustomerData = async () => {
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
      loadCustomerData();
      loadAnswerData();
      loadHairRecordData();
    })
    onMounted(async () => {
      // fetchLogs();
      loadCustomerData();
      loadAnswerData();
      loadHairRecordData();
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
      hairRecords,
      loadingSubscriptions,
      loadingPrescripts,
      loadingOrders,
      loadingAnswers,
      loadingHairRecords
    };
  }
})
</script>
