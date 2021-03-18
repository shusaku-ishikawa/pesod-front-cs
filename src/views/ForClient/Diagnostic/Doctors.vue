<template>  
  <router-view
    v-if="myPrescript"
    :myPrescript="myPrescript"
  ></router-view>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import usePrescript from '@/types/Prescript';

export default defineComponent({
  components: {
  },
  setup() {
    const {
      myPrescript,
      getPrescript,
    } = usePrescript();
    onMounted(async () => {
      myPrescript.value = await getPrescript()
    })
    return {
      myPrescript,
    };
  }
})
</script>