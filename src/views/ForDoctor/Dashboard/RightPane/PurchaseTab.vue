<template>
  <div class="w-full sm:py-5 text-xs">
    <div class="text-left mb-5">
      <div class="inline-block border border-b-0 bg-primary-light py-1 px-5 w-36  rounded-tl-lg rounded-tr-full">
        顧客情報詳細
      </div>
      <div class="border p-2 px-4 rounded-tr rounded-br rounded-bl">
        <table class="border-collapsed w-full ">
          <tbody class="border-b ">
            <tr>
              <th>顧客ID</th>
              <td>{{ prescript.customer.id }}</td>
            </tr>
          </tbody>
          <tbody class="border-b">
            <tr>
              <th>お名前</th>
              <td class="text-left">{{ `${prescript.customer.first_name} ${prescript.customer.last_name}` }}</td>
            </tr>
            <tr>
              <th>性別</th>
              <td class="text-left">
                {{ prescript.customer.gender != null ? genders[prescript.customer.gender] : 'ー' }}
              </td>
            </tr>
            <tr>
              <th>生年月日</th>
              <td class="text-left">{{ prescript.customer.birthday }}</td>
            </tr>
            
          </tbody>
          <tbody class="">
            <tr>
              <th>住所</th>
              <td>
                <div>
                  {{ prescript.customer.zip_code }}
                </div>
                <div>
                  {{ prescript.customer.prefecture }}{{ prescript.customer.city }}{{ prescript.customer.address }}
                </div>
              </td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{{ prescript.customer.email }}</td>
            </tr>
            <tr>
              <th>電話番号</th>
              <td>{{ prescript.customer.phone_number }}</td>
            </tr>
            
          </tbody>

        </table>
      </div>
    </div>
    <div class="text-left mb-5">
      <div class="inline-block title-tag border border-b-0 bg-primary-light py-1 px-5 w-36  rounded-tl-lg rounded-tr-full">
        診察履歴
      </div>
      <div
        v-if="loadingPrescripts"
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
        <purchase-tab-prescript-card
          v-for="(p, i) in prescripts"
          :key="i"
          :prescript="p"
          @click="modalPrescript = p"
        ></purchase-tab-prescript-card>
      
      </div>
      
    </div>
    <div class="text-left mb-5">
      <div class="inline-block border border-b-0 bg-primary-light py-1 px-5 w-36  rounded-tl-lg rounded-tr-full">
        定期購入
      </div>
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
          <table class="border-collapsed w-full ">
            <tbody class="border-b">
              <tr

              >
                <th>定期ID</th>
                <td>{{ s.id }}</td>
              </tr>
              <tr

              >
                <th>定期ステータス</th>
                <td>{{ subscStatus[s.subsc_status] }}</td>
              </tr>
              
            </tbody>
            <tbody>
              <tr>
                <th>
                  次回お届け日
                </th>
                <td>
                  {{ s.next_delivery_date }}
                </td>
              </tr>
              <tr>
                <th>お届け日配送間隔</th>
                <td>{{ s.delivery_interval }}日</td>
              </tr>
            </tbody>
          </table>
          <div class="pl-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="text-left ">
      <div class="inline-block border border-b-0 bg-primary-light py-1 px-5 w-36  rounded-tl-lg rounded-tr-full">
        注文履歴
      </div>
      
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
        <table class="flex-grow border-collapsed w-full ">
          <tbody class="border-b">
            <tr

            >
              <th>注文ID</th>
              <td>{{ o.id }}</td>
            </tr>
           
            
          </tbody>
          <tbody>
            <tr>
              <th>
                購入金額
              </th>
              <td>
                {{ o.total_amount.toLocaleString() }}円
              </td>
            </tr>
            <tr>
              <th>定期購入</th>
              <td>{{ o.purchase_times }}回</td>
            </tr>
          </tbody>
        </table>
        <div class="pl-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
      </div>
      
    </div>
    <frame-modal
      v-if="modalOrder != null || modalSubscription != null || modalPrescript != null"
      @close="modalOrder = null; modalSubscription = null; modalPrescript = null"
    >
      <order-modal
        v-if="modalOrder != null"
        :order="modalOrder"
        @close="modalOrder = null"
      ></order-modal>
      <subscription-modal
        v-if="modalSubscription != null"
        :subscription="modalSubscription"
        @close="modalSubscription = null"
      ></subscription-modal>
      <prescript-history-modal
        v-if="modalPrescript != null"
        :prescript="modalPrescript"
        @close="modalPrescript = null"
        
      ></prescript-history-modal>
    </frame-modal>
  </div>
</template>
<style lang="scss" scoped>
  table {
    tr {
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

import { IAnswer, IAnswerOption, IOrder, IPrescript } from "@/types/Interfaces";

import { ISubscription } from '@/types/Interfaces'
import OrderModal from './PurchaseTabOrderModal.vue'
import SubscriptionModal from './PurchaseTabSubscriptionModal.vue';
import PrescriptHistoryModal from './PurchaseTabPrescriptHistoryModal.vue';
import PurchaseTabPrescriptCard from './PurchaseTabPrescriptCard.vue';
export default defineComponent({
  components: {
    OrderModal,
    SubscriptionModal,
    PrescriptHistoryModal,
    PurchaseTabPrescriptCard
  },
  props: {
    prescript: {
      type: Object as () => IPrescript
    },
    subscriptions: {
      type: Object as () => ISubscription[]
    },
    loadingSubscriptions: {
      type: Boolean
    },
    loadingPrescripts: {
      type: Boolean
    },
    prescripts: {
      type: Object as () => IPrescript[]
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
