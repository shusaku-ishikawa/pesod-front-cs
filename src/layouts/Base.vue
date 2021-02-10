<template>
  <div class="w-full sm:max-w-sm md:max-w-md mx-auto shadow bg-white">
    <navbar />
    
    <div
      ref="contentArea"
      class=" min-h-screen w-full py-16 flex flex-col overflow-y-auto">
      <slot name="title">
      </slot>
      <slot name="default">
      </slot>
    </div>
    <menu-footer
      class="fixed bottom-0 left-0"
    ></menu-footer>
  </div>
</template>
<script lang="ts">
import { defineComponent,ref, onMounted, withDirectives } from 'vue';
import Navbar from '@/components/Navbar.vue';
import MenuFooter from '@/components/MenuFooter.vue';

export default defineComponent({
  components: {
    Navbar,
    MenuFooter
  },
  setup() {

    const contentArea = ref<HTMLElement | null>(null);
    onMounted(() => {
      if (contentArea.value == null) return;
      contentArea.value.style.height = `${window.innerHeight}px`;
    });
    return {
      contentArea
    }
  }
})
</script>