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
import { defineComponent,ref, onMounted, withDirectives, onBeforeUnmount } from 'vue';
import Navbar from '@/components/Navbar.vue';
import MenuFooter from '@/components/MenuFooter.vue';

export default defineComponent({
  components: {
    Navbar,
    MenuFooter
  },
  setup() {

    const contentArea = ref<HTMLElement | null>(null);
    const fitWindow = () => {
      if (contentArea.value == null) return;
      alert('resizing' + `height is ${window.innerHeight}`)
      contentArea.value.style.height = `${window.innerHeight}px`;
    };
    onMounted(() => {
      fitWindow();
      window.addEventListener('resize', fitWindow);
    
    });
    onBeforeUnmount(() => {
      window.removeEventListener('resize', fitWindow);
    })
    
    return {
      contentArea
    }
  }
})
</script>