<template>
  <top-layout>
    <template v-slot:title>
      <div class="relative">
        <svg
          @click="() => { router.push({ name: 'Signup1' }) }"
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
      <form
        class="py-5 col-span-12 sm:col-span-6 sm:col-start-4 md:col-span-4 md:col-start-5 p-5"
        @submit.prevent="() => {}"
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
            @click="() => { router.push({ name: 'Signup3' }) }"
            type="submit"
            class="primary arrow w-64 mb-10"
          >
            確認メールを送信
            
          </button>
          <div>
            <a class="cursor-pointer ">確認メールが届かない場合は？</a>
          </div>
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