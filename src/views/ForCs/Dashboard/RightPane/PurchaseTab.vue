<template>
  <div class="w-full sm:py-5 text-xs">
   
    <div class="text-left mb-5">
      <TabHeader>
        診察履歴
      </TabHeader>
      <div
        v-if="loadingTasks"
        class="border shadow rounded-tr rouned-br rounded-bl p-2 w-full mx-auto">
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
        
        v-else
      >
        <div
          v-if="prescripts.length == 0"
          class="mb-1 border p-2 px-4 rounded-tr rounded-br rounded-bl"
        >診察履歴がありません</div>
        <PurchaseTabPrescriptCard
          v-for="(p, i) in prescripts"
          :key="i"
          :prescript="p"
          @click="() => { if (p.status != 3) modalPrescript = p }"
        />
      
      </div>
      
    </div>
    <div class="text-left mb-5">
      <TabHeader>
        定期購入
      </TabHeader>
      <div
        v-if="loadingSubscriptions"
        class="border shadow rounded-tr rouned-br rounded-bl p-2 w-full mx-auto">
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
        v-else
        class=""
      >
        <div
          class="mb-1 border p-2 px-4 rounded-tr rounded-br rounded-bl"
          v-if="!subscriptions.length"
        >
          定期購入がありません
        </div>
        <div
          @click="modalSubscription = s"
          v-for="(s, i) in subscriptions"
          :key="i"
          class="hover:bg-blue-100 cursor-pointer flex items-center mb-1 border p-2 px-4 rounded-tr rounded-br rounded-bl">
          <div class="">
            <table class="border-collapsed w-full ">
              <tbody class="border-b">
                <tr

                >
                  <th>定期ID:</th>
                  <td >{{ s.id }}</td>
                </tr>
                <tr

                >
                  <th>定期ステータス:</th>
                  <td>{{ subscStatus[s.subsc_status] }}</td>
                </tr>
                
              </tbody>
              <tbody>
                <tr>
                  <th>
                    次回お届け日:
                  </th>
                  <td>
                    {{ s.next_delivery_date }}
                  </td>
                </tr>
                <tr>
                  <th>お届け日配送間隔:</th>
                  <td>{{ s.delivery_interval }}日</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pl-2 flex-shrink-0">
           <ArrowRight />
          </div>
        </div>
      </div>
    </div>
    <div class="text-left ">
      <TabHeader>
        注文履歴  
      </TabHeader>
      
      <div
        v-if="loadingOrders"
        class="border shadow rounded-tr rouned-br rounded-bl p-2 w-full mx-auto">
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
        v-else
      >
        <div
          class="mb-1 border p-2 px-4 rounded-tr rounded-br rounded-bl"
          v-if="orders.length == 0"
        >
          注文がありません
        </div>
        <div
        v-for="(o, i) in orders"
        :key="i"
        @click="modalOrder = o"
        class="cursor-pointer hover:bg-blue-100 flex items-center mb-1 border p-2 px-4 rounded-tr rounded-br rounded-bl">
        <div class="flex-auto">
          <table class=" border-collapsed w-full ">
            <tbody class="border-b">
              <tr

              >
                <th>注文ID:</th>
                <td>{{ o.id }}</td>
              </tr>
            
              
            </tbody>
            <tbody>
              <tr>
                <th>
                  購入金額:
                </th>
                <td>
                  {{ o.total_amount.toLocaleString() }}円
                </td>
              </tr>
              <tr>
                <th>定期購入:</th>
                <td>{{ o.purchase_times }}回</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pl-2 flex-shrink-0">
          <ArrowRight />
        </div>
      </div>
      </div>
      
    </div>
    <FrameModal
      v-if="modalOrder != null || modalSubscription != null || modalPrescript != null"
      @close="modalOrder = null; modalSubscription = null; modalPrescript = null"
    >
      <OrderModal
        v-if="modalOrder != null"
        :order="modalOrder"
        @close="modalOrder = null"
      ></OrderModal>
      <SubscriptionModal
        v-if="modalSubscription != null"
        :subscription="modalSubscription"
        @close="modalSubscription = null"
      ></SubscriptionModal>
      <PrescriptHistoryModal
        v-if="modalPrescript != null"
        :prescript="modalPrescript"
        @close="modalPrescript = null"
      />
    </FrameModal>
  </div>
</template>
<style lang="scss" scoped>
  table {
    table-layout: fixed;
    tbody:first-child {
      tr:last-child {
        th, td {
          padding-bottom: 5px
        }
      }
    }
    tbody:nth-child(2) {
      tr:first-child {
        th, td {
          padding-top: 5px
        }
      }
    }
    
    tr {
      line-height: 14px;
      th, td {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      th {
        white-space: nowrap;
        font-weight: 500;
        text-align-last: justify;
        text-justify: inter-ideograph;
        
      }
      td {
        padding: 3px 10px;
        
      }
    }
  }
  .title-tag::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background: #01579B;
    transform: scaleY(1.3) perspective(.6em) rotateX(5deg);
    transform-origin: bottom left;
    border-radius: 8px 8px 0 0;
  }
</style>
<script lang="ts">
import { defineComponent, ref, onMounted, SetupContext } from "vue";

import { IAnswer, IAnswerOption, IOrder, IPrescript, ITask } from "@/types/Interfaces";

import { ISubscription } from '@/types/Interfaces'
import OrderModal from './PurchaseTabOrderModal.vue'
import SubscriptionModal from './PurchaseTabSubscriptionModal.vue';
import PurchaseTabPrescriptCard from './PurchaseTabPrescriptCard.vue';
import TabHeader from '@/components/TabHeader.vue';
import PrescriptHistoryModal from './PurchaseTabPrescriptHistoryModal.vue'
export default defineComponent({
  components: {
    OrderModal,
    SubscriptionModal,
    PurchaseTabPrescriptCard,
    TabHeader,
    PrescriptHistoryModal
  },
  props: {
    task: {
      type: Object as () => ITask
    },
    subscriptions: {
      type: Object as () => ISubscription[]
    },
    loadingSubscriptions: {
      type: Boolean
    },
    loadingTasks: {
      type: Boolean
    },
    loadingPrescripts: {
      type: Boolean,
    },
    prescripts: {
      type: Object as () => IPrescript[]
    },
    tasks: {
      type: Object as () => ITask[]
    },
    orders: {
      type: Object as () => IOrder[]
    },
    loadingOrders: {
      type: Boolean
    }
  },
  setup(props: any, context: SetupContext) {
    const subscStatus = {
      0: '継続中',
      1: '休止中',
      2: '解約'
    }
    const genders = {
      0: '男性',
      1: '女性',
      2: 'その他'
    }
    const modalOrder = ref<IOrder | null>(null);
    const modalSubscription = ref<ISubscription | null>(null)
    const modalPrescript = ref<IPrescript | null>(null);
  
    return {
      subscStatus,
      modalOrder,
      modalSubscription,
      modalPrescript,
      genders
    };
  }
})
</script>
