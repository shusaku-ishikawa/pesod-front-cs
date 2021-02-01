<template>
  <div
    class="pt-10"
  >
    <div>
      
    </div>
    <button
      class="w-72 primary mx-auto"
      @click="onClickStart()"
    >
      {{ nextOpenQuestionId == null ? '回答を修正する' : '問診を開始する' }}
    </button>
  </div>
</template>
<style lang="scss" scoped>

</style>
<script lang="ts">
import { defineComponent, onMounted, SetupContext } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useQuestionaire from '@/types/Questionaire';

export default defineComponent({
  components: {
    
  },
  props: {
  },
  setup(_, ctx: SetupContext) {
    const route = useRoute();
    const router = useRouter();

    const {
      nextOpenQuestionId
    } = useQuestionaire();

    
    const onClickStart = () => {
      router.push({ name: 'DiagnosticQuestionaireDetail', params: { id: 1 } });
    };
    
    onMounted(() => {
      if (nextOpenQuestionId.value != null) {
        router.replace({ name: 'DiagnosticQuestionaireDetail', params: { id: nextOpenQuestionId.value } })
      }  
    });
    
    return {
      onClickStart
    };
  }
})
</script>