<template>
  <top-layout>
    <template v-slot:title>
      <div class="relative">
        <svg
          @click="() => { router.push({ name: 'Lp' }) }"
          class="absolute top-0 left-0 w-10 h-10 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        <div class="">
          新規登録
        </div>
      </div>
    </template>
    <div class="grid grid-cols-12">
      <div class="col-span-12">
        <div
          class="mb-4"
        >
          <div
            class="font-bold text-lg mb-2"
          >
            利用規約
          </div>
          <div
            class="border-2 border-black p-2"
          >
            規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル
            規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル
            規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル
            規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル
            規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル
            規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル
            
          </div>
        </div>
        <div
          class="mb-4"
        >
          <div
            class="font-bold text-lg mb-2"
          >
            プライバシーポリシー
          </div>
          <div
            class="border-2 border-black p-2"
          >
            規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル
            規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル
            規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル
            規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル
            規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル
            規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル規約サンプル
            
          </div>
        </div>
        <div>
          
        </div>
      </div>
      <form
        class="py-5 col-span-12 sm:col-span-6 sm:col-start-4 md:col-span-4 md:col-start-5 p-5"
        @submit.prevent="() => {}"
      >
        <p-checkbox
          class="mb-5"
          label="私はペルソナの利用規約と、プライバシーポリシーに同意します。"
        ></p-checkbox>
        <div
          class="text-center"
        >
          <button
            @click="() => { router.push({ name: 'Signup2' }) }"
            type="submit"
            class="primary arrow w-64 mb-10"
          >
              次へ
          </button>
        </div>
      </form>
    </div>
  </top-layout>
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