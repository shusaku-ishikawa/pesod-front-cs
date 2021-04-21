<template>
  <div
    class="px-10 pt-5 h-full"
  >
    <div class="text-left flex flex-col h-full">
      <div class=" text-center mb-7 ">
        
        <img class="mx-auto w-36" style="margin-top:100px; margin-bottom: 20px" src="@/assets/img/monshin_complete.png" alt="">
        <div class="font-bold" style="font-size: 1.3rem; line-height: 2.5rem">
          問診は以上で終了です。<br>
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
              class="bg-black text-white w-full py-3"
              style="font-weight: 600"
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