<template>
  <div class="w-full sm:py-5">
     <!-- <div
        v-for="(l, i) in logs"
        :key="i"
      >
        <div class="text-left">
          2021/1/1
        </div>
        <div class="grid grid-cols-2 gap-1">
          <div
            class=""
          >
            <img class="h-36" :src="l.imgFront" alt="">
          </div>
          <div>
            <img class="h-36" :src="l.imgTop" alt="">
          </div>
        </div>
      </div> -->
  </div>
</template>
<style lang="scss" scoped>
</style>
<script lang="ts">
import { defineComponent, onMounted, SetupContext } from "vue";

import { IAnswer, IAnswerOption, IPrescript } from "@/types/Interfaces";
import useHairRecord from '@/types/HairRecord';

export default defineComponent({
  components: {
  },
  props: {
    prescript: {
      type: Object as () => IPrescript
    }
  },
  setup(_, context: SetupContext) {
    
    return {
    };
  }
})
</script>
