<template>
  <base-layout>
    <template v-slot:title>
      
        <img
          class="h-6 align-middle inline-block"
          src="@/assets/img/pesod_logo_s.png"
          alt="">
      
    </template>
    <menu-footer></menu-footer>
    <div class="w-full bg-white flex-grow px-4">
      <div class="mt-8 mb-14">
        <div class="mb-5">
          <img
            class="mx-auto w-80"
            src="@/assets/img/mainmenu_desc01.png" alt="">
        </div>
        <button
          @click="() => { router.push({ name: 'DiagnosticTop' }) }"
          class="image w-80"
        >
           <img
              src="@/assets/img/mainmenu_btn01.png" alt=""> 
              
            
        </button>
      </div>
      <div class="mb-10">
        <div class="mb-5">
          <img
            class="mx-auto w-80"
            src="@/assets/img/mainmenu_desc02.png"
            alt=""
          >
        </div>
        <button
          class="image w-80"
        >
          <img
              src="@/assets/img/mainmenu_btn02.png" alt=""> 
              
        </button>
      </div>
      <div>
        <div class="mt-5 mb-5">
          <img
            class="mx-auto w-80"
            src="@/assets/img/mainmenu_desc03.png"
            alt=""
          >
        </div>
        <button
          class="image w-80"
        >
          <img
              src="@/assets/img/mainmenu_btn03.png" alt=""> 
              
        </button>
      </div>
    </div>
  </base-layout>
</template>
<style lang="scss" scoped>
  
</style>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MenuFooter from '@/components/MenuFooter.vue';

export default defineComponent({
  components: {
    MenuFooter
  },
  setup() {
    const router = useRouter();
    return {
      router  
    };
  }
})
</script>