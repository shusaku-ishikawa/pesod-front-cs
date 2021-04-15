<template>
  <base-layout>
    <template v-slot:title>
      <div class="">
        
        <svg
          @click="() => { router.push({ name: 'DiagnosticTop' }) }"
          class="h-6 w-6 left-1 cursor-pointer absolute "
          xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        
        </svg>
        <div>
          定期購入の申し込み
        </div>
      </div>
    </template>
    <div class="flex flex-col flex-grow pb-5" style="padding: 20px 30px">
      <div class="pb-5">
        <img src="@/assets/img/store/pay_list03.png" alt="">
      </div>
      <div class="bg-gray-100 px-8 py-1 text-left " style="font-size: 12px; ">
        申し込みはまだ確定しておりません。<br>内容の最終確認をお願いい
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
      <div class="">
        <cart-price-table
          :cart="cart"
        ></cart-price-table>
      </div>
    </div>
    <div>
      <div class="bg-gray-100 text-left" style="height: 30px; padding-left: 30px; line-height: 30px">
        配送先情報
      </div>
      <div class="" style="padding: 20px 30px">
        <div class="text-left mb-4">
          <label for="">お宛名</label>
          <div class="text-lg">
            {{ delivery.receiver }}様
          </div>
        </div>
        <div class="text-left mb-4">
          <label for="">ご住所</label>
          <div class="text-lg">
            <div>{{ delivery.zip_code }}</div>
            <div>
              {{ delivery.prefecture }}{{ delivery.city }}{{ delivery.address }}
            </div>
          </div>
        </div>
        <div class="text-left mb-4">
          <label for="">電話番号</label>
          <div class="text-lg">
            <div>{{ delivery.phone_number }}</div>
            
          </div>
        </div>
        <div class="text-left mb-4">
          <label for="">配送希望時間帯</label>
          <div class="text-lg">
            <div>{{ delivTimes.find(d => d.value == delivery.deliv_time).text }}</div>
            
          </div>
        </div>
      </div>
    </div>  
    
    <div >
      <div v-if="card" class="mb-3">
        <div class="bg-gray-100 text-left" style="height: 30px; padding-left: 30px; line-height: 30px">
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
    </div>
    
    <div class="px-2" style="padding: 0px 30px 50px">
      <button
        @click="onFixOrder"
        class="image mb-2"
      >
        <img src="@/assets/img/store/pay_complete.png" alt="">
      </button>
      <button
        class="image"
        @click="router.push({ name: 'StorePayment2' })"
      >
        <img src="@/assets/img/store/pay_back_long.png" alt="">
      </button>
    </div>
  </base-layout>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, SetupContext, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ISubscription, IProduct, IDelivery } from '@/types/Interfaces'
import useProduct from '@/types/Product';

import ProductListCard from './Product/ListCard.vue';

import CartPriceTable from "./Product/CartPriceTable.vue";

export default defineComponent({
  components: {
    // Sto?reStepper,
    ProductListCard,
    CartPriceTable
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