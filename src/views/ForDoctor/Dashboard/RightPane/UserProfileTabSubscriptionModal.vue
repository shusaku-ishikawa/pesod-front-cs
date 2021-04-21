<template>
  <div class="inline-block shadow-xl transform align-middle" >
    <div class=" rounded bg-white px-6 py-4 sm:pb-4">
      <div class="text-left text-base">定期購入詳細</div>
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
        <table v-else class="border-collapse w-full border">
          <tbody>
            <tr>
              <th>定期ID</th>
              <td>{{ data.id }}</td>
              <th>定期ステータス</th>
              <td>{{ subscStatus[data.subsc_status] }}</td>
              
            </tr>
            <tr>
              <th>定期購入回数</th>
              <td>{{ data.purchase_times }}回</td>
              <th>定期申込日</th>
              <td>
                {{ formatDate(data.created_at, 'YYYY/M/D') }}
              </td>
              
            </tr>
            <tr>
              <th>顧客名(id)</th>
              <td>{{ data.prescript.customer.first_name }} {{ data.prescript.customer.last_name }}({{ data.prescript.customer.id }})</td>
              <th>顧客名かな</th>
              <td>{{ data.prescript.customer.first_kana }} {{ data.prescript.customer.last_kana }}</td>
              
            </tr>
            <tr>
              <th>メールアドレス</th>
              <td>{{ data.prescript.customer.email }}</td>
              <th>電話番号</th>
              <td>{{ data.prescript.customer.phone_number }}</td>
              
            </tr>
            <tr>
              <th>住所</th>
              <td colspan="3">
                <div>
                  {{ data.prescript.customer.zip_code }}
                </div>
                <div>
                  {{ data.prescript.customer.prefecture }}{{ data.prescript.customer.city }}{{ data.prescript.customer.address }}
                </div>
              </td>
              
            </tr>
            <tr>
              <th>お支払い方法</th>
              <td>{{ payMethods[data.pay_method] }}</td>
              <th>配送間隔</th>
              <td>{{ data.delivery_interval }}日</td>
            </tr>
            <tr>
              <th>次回お届け日</th>
              <td>{{ data.next_delivery_date }}</td>
              <th>配送時間指定</th>
              <td>{{ delivTimes[data.deliv_time] }}</td>
              
            </tr>
            
            <tr>
              <th>注文メモ</th>
              <td colspan="3">
                {{ data.memo }}
              </td>
            </tr>
            <tr
              v-for="(op, i) in data.products"
              :key="i"
            >
              <td colspan="3">
                <div class="flex items-center">
                  <div>
                    <img style="width: 150px" :src="op.product.image" alt="">
                  </div>
                  <div>
                    {{ op.product.name }} x {{ op.item_count }}
                  </div>
                </div>
              </td>
              <td style="text-align: right">
                {{ (op.item_count * op.product.price || 0).toLocaleString() }}円
              </td>
            </tr>
            <tr>
              <th class="no-justify" colspan="3">手数料（税込）</th>
              <td style="text-align: right">{{ (data.charge || 0).toLocaleString() }}円</td>
            </tr>
            <tr>
              <th class="no-justify" colspan="3">送料（税込）</th>
              <td style="text-align: right">{{ (data.deliv_fee || 0).toLocaleString() }}円</td>
            </tr>
            <tr>
              <th class="no-justify"  colspan="3">離島手数料（税込）</th>
              <td style="text-align: right">{{ (data.relay_fee || 0).toLocaleString() }}円</td>
            </tr>
            <tr>
              <th class="no-justify"  colspan="3">合計（税込）</th>
              <td style="text-align: right">{{ (calcTotal(data.products) || 0).toLocaleString() }}円</td>
            </tr>
            
          </tbody>
        </table>
        
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
        padding: 3px 10px;
      }
      th, td {
        border: lightgray solid 1px;
      }
    }
  }
</style>
<script lang="ts">
import { defineComponent, computed, ref, onMounted, SetupContext } from "vue";
import { IMessageTemplate, IOrder, IProduct, ISignup, ISubscription } from '@/types/Interfaces';
import useSubscription from "@/types/Subscription";
import moment from "moment";

export default defineComponent({
  components: {
    
  },
  props: {
    subscription: {
      type: Object as () => ISubscription[]
    }
  },
  emits: [
    'close',
  ],
  setup(props: any, context: SetupContext) {
    const {
      getSubscription
    } = useSubscription('doctor');

    const subscStatus = {
      0: '継続中',
      1: '休止中',
      2: '解約'
    }
    const payStatus = {
      0: '支払い未処理',
      1: '支払い作成成功 未確定',
      2: '支払処理確定'
    }

    const payMethods = {
      0: "クレジットカード決済",
      1: "代金引換",
      2: "Paidy後払い",
      3: "NP後払い",
      4: "銀行振込"
    }
    //  const subscStatus = {
    //   0: '継続中',
    //   1: '休止中',
    //   2: '解約'
    // }
    const delivTimes = {
      0: "指定なし",
      1: "午前中",
      12: "12:00～14:00",
      14: "14:00～16:00",
      16: "16:00～18:00",
      18: "18:00～20:00",
      19: "19:00～21:00",
    }
    const orderStatus = {
      0: "キャンセル",
      1: "新規受付",
      2: "入金待ち",
      3: "取り寄せ中",
      4: "発送待ち",
      5: "発送済み",
    }
    const calcTotal = (products: IProduct[]) => {
      let total = 0;
      products.map((p: any) => {
        total += p.item_count * p.product.price;
      })
      return total;
    }
    const onClose = () => {
      context.emit('close')  
    };
    const data = ref<ISubscription | null>(null);
    const userId = computed(() => {
      return props.prescript.doctor.id
    })
    const loading = ref(true);
    onMounted(async () => {
      // loading.value = true;
      data.value = await getSubscription(props.subscription.id);
      loading.value = false
    })

    const formatDate = (strDate: string, format: string) => {
      return moment(strDate).format(format);
    }
    return {
      
      onClose,
      userId,
      payStatus,
      subscStatus,
      payMethods,
      delivTimes,
      orderStatus,
      data,
      loading,
      calcTotal,
      formatDate,
    }
  }
})
</script>
