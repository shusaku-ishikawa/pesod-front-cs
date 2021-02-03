<template>
  <div
    class="border rounded-lg bg-gray-200 shadow-lg px-5 py-2"
  >
    <div
      class="flex justify-between text-sm mb-2"
    >
      <div>
        診察券
      </div>
      <div>
        〇〇クリニック
      </div>
    </div>
    <div
      class="bg-white px-3 py-1"
    >
      <div class="text-xs text-left">お名前</div>
      <div class="flex items-center justify-between border-b border-black mb-2">
        <div class="text-lg mr-5">ペルソナ太郎</div>
        <svg
          class="w-6"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
      <div class="text-sm text-left">
        ID: 1111
      </div>
    </div>
    
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  components: {
  },
  setup() {
    return {
      
    };
  }
})
</script>
