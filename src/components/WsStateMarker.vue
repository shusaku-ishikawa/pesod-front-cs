<template>
  <div
    class="w-3 h-3 shadow-lg rounded-full ml-1 text-white"
    :class="{ 'bg-green-400': wsState === 1, 'bg-gray-600': wsState === 3 }"
  >
  
    
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, ref, SetupContext } from 'vue';

export default defineComponent({
  props: {
    wsState: {
      type: Number
    }
  },
  components: {
        
  },
})
</script>
