<template>
  <base-layout>
    <template v-slot:title>
      
        <img
          style="height: 100%; width:auto "
          class="mx-auto"
          src="@/assets/img/pesod_logo_s.png"
          alt="">
      
    </template>
    <menu-footer></menu-footer>
    <div class="w-full bg-white flex-grow px-4">
      <div class="" style="margin-bottom: 70px">
        <div class="" style="margin-bottom: 20px">
          <img
            style="width: 80%;"
            class="mx-auto"
            src="@/assets/img/mainmenu_desc01.png" alt="">
        </div>
        <button
          @click="() => { router.push({ name: 'DiagnosticTop' }) }"
          class="image"
        >
           <img
              src="@/assets/img/mainmenu_btn01.png" alt=""> 
              
            
        </button>
      </div>
      <div style="margin-bottom: 30px">
        <div style="margin-bottom: 20px">
          <img
            style="width: 80%;"
            class="mx-auto"
            src="@/assets/img/mainmenu_desc02.png"
            alt=""
          >
        </div>
        <button
          class="image"
        >
          <img
              src="@/assets/img/mainmenu_btn02.png" alt=""> 
              
        </button>
      </div>
      <div style="margin-bottom: 50px">
        <div style="margin-bottom: 20px">
          <img
            style="width: 80%;"
            class="mx-auto"
            src="@/assets/img/mainmenu_desc03.png"
            alt=""
          >
        </div>
        <button
          class="image"
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