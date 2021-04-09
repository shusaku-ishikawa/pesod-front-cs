<template>
  <div
    ref="contentArea"
    class="min-h-screen flex flex-col bg-white"
  >
    <div class="py-1 text-lg font-extrabold" style="height: 40px">
      <slot name="title">
      </slot>
    </div>
    <div class="w-full flex-grow mx-auto flex flex-col">
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