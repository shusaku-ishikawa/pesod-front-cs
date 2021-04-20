<template>
  <div class="inline-block shadow-xl transform align-middle" >
    <div class=" rounded bg-white px-6 py-4 sm:pb-4">
      <div class="text-left">注文詳細</div>
      <div class="mb-2">
        <table class="border-collapse w-full border">
          <tbody>
            <tr>
              <th>注文ID</th>
              <td>{{ order.id }}</td>
              <th>注文日</th>
              <td>{{ order.order_date }}</td>
              
            </tr>
            <tr>
              <th>注文ステータス</th>
              <td>{{ order.order_status }}</td>
              <th>定期ID</th>
              <td>？？？</td>
              
            </tr>
            <tr>
              <th>顧客名(id)</th>
              <td>{{ order.customer.first_name }} {{ order.customer.last_name }}({{ order.customer.id }})</td>
              <th>顧客名かな</th>
              <td>{{ order.customer.first_name_kana }} {{ order.customer.last_name_kana }}</td>
              
            </tr>
            <tr>
              <th>メールアドレス</th>
              <td>{{ order.customer.email }}</td>
              <th>電話番号</th>
              <td>{{ order.customer.phone_number }}</td>
              
            </tr>
            <tr>
              <th>住所</th>
              <td colspan="3">
                <div>
                  {{ order.customer.zip_code }}
                </div>
                <div>
                  {{ order.customer.prefecture }}{{ order.customer.city }}{{ order.customer.street }}
                </div>
              </td>
              
            </tr>
            <tr>
              <th>お支払い方法</th>
              <td>{{ payMethods[order.pay_method] }}</td>
              <th>決済ステータス</th>
              <td>{{ payStatus[order.pay_status] }}</td>
            </tr>
            <tr>
              <th>配送日指定</th>
              <td>{{ order.deliv_date }}</td>
              <th>配送時間指定</th>
              <td>{{ delivTimes[order.deliv_time] }}</td>
              
            </tr>
            <tr>
              <th>配送伝票番号</th>
              <td>{{ order.deliv_no }}</td>
              <th>申し込み日</th>
              <td>{{ order.order_date }}</td>
            </tr>
            <tr>
              <th>注文メモ</th>
              <td colspan="3">
                {{ order.memo }}
              </td>
            </tr>
            <tr
              v-for="(op, i) in order.products"
              :key="i"
            >
              <td colspan="3">
                <div class="flex items-center">
                  <div>
                    <img :src="op.product.image" alt="">
                  </div>
                  <div>
                    {{ op.product.name }}
                  </div>
                </div>
              </td>
              <td style="text-align: right">
                {{ op.sub_amount.toLocaleString() }}円
              </td>
            </tr>
            <tr>
              <th class="no-justify" colspan="3">手数料（税込）</th>
              <td style="text-align: right">{{ order.charge.toLocaleString() }}円</td>
            </tr>
            <tr>
              <th class="no-justify" colspan="3">送料（税込）</th>
              <td style="text-align: right">{{ order.deliv_fee.toLocaleString() }}円</td>
            </tr>
            <tr>
              <th class="no-justify"  colspan="3">離島手数料（税込）</th>
              <td style="text-align: right">{{ order.relay_fee.toLocaleString() }}円</td>
            </tr>
            <tr>
              <th class="no-justify"  colspan="3">合計（税込）</th>
              <td style="text-align: right">{{ (order.total_amount + order.tax_amount).toLocaleString() }}円</td>
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
        padding: 0px 10px;
      }
      th, td {
        border: lightgray solid 1px;
      }
    }
  }
</style>
<script lang="ts">
import { defineComponent, ref, onMounted, SetupContext } from "vue";
import { IMessageTemplate, IOrder } from '@/types/Interfaces';

export default defineComponent({
  components: {
    
  },
  props: {
    order: {
      type: Object as () => IOrder[]
    }
  },
  emits: [
    'close',
  ],
  setup(_, context: SetupContext) {
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
    const onClose = () => {
      context.emit('close')  
    };
    return {
      onClose,
      payStatus,
      payMethods,
      delivTimes
    }
  }
})
</script>
