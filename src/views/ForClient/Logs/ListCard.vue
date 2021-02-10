<template>
  <div
    class="flex pt-2 pb-4 px-2 hover:bg-gray-50 flex flex-col shadow-2xl"
  >
    <div class="text-left font-medium text-lg">
      {{ log.date }}
    </div>
    <div class="flex items-center">
      <div class="flex-auto h-full bg-gray-200 rounded shadow-lg">
        <img :src="log.imgFront" alt="">  
      </div>
      <div class="flex-auto ml-1 h-full bg-gray-200 rounded shadow-lg">
        <img :src="log.imgTop" alt=""> 
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
 
</style>
<script lang="ts">
import { defineComponent } from 'vue';
import { ILog } from '@/types/Interfaces';

export default defineComponent({
  components: {
  },
  props: {
    log: {
      type: Object as () => ILog
    }
  },
  setup() {
    return null;
  }
})
</script>