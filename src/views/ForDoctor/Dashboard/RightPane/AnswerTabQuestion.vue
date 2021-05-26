<template>
  <div>
    <div class=" text-left">
      <div class="relative inline-block ">
        <div class="font-bold text-base" style="padding-bottom: 10px">Q{{ index }}</div>
      </div>
    </div>
    <div v-html="question" class="mb-5 text-left">
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
    const htmlify = (str: string) => {
      if (str == null) return '';
      return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
    }
    return {
      htmlify
    };
  }
});
</script>