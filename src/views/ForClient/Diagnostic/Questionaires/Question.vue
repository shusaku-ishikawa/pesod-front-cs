<template>
  <div>
    <div class="mb-5 text-left">
      <div class="relative inline-block ">
        <div class="font-bold text-3xl">Q{{ index }}</div>
        <div class="absolute top-5 right-0 h-7 angled-line border-b-4 border-r-4 border-black ml-3">
        </div>
      </div>
    </div>
    <div class="mb-10 text-left">
      {{ question }}
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .angled-line {
    
    -moz-transform: skew(-70deg);
    -webkit-transform: skew(-70deg);
    transform: skew(-70deg);
  }
</style>
<script lang="ts">
import { defineComponent, SetupContext } from 'vue';
import { routeLocationKey, RouterLink } from 'vue-router';
export default defineComponent({
  components: {
    
  },
  props: {
    index: {
      type: Number
    },
    question: {
      type: String
    }
  },
  setup(_, ctx: SetupContext) {
    return null;
  }
});
</script>