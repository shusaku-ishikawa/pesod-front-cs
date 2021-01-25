<template>
  <div
    class="px-6 pt-5"
  >
    <div class="text-left flex flex-col h-full">
      <div class="mb-10">
        <div class="relative inline-block ">
          <div class="font-bold text-3xl">Q{{ questionIndex + 1 }}</div>
          <div class="absolute top-3 right-0 h-10 angled-line border-b-4 border-r-4 border-black ml-3">
          </div>
        </div>
      </div>
      <div class="mb-10">
        {{ question.question }}
      </div>
      <div class="flex flex-col">
        <div
          v-if="question.options.length === 0"
          class="pb-10"
        >
          <p-input
            v-model="question.answer"
            type="text"
            label="回答"
          ></p-input>
        </div>
        <div
          v-for="(o, i) in question.options"
          :key="i"
          class="text-center mb-5"
        >
          <button
            @click="onSelectAnswer(i)"
            class="w-full "
            :class="{ 'primary ring ': isAnswerSelected(o), 'secondary': !isAnswerSelected(o) }"
          >
            {{ o }}
          </button>
        </div>
        
        
        <div class="grid grid-cols-2 gap-1 mb-5">
          <div class="col-span-1">
            <button
              @click="onClickPrevious()"
              class="secondary w-full"
            >
              <div class="inline-block">前に戻る</div>
              <svg 
                class="w-6 h-6 float-left"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <div class="col-span-1">
            <button
              @click="onClickNext()"
              :disabled="!question.answer"
              class="primary w-full relative"
            >
              <div class="inline-block">次に進む</div>
              <svg
                class="w-6 h-6 float-right"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
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

    const qId = Array.isArray(route.params.id) ? parseInt(route.params.id[0]) : parseInt(route.params.id);
    const {
      questions
    } = useQuestionaire();
    const question = questions.value.find(q => q.id === qId);
    const questionIndex = questions.value.findIndex(q => q.id === qId);

    const isAnswerSelected = (ans: string) => {
      return question?.answer?.split(',').find(a => a == ans) != null
    };
    const onSelectAnswer = (oIndex: number) => {
      if (question == null) return
      if (question.multiple && question.answer) {
        const currentAnswers: string[] = question.answer.split(',');
        const ans = question.options[oIndex];
        const ansIndex = currentAnswers.findIndex(a => a == ans);
        if (ansIndex >= 0) {
          currentAnswers.splice(ansIndex, 1);
        } else {
          currentAnswers.push(ans);    
        }
        question.answer = currentAnswers.join(',');
      } else {
        question.answer = question.options[oIndex];
      }
    };
    
    const onClickPrevious = () => {
      if (question == null) return;
      const currentIndex = questions.value.findIndex(q => q.id === question.id);
      if (currentIndex > 0) {
        router.push({ params: { id: questions.value[currentIndex - 1].id } })
      }
    };
    const onClickNext = () => {
      if (question == null) return;
      const currentIndex = questions.value.findIndex(q => q.id === question.id);
      if (currentIndex < questions.value.length - 1) {
        router.push({ params: { id: questions.value[currentIndex + 1].id } })
      } else {
        // done
        router.push({ name: 'QuestionaireDone' });
      }
    };
    
    return {
      question,
      questionIndex,
      isAnswerSelected,
      onSelectAnswer,
      onClickPrevious,
      onClickNext,
    };
  }
})
</script>