<template>
  <div
    class="pt-10"
  >
    <div>
      
    </div>
    <button
      class="w-72 primary"
      @click="onClickStart()"
    >
      問診を開始する
    </button>
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

    const onClickStart = () => {
      router.push({ name: 'QuestionaireDetail', params: { id: 1 } });
    };
    
    return {
      onClickStart
    };
  }
})
</script>