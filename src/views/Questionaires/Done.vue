<template>
  <div
    class="px-12 pt-5 h-full"
  >
    <div class="text-left flex flex-col h-full">
      <div class="mb-10 text-center">
        <svg
          class="w-24 h-24 inline-block"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div class="font-bold">
          全て回答済み
        </div>
      </div>
    
      <div class="text-center">
        <div class="mb-5">
          担当医師：未選択
        </div>
        <div
          class=""
        >
          <router-link
            :to="{ name: 'DoctorList' }"
            v-slot="{ href, navigate }"
          >
            <button
              :href="href"
              @click="navigate"
              class="primary w-full"
            >
              医師選択一覧へ
            </button>
          </router-link>
        </div>
      </div>
    </div>
   
  </div>
</template>
<style lang="scss" scoped>

</style>
<script lang="ts">
import { defineComponent, SetupContext } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  components: {
    
  },
  props: {
  },
  setup(_, ctx: SetupContext) {
    const route = useRoute();
    const router = useRouter();

    
    
    return {
    };
  }
})
</script>