<template>
  <top-layout>
    <template v-slot:title>
      <div class="relative">
        
        <svg
          class="absolute top-0 left-0 w-10 h-10"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        <div class="">
          ログイン
        </div>
      </div>
    </template>
    <div class="grid grid-cols-12">
      <form
        class="py-5 col-span-12 sm:col-span-6 sm:col-start-4 md:col-span-4 md:col-start-5 rounded p-5 border"
        @submit.prevent="onSubmit"
      >
        <p-input
          class="mb-10"
          label="メールアドレス"
          id="email"
          type="text"
        >
        </p-input>
        
        <p-input
          class="mb-12"
          label="パスワード"
          id="password"
          type="password"
        >
        </p-input>
        
        <div
          class="text-center"
        >
          <button
            type="submit"
            class="primary w-64 mb-10"
          >
            <div class="inline-block">
              ログイン
            </div>
            <svg
            class=" w-6 h-6 float-right"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
          <div>
            <a class="cursor-pointer ">パスワードをお忘れの方はこちら</a>
          </div>
        </div>
      </form>
    </div>
  </top-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  components: {
  },
  setup() {
    const router = useRouter();
    
    const onSubmit = () => {
      router.push({ name: 'Top' })  
    };
    return {
      onSubmit
    };
  }
})
</script>