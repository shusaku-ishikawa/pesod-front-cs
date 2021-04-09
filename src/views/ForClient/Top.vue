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
    <div class="w-full bg-white flex-grow pb-5">
      <div class="mb-10">
        <div class="mb-2">
          <img
            src="@/assets/img/mainmenu_desc01.png" alt="">
        </div>
        <button
          @click="() => { router.push({ name: 'DiagnosticTop' }) }"
          class="primary"
        >
          Pesod 育毛対策 お手続きへ
        </button>
      </div>
      <div>
        <div>
          <img
            src="@/assets/img/mainmenu_desc02.png"
            alt=""
          >
        </div>
        <button
          class="primary"
        >
          育毛スペシャリストに相談する
        </button>
      </div>
      <div>
        <div>
          <img
            src="@/assets/img/mainmenu_desc03.png"
            alt=""
          >
        </div>
        <button
          class="primary"
        >
          逃避状態を記録する
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