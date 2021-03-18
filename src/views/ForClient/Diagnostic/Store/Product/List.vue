<template>
  <base-layout>
    <template v-slot:title>
      <page-title>
        購入
      </page-title>
    </template>
    <div class="flex flex-col flex-grow bg-white">
      <div class="flex justify-center py-2 border-b mb-2">
        <p-checkbox
          @update:modelValue="checkAll"
          label="すべてチェック"
        ></p-checkbox>
      </div>
      <div class="relative flex-grow flex flex-col ">
        <div class="flex-grow">
          <div class="w-full absolute">
            <store-product-list-card
              v-for="(p, i) in products"
              :key="i"
              :inCart="isInCart(p)"
              :product="p"
              @update:inCart="editCart(p, $event)"
            ></store-product-list-card>
            
          </div>
        </div>
      </div>
      <div class="py-3 ">
        <button
          :disabled="!cart.length"
          @click="commitCart()"
          class="secondary block mb-5 mx-auto"
        >
          チェックした商品をカートに入れる
        </button>
        <button
          @click="router.push({ name: 'DiagnosticTop' })"
          class="block mx-auto">
          もどる
        </button>
      </div>
    </div>
  </base-layout>

</template>
<script lang="ts">
import { IPrescript, IProduct } from '@/types/Interfaces';
import { defineComponent, onMounted, ref, SetupContext } from 'vue';
import { useRouter } from 'vue-router';
import useProducts from '@/types/Product';
import StoreProductListCard from './ListCard.vue'
import usePrescript from '@/types/Prescript';

export default defineComponent({
  components: {
    StoreProductListCard
  },
  props: {
    prescript: {
      type: Object as () => IPrescript
    }
  },
  emits: [
    'update:cart'
  ],
  setup(props: any, context: SetupContext) {
    const router = useRouter();

    const {
      products,
      fetchProducts
    } = useProducts();
    
    const cart = ref<IProduct[]>([]);

    const isInCart = (p: IProduct) => {
      return cart.value.find((cp: IProduct) => cp.id === p.id) != null;  
    };

    const editCart = (p: IProduct, isInCart: boolean) => {
      if (isInCart) {
        cart.value.push(p)
      } else {
        
        const index = cart.value.findIndex((cp: IProduct) => cp.id === p.id);
        if (index >= 0) {
          // remove
          cart.value.splice(index, 1);
        }
      }
    };

    const commitCart = () => {
      context.emit('update:cart', cart.value);
    };

    onMounted(async () => {
      try {
        products.value = await fetchProducts();
        products.value.map((p: IProduct) => {
          if (p.is_doctor_recommend) {
            cart.value.push(p);
          }
        })
      } catch (err) {
        const { response } = err;
        if (response) {
          const { status, data } = response;
          console.error(data);
        }
      }
    });

    const checkAll = (checked: boolean) => {
      if (!checked) {
        cart.value = [];
        return;
      }
      products.value.map((p: IProduct) => {
        if (!isInCart(p)) {
          cart.value.push(p);
          
        }
      })  
    };

    return {
      router,
      cart,
      isInCart,
      editCart,
      commitCart,
      checkAll,
      products
    };
  }
})
</script>