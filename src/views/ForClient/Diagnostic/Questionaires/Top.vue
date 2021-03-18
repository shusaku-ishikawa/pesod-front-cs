<template>
  <div
    class="pt-10"
  >
    <button
      class="w-72 primary mx-auto"
      @click="onClickStart()"
    >
      問診を開始する
    </button>
  </div>
</template>
<style lang="scss" scoped>

</style>
<script lang="ts">
import { defineComponent, onMounted, SetupContext } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useQuestionaire from '@/types/Questionaire';
import QuestionairesVue from '../Questionaires.vue';
import { IQuestion } from '@/types/Interfaces';

export default defineComponent({
  components: {
    
  },
  props: {
    questions: {
      type: Object as () => IQuestion[]
    }
  },
  setup(props: any, ctx: SetupContext) {
    const route = useRoute();
    const router = useRouter();

     const {
      fetchQuestions,
    } = useQuestionaire();
  
    
    
    const onClickStart = () => {
      router.push({ name: 'DiagnosticQuestionaireDetail', params: { id: 1 } });
    };
    
    onMounted(async () => {
      
      if (props.questions.length) {
        router.replace({ name: 'DiagnosticQuestionaireDetail', params: { id: props.questions[0].id } })      
      }
    });
    
    return {
      onClickStart
    };
  }
})
</script>