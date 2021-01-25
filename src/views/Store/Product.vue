<template>
  <div class="flex flex-col flex-grow">
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
          ></store-product-list-card>
        </div>
      </div>
    </div>
    <div class="py-3 ">
      <button
        class="primary block mb-5 mx-auto"
      >
        カートに入れる
      </button>
      <button class="block mx-auto">
        もどる
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

import StoreProductListCard from '@/views/Store/Product/ListCard.vue'

export default defineComponent({
  components: {
    StoreProductListCard
  },
  setup() {
    const route = useRoute();

    return {
      route
    };
  }
})
</script>