<template>
  <base-layout>
    <template v-slot:title>
      <div class="">
        <svg
          @click="() => { router.push({ name: 'StoreProductList' }) }"
          class="h-8 w-8 cursor-pointer absolute "
          xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        <div>
          定期購入の申し込み
        </div>
      </div>
    </template>
    <div class="flex flex-col flex-grow pb-5">
      <store-stepper
        class="mb-10"
        :step="3"
      ></store-stepper>
      <div class="bg-gray-100 p-2 text-left text-sm">
        申し込みはまだ確定しておりません。内容の最終確認をお願いい
        たします。
      </div>
      <div class="text-left p-2 mb-3">
        <product-list-card
          v-for="(p, i) in cart"
          :key="i"
          :product="p"
          :isSelectable="false"
        ></product-list-card>
      </div>
      <div class="mb-3">
        <table class="w-72 mx-auto">
          <tbody>
            <tr>
              <th class="text-left">商品数</th>
              <td class="text-right">
                {{ cart.length }}個
              </td>
            </tr>
            <tr>
              <th class="text-left">小計</th>
              <td class="text-right">
                {{ cartItemTotalPrice.toLocaleString() }}円
              </td>
            </tr>
            <tr>
              <th class="text-left">消費税</th>
              <td class="text-right">
                {{ cartItemTotalTax.toLocaleString() }}円
              </td>
            </tr>
            <tr class="text-2xl font-bold">
              <th class="text-left">合計</th>
              <td class="text-right">
                {{ (cartItemTotalPrice + cartItemTotalTax).toLocaleString() }}円
              </td>
            </tr>
            
          </tbody>
        </table>
      </div>
      <div>
        <div class="bg-gray-100 p-1 mb-3">
          配送先情報
        </div>
        <div class="w-72 inline-block mx-auto ">
          <div class="text-left mb-4">
            <label for="">お宛名</label>
            <div class="text-2xl">
              {{ delivery.receiver }}様
            </div>
          </div>
          <div class="text-left mb-4">
            <label for="">ご住所</label>
            <div class="text-2xl">
              <div>{{ delivery.zip_code }}</div>
              <div>
                {{ delivery.prefecture }}{{ delivery.city }}{{ delivery.address }}
              </div>
            </div>
          </div>
          <div class="text-left mb-4">
            <label for="">電話番号</label>
            <div class="text-2xl">
              <div>{{ delivery.phone_number }}</div>
             
            </div>
          </div>
          <div class="text-left mb-4">
            <label for="">配送希望時間帯</label>
            <div class="text-2xl">
              <div>{{ delivTimes.find(d => d.value == delivery.deliv_time).text }}</div>
             
            </div>
          </div>
          
        </div>
        
        
      </div>
      <div v-if="card" class="mb-3">
        <div class="bg-gray-100 p-1 mb-2">
          クレジットカード決済
        </div>
        <div class="p-2 text-lg items-center flex justify-center">
          <div>
            {{ card.brand }}  
          </div>
          <div class="ml-5 text-base">
            **** **** **** {{ card.last4 }}
          </div>
        </div>
      </div>
      
      <div class="px-2">
        <button
          @click="onFixOrder"
          class="block w-full bg-black text-white mx-auto mb-3 py-4"
        >
          定期購入を申し込む
        </button>
        <button
          class="secondary w-full py-4"
          @click="router.push({ name: 'StorePayment2' })"
        >
          もどる
        </button>
      </div>
      
    </div>
  </base-layout>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, SetupContext, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ISubscription, IProduct, IDelivery } from '@/types/Interfaces'
import useProduct from '@/types/Product';

import ProductListCard from './Product/ListCard.vue';

import StoreStepper from './Stepper.vue'

export default defineComponent({
  components: {
    StoreStepper,
    ProductListCard
  },
  emits: [
    'commit:order'
  ],
  props: {
    delivery: {
      type: Object as () => IDelivery
    },
    cart: {
      type: Object as () => IProduct[]
    },
    card: {
      type: Object
    }
  },
  setup(props: any, context: SetupContext) {
    const route = useRoute();
    const router = useRouter();

    const {
      getProduct
    } = useProduct();

    // const productsInCart = ref<IProduct[]>([]);
    const scheduledDelivery = ref(false);

    // onMounted(async () => {
    //   // 商品がカートになければ商品画面に戻る
    //   if (props.subscription.product_ids.length === 0) {
    //     router.push({ name: 'StoreProductList' })
    //   }
    //   // props.subscription.product_ids.map(async (pid: any) => {
    //   //   productsInCart.value.push(await getProduct(pid.id));
    //   // });
    // });
    const delivTimes = [
      {
        value: 0,
        text: '指定なし'
      },
      {
        value: 1,
        text: '午前中'
      },
      {
        value: 12,
        text: '12:00～14:00'
      },
      {
        value: 14,
        text: '14:00～16:00'
      },
      {
        value: 16,
        text: '16:00～18:00'
      },
      {
        value: 18,
        text: '18:00～20:00'
      },
      {
        value: 19,
        text: '19:00～21:00'
      }
    ]
    const onFixOrder = () => {
      // console.log(props.subscription)
      context.emit('commit:order')
      // router.push({ name: 'StorePaymentDone' })
    }

    const showDetail = ref<IProduct | null>(null);

    // const cart = ref<IProduct[]>([]);
    const cartItemTotalPrice = computed(() => {
      let total = 0;
      props.cart.map((p: IProduct) => {
        total += p.price;
      })
      return total;
    });
    const cartItemTotalTax = computed(() => {
      let total = 0;
      props.cart.map((p: IProduct) => {
        total += p.price * p.tax_rate / 100;
      })
      return total;
    })
    return {
      delivTimes,
      route,
      router,
      onFixOrder,
      scheduledDelivery,
      cartItemTotalPrice,
      cartItemTotalTax,
      showDetail
      // onSubmit
    };
  }
})
</script>