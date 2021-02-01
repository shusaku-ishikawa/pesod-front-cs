<template>
  <div class="w-full sm:max-w-sm md:max-w-md mx-auto shadow bg-white">
    <navbar />
    
    <div class=" min-h-screen w-full py-16 flex flex-col">
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
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue';
import MenuFooter from '@/components/MenuFooter.vue';

export default defineComponent({
  components: {
    Navbar,
    MenuFooter
  }
})
</script>