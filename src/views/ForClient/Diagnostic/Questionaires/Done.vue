<template>
  <div
    class="px-12 pt-5 h-full"
  >
    <div class="text-left flex flex-col h-full">
      <div class="mb-10 text-center">
        
        <img class="mx-auto w-36 mb-2" src="@/assets/img/monshin_complete.png" alt="">
        <div class="font-bold text-2xl">
          問診は完了しました。<br>
          お疲れ様でした。
        </div>
      </div>
    
      <div class="text-center">
       
        <div
          class=""
        >
          <router-link
            :to="{ name: 'DiagnosticTop' }"
            v-slot="{ href, navigate }"
          >
            <button
              :href="href"
              @click="navigate"
              class="bg-black text-white w-full"
            >
              お手続き一覧に戻る
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