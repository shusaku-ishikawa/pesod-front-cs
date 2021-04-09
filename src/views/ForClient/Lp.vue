<template>
  <div
    ref="contentArea"
    class="lp-back h-screen table-cell align-middle w-screen"
  >
    
    <div class="">
      <div class="mb-10">
        <img
          class="mx-auto"
          style="width: 200px"
          src="@/assets/img/pesod_logo.png" alt="">
      </div>
      <router-link
        :to="{ name: 'Login' }"
        v-slot="{ navigate, href }"
      >
        <button
          :href="href"
          @click="navigate"
          class="block mx-auto primary w-64 mb-10"
        >
          ログイン
        </button>
      </router-link>
      <router-link
        :to="{ name: 'Signup1' }"
        v-slot="{ navigate, href }"
      >
        <button
          :href="href"
          @click="navigate"
          class="bg-black text-white w-64"
        >
          新規登録
        </button>
      </router-link>
    </div>

  </div>
</template>
<style lang="scss">
  .lp-back {
    background-image: url(/img/top_bk.png);
    background-size: contain;
    
  }
</style>
<script lang="ts">
import { defineComponent,onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';


export default defineComponent({
  components: {
  },
  setup() {
    const contentArea = ref<HTMLElement | null>(null);

    onMounted(() => {
      if (contentArea.value == null) return;
      contentArea.value.style.height = `${window.innerHeight}px`;
    });

    return {
      contentArea
    };
  }
})
</script>