<template>
  <div
    ref="contentArea"
    class="lp-back h-screen table-cell align-middle w-screen"
  >
    
    <div class="">
      <div class="sm:flex justify-center mb-48">
        <div class="text-6xl">
          Persona
        </div>
        <div class="inline-block bg-black text-white py-2 px-3 text-4xl">
          For Doctor
        </div>
      </div>
      <router-link
        :to="{ name: 'DoctorLogin' }"
        v-slot="{ navigate, href }"
      >
        <button
          :href="href"
          @click="navigate"
          class="primary w-64"
        >
          ログイン
        </button>
      </router-link>
    </div>

  </div>
</template>
<style lang="scss">
  .lp-back {
    background-image: url(/img/back.png);
    background-size: contain;
    
  }
</style>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
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