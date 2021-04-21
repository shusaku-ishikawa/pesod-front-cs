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
    <div class="flex flex-col flex-grow bg-white px-3 pt-5">
      <div class="bg-gray-100 py-2 px-1 mb-5" style="font-size: 12px">
        申し込みをご希望の商品にチェックを入れてください
      </div>
      <div class=" flex-grow flex flex-col ">
        <template v-for="(p , i) in products.filter(p => p.is_sales)" :key="i">
          <store-product-list-card
            :inCart="isInCart(p)"
            :product="p"
            @update:inCart="editCart(p, $event)"
            @showDetail="showDetail = $event"
            
          ></store-product-list-card>
        </template>
      </div>
      <div style="margin: 25px">
        <cart-price-table
          :cart="cart"
        ></cart-price-table>
      </div>
      <div class="" style="margin-bottom: 50px; ">
        <button
          :disabled="!cart.length"
          @click="commitCart()"
          class="image"
        >
          <img v-if="cart.length" src="@/assets/img/store/pay_next_on.png" alt="">
          <img v-else src="@/assets/img/store/pay_next_off.png" alt="">
          
        </button>
      </div>
    </div>
    <frame-modal
      v-if="showDetail"
      @close="showDetail= null"
    >
      <detail-modal
        @close="showDetail = null"
        :product="showDetail" 
      >
      </detail-modal>
    </frame-modal>
  </base-layout>

</template>
<script lang="ts">
import { IPrescript, IProduct } from '@/types/Interfaces';
import { computed, defineComponent, onMounted, onUpdated, ref, SetupContext } from 'vue';
import { useRouter } from 'vue-router';
import useProducts from '@/types/Product';
import StoreProductListCard from './ListCard.vue'
import DetailModal from './DetailModal.vue';
import {clone, cloneDeep} from 'lodash'
import CartPriceTable from "./CartPriceTable.vue";

export default defineComponent({
  components: {
    StoreProductListCard,
    DetailModal,
    CartPriceTable
  },
  props: {
    products: {
      type: Object as () => IProduct[]
    },
    cart: {
      type: Object as () => IProduct[]
    }
  },
  emits: [
    'update:cart'
  ],
  setup(props: any, context: SetupContext) {
    const router = useRouter();

    // const {
    //   products,
    //   fetchProducts
    // } = useProducts();
    
    const showDetail = ref<IProduct | null>(null);

    // const cart = ref<IProduct[]>([]);
    
    const isInCart = (p: IProduct) => {
      
      const r = props.cart.find((cp: IProduct) => cp.id === p.id) != null;
      return r;

    };

    const editCart = (p: IProduct, add: boolean) => {
      const copy = cloneDeep(props.cart)
      if (add) {
        // cart.value.push(p)
        console.log(p)
        copy.push(cloneDeep(p))
        context.emit('update:cart', copy)
      } else {
        const index = props.cart.findIndex((cp: IProduct) => cp.id === p.id);
        if (index >= 0) {
          // remove
          copy.splice(index, 1)
          
          context.emit('update:cart', copy)
        }
      }
    };

    const commitCart = () => {
      // router.push({ name: 'StorePayment1' })
      context.emit('commit:cart')
    };
   
    onMounted(async () => {
      const defaultCart: IProduct[] = []
      props.products.map((p: IProduct) => {
        if (p.is_doctor_recommend) {
          defaultCart.push(p);
        }
      })
      context.emit('update:cart', defaultCart)
      
    });

    const checkAll = (checked: boolean) => {
      // if (!checked) {
        
      //   return;
      // }
      // products.value.map((p: IProduct) => {
      //   if (!isInCart(p)) {
      //     cart.value.push(p);
          
      //   }
      // })
      console.log('check all')
    };

    return {
      router,
      showDetail,
      isInCart,
      editCart,
      commitCart,
      checkAll,
    };
  }
})
</script>