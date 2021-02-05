<template>
  <div class="h-10 sm:h-16 fixed top-0 left-0 z-50 shadow w-full bg-white text-black sm:bg-black sm:text-white">
    
    <div class="relative h-full flex items-center px-10">
      <div class="font-medium text-3xl">
        Persona
        <!-- <pix-cardio-logo /> -->
      </div>
     
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

import useAuth from '@/types/Auth';

export default defineComponent({
  components: {
  },
  setup() {
    const {
      isLoggedIn
    } = useAuth();

    const showDrawer = ref(false);
    return {
      showDrawer,
      isLoggedIn,
    }
  }
})
</script>
