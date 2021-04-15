<template>
  <div
    ref="contentArea"
    class="min-h-screen flex flex-col bg-white"
  >
    <div class="  font-extrabold " style="font-size: 1rem; height:40px; padding: 6px 0">
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