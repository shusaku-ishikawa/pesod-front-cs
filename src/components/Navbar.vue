<template>
  <div class="h-16 fixed top-0 left-0 z-50 w-full bg-white shadow-lg text-black py-3">
    <div class="mx-auto px-2">
      <div class="relative flex justify-center py-0">
        <div
          @click="showDrawer = !showDrawer"
          class="sm:hidden cursor-pointer absolute left-0"
        >
          <svg
            v-if="!showDrawer"
            class="w-8 h-8"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          <svg
            v-else
            class="w-8 h-8"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        
        <div class="font-medium text-3xl">
          Persona
          <!-- <pix-cardio-logo /> -->
        </div>
        <!-- <div
          class="sm:flex sm:items-center"
          :class="{ 'hidden': false }"
        >
          <router-link :to="{ name: 'Login' }" v-if="!isLoggedIn" class="text-gray-800 dark:text-white text-sm font-semibold hover:text-blue mr-4">Sign in</router-link>
        </div> -->
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
