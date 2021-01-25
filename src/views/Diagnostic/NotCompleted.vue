<template>
  <div class="flex-grow flex flex-col">
    <div class="grid grid-cols-12 flex-grow">
      <div class="text-center col-span-8 col-start-3 sm:col-span-8 sm:col-start-3 flex-grow flex flex-col py-10">
        <div class="text-left mb-10">
          <div>問診表：未入力です</div>
          <button
            class="primary w-full"
          >
            問診表
          </button>
        </div>
        <div class="text-left">
          <div>医師：未選択です</div>
          <button
            class="primary w-full"
          >
            医師選択
          </button>
        </div>
      </div>
    </div>
  </div>
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