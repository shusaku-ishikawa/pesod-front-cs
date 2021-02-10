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
          label="すべてチェック"
        ></p-checkbox>
      </div>
      <div class="relative flex-grow flex flex-col ">
        <div class="flex-grow">
          <div class="w-full absolute">
            <store-product-list-card
              v-for="i in 4"
              :key="i"
              @click="() => { router.push({ name: 'StoreProductDetail', params: { id: 1 } }) }"
            ></store-product-list-card>
          </div>
        </div>
      </div>
      <div class="py-3 ">
        <button
          @click="() => { router.push({ name: 'StorePayment1' }) }"
          class="secondary block mb-5 mx-auto"
        >
          チェックした商品をカートに入れる
        </button>
        <button class="block mx-auto">
          もどる
        </button>
      </div>
    </div>
  </base-layout>

</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

import StoreProductListCard from './ListCard.vue'

export default defineComponent({
  components: {
    StoreProductListCard
  },
  setup() {
    const router = useRouter();

    return {
      router
    };
  }
})
</script>