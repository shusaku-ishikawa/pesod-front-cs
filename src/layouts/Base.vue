<template>
  <div class="w-full sm:max-w-sm md:max-w-md mx-auto shadow bg-white">
    <navbar />
    
    <div
      ref="contentArea"
      class="content-area min-h-screen w-full py-16 flex flex-col overflow-y-auto">
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
<style lang="scss">
</style>
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
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    // const fitWindow = () => {
    //   if (contentArea.value == null) return;
    //   contentArea.value.style.height = `${window.innerHeight}px`;
    // };
    onMounted(() => {
      // setVh();
      window.addEventListener('load', setVh);
      window.addEventListener('resize', setVh);

    });
    onBeforeUnmount(() => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('load', setVh);
    })
    
    return {
      contentArea
    }
  }
})
</script>