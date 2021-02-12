<template>
  <div
    ref="contentArea"
    class="min-h-screen flex flex-col bg-gray-100"
  >
    <div class="my-10 text-2xl font-extrabold px-2">
      <slot name="title">
      </slot>
    </div>
    <div class="w-full flex-grow mx-auto pt-4 px-2 flex flex-col">
      <slot name="default">
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  components: {
  },
  setup() {
    const contentArea = ref<HTMLElement | null>(null);
    onMounted(() => {
      if (contentArea.value == null) return;
      contentArea.value.style.minHeight = `${window.innerHeight}px`;
    });
    return {
      contentArea
    }
  }
})
</script>