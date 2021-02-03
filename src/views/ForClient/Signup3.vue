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
          新規登録
        </div>
      </div>
    </template>
    <div class="grid grid-cols-12">
      <div class="col-span-12">
        <div class="text-center w-full">
          <svg 
          class="w-64 h-64 inline-block"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div class="font-bold text-lg">
          <div
            class="text-pink-400"
          >
            sample@persona.com
          </div>
          <div>
            にメールを送信しました
          </div>
        </div>
      </div>
      
    </div>
  </top-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
  },
  setup() {
    return null;
  }
})
</script>