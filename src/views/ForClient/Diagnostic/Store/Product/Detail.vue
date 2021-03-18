<template>
  <base-layout>
    <template v-slot:title>
      <page-title>
        <div class="flex items-center mr-auto">
          <page-title-back
            @click="() => { router.push({ name: 'StoreProductList' }) }"
          ></page-title-back>
          <div>
            購入
          </div>
        </div>
      </page-title>
    </template>
    <div v-if="product" class="flex flex-col flex-grow bg-white">
      <div class="p-5">
        <img
          :src="product.image"
          alt=""
          class="w-36 mx-auto mb-3"
        >
        <div class="text-lg mb-5">
          <div>{{ product.name }}</div>
          <div>
            {{ product.price.toLocaleString() }}円
          </div>
        </div>
        <div class="text-sm text-left">
         {{ product.usage }}
          
        </div>
      </div>
    </div>
  </base-layout>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useProduct from '@/types/Product';

export default defineComponent({
  components: {
  },
  setup() {
    const route = useRoute();

    const router = useRouter();

    const productId = route.params.id.toString();

    const {
      product,
      getProduct
    } = useProduct();

    onMounted(async () => {
      try {
        product.value = await getProduct(productId);
      } catch (err) {
        const { response } = err;
        if (response) {
          const { data } = response;
          console.error(data)
        } else {
          console.error(err)
        }
      }
    });

    return {
      router,
      product
    };
  }
})
</script>