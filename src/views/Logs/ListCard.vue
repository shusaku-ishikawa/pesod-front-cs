<template>
  <div
    class="flex pt-2 pb-4 px-2 hover:bg-gray-50 flex flex-col"
  >
    <div class="text-left font-medium text-2xl">
      {{ log.date }}
    </div>
    <div class="flex items-center">
      <div class="flex-auto h-full bg-gray-200 rounded border-2 border-black">
        <img :src="log.imgFront" alt="">  
      </div>
      <div class="flex-auto ml-1 h-full bg-gray-200 rounded border-2 border-black">
        <img :src="log.imgTop" alt=""> 
      </div>
      <!-- <div class="self-stretch ml-1">
        <table class="border-separate h-full">
          <tbody>
            <tr>
              <td class="border p-3 bg-gray-100">
                fute
              </td>
              <td class="border p-3">
                futg</td>
            </tr>
            <tr>
              <td class="border p-3">ga </td>
              <td class="border p-3"> gg</td>
            </tr>
          </tbody>
        </table>
      </div> -->
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