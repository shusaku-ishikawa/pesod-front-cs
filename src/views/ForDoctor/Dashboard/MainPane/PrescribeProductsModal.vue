<template>
  <div class="inline-block shadow-xl transform align-middle" >
    <div class="my-20 rounded bg-white px-6 py-4 sm:pb-4">
      <div class="text-left">商品選択</div>
      <div class="mb-3 grid grid-cols-2 gap-1">
        <div
          v-for="(p, i) in products"
          :key="i"
          class="col-span-1"
        >
        <product-list-card
          
          :product="p"
          @update:toPrescribe="updateToPrescribe(p, $event)"
          @click="updateToPrescribe(p, !isToPrescribe(p))"
          :toPrescribe="isToPrescribe(p)"
        ></product-list-card> 
        </div>
        
      </div>
      <hr class="my-3">
      <div class="flex ">
        <button
          @click="onPrescribe"
          class="border rounded text-xs"
          :disabled="!productsToPrescribe.length"
        >
          処方提案
        </button>
        <button
          @click="onClose"
          class="bg-gray-200 text-white border ml-auto text-xs"
        >
          閉じる
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, SetupContext } from "vue";
import { IPrescript, IProduct } from '@/types/Interfaces';
import ProductListCard from './ProductListCard.vue';

import useProduct from '@/types/Product';

export default defineComponent({
  components: {
    ProductListCard
  },
  props: {
    products: Object as () => IProduct[]
  },
  emits: [
    'close',
    'prescribe'
  ],
  setup(_, context: SetupContext) {
    // const {
    //   // products,
    //   // fetchProducts
    // } = useProduct();
    
    const productsToPrescribe = ref<IProduct[]>([]);

    // onMounted(async () => {
    //   products.value = await fetchProducts();
    // })

    const onPrescribe = () => {
      
      context.emit('prescribe', productsToPrescribe.value);
    };
    
    const onClose = () => {
      context.emit('close')  
    };

    const isToPrescribe = (p: IProduct) => {
      return productsToPrescribe.value.find((p2p: IProduct) => p.id === p2p.id) != null;
    };
    const updateToPrescribe = (p: IProduct, value: boolean) => {
      if (value) {
        productsToPrescribe.value.push(p)
      } else {
        const index = productsToPrescribe.value.findIndex((p2p: IProduct) => p.id === p2p.id);
        if (index >= 0) {
          productsToPrescribe.value.splice(index, 1);
        }
      }
    };

    return {
      // products,
      productsToPrescribe,
      onClose,
      onPrescribe,
      isToPrescribe,
      updateToPrescribe
    };
  }
})
</script>
