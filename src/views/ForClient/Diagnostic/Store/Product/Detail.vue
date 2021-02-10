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
    <div class="flex flex-col flex-grow bg-white">
      <div class="mx-auto p-5">
        <svg
          class="w-36 mb-3 mx-auto"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <div class="text-lg mb-5">
          <div>デュタステリド</div>
          <div>
            00,000円
          </div>
        </div>
        <div class="text-sm text-left">
          説明テキスト説明テキスト説明テキスト説明テキスト説明テキスト説明テキスト説明テキスト説明テキスト説明テキスト説明テキスト
          説明テキスト説明テキスト説明テキスト説明テキスト説明テキスト説明テキスト説明テキスト説明テキスト説明テキスト説明テキスト
          
        </div>
      </div>
    </div>
  </base-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
  },
  setup() {
    const router = useRouter();

    return {
      router
    };
  }
})
</script>