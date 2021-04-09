<template>
  <div class="inline-block shadow-xl transform align-middle" >
    <div class="my-20 rounded bg-white px-6 py-4 sm:pb-4">
      <div class="mb-3 border-b">
        <product-list-card
          v-for="(p, i) in products"
          :key="i"
          :product="p"
          @update:toPrescribe="updateToPrescribe(p, $event)"
          :toPrescribe="isToPrescribe(p)"
        ></product-list-card>
      </div>
      <div class="flex ">
        <button
          @click="onPrescribe"
          class="primary"
          :disabled="!productsToPrescribe.length"
        >
          処方提案
        </button>
        <button
          @click="onClose"
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
  },
  emits: [
    'close',
    'prescribe'
  ],
  setup(_, context: SetupContext) {
    const {
      products,
      fetchProducts
    } = useProduct();
    
    const productsToPrescribe = ref<IProduct[]>([]);

    onMounted(async () => {
      products.value = await fetchProducts();
    })

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
      products,
      productsToPrescribe,
      onClose,
      onPrescribe,
      isToPrescribe,
      updateToPrescribe
    };
  }
})
</script>
