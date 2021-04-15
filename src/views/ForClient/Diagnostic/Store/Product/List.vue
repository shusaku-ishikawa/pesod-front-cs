<template>
  <base-layout>
    <template v-slot:title>
      <div class="">
        <svg
          @click="() => { router.push({ name: 'DiagnosticTop' }) }"
          class="h-8 w-8 cursor-pointer absolute "
          xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        <div>
          定期購入の申し込み
        </div>
      </div>
    </template>
    <div class="flex flex-col flex-grow bg-white px-3">
      <div class="bg-gray-100 py-2 px-1 text-sm mb-3">
        申し込みをご希望の商品にチェックを入れてください
      </div>
      <div class=" flex-grow flex flex-col ">
        <template v-for="(p , i) in products" :key="i">
          <store-product-list-card
            :inCart="isInCart(p)"
            :product="p"
            @update:inCart="editCart(p, $event)"
            @showDetail="showDetail = $event"
            
          ></store-product-list-card>
        </template>
      </div>
      <div>
        <table class="w-64 mx-auto">
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
      <div class="py-3 ">
        <button
          :disabled="!cart.length"
          @click="commitCart()"
          class="image"
        >
          <img src="@/assets/img/monshin_next_on.png" alt="">
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
export default defineComponent({
  components: {
    StoreProductListCard,
    DetailModal
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
      // try {
      //   products.value = await fetchProducts();
      //   console.log(products.value)
      //   products.value.map((p: IProduct) => {
      //     if (p.is_doctor_recommend) {
      //       cart.value.push(p);
      //     }
      //   })
      // } catch (err) {
      //   const { response } = err;
      //   if (response) {
      //     const { status, data } = response;
      //     console.error(data);
      //   }
      // }
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
      cartItemTotalPrice,
      cartItemTotalTax,
      editCart,
      commitCart,
      checkAll,
    };
  }
})
</script>