<template>
  <base-layout>
    <template v-slot:title>
      <div class="">
        <svg
          @click="() => { router.push({ name: 'DiagnosticTop' }) }"
          xmlns="http://www.w3.org/2000/svg"
          class="absolute left-1 h-6 w-6 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
        <div>
          問診
        </div>
      </div>
    </template>
    
    <div class="flex-grow flex flex-col">
      <router-view
        :myPrescript="myPrescript"
        :questions="questions"
        :currentQuestion="currentQuestion"
        :questionIndex="questionIndex"
        :existingAnswer="existingAnswer"
        :hasNext="hasNext"
        :hasPrevious="hasPrevious"
        v-if="dataReady"
        @next="onNext"
        @previous="onPrevious"
      ></router-view>
    </div>
  </base-layout>
</template>
<script lang="ts">
import { computed, defineComponent, isProxy, onMounted, onUpdated, ref } from 'vue';
import useQuestionaire from '@/types/Questionaire';
import { IAnswer, IQuestion } from '@/types/Interfaces';
import usePrescript from '@/types/Prescript'
import { useRouter, useRoute } from 'vue-router';
import useAnswer from '@/types/Answer';

export default defineComponent({
  components: {
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const {
      myPrescript,
      getPrescript,
      fixInterview
    } = usePrescript();
    
    const {
      answers,
      fetchAnswers,
      createAnswer
    } = useAnswer()

    const {
      questions,
      fetchQuestions,
    } = useQuestionaire();
  
    const currentQuestion = computed(() => {
      const qId = route.params.id?.toString();
      if (qId == null) return null;
      return questions.value.find((q: IQuestion) => q.id == qId);
    });
    const questionIndex = computed(() => {
      const qId = route.params.id?.toString();
      return questions.value.findIndex((q: IQuestion) => q.id == qId);
    })
    const existingAnswer = computed(() => {
      return answers.value.find((a: IAnswer) => a.question.id == currentQuestion.value?.id) || null;
    });
    
    const hasPrevious = computed(() => {
       return questionIndex.value > 0;  
    });

    const hasNext = computed(() => {
      return questionIndex.value < questions.value.length -1
    });
    

    
    const dataReady = ref(false)
    onMounted(async () => {
      myPrescript.value = await getPrescript();
      questions.value = await fetchQuestions();
      answers.value = await fetchAnswers();
      console.log(answers.value)
      dataReady.value = true;
    });
    
    onUpdated(() => {
      if (myPrescript.value?.status != 1) {
        router.push({ name: 'DiagnosticTop' })
      }
    })

    const onNext = async (event: IAnswer) => {
      const answerIndex = answers.value.findIndex((a: IAnswer) => a.question.id == event.question.id);
      const questionIndex = questions.value.findIndex((q: IQuestion) => q.id == event.question.id)
      
      // update
      const data = await createAnswer(event);
      
      if (answerIndex >= 0) {
        answers.value.splice(answerIndex, 1, data);
      }
      if (questionIndex < questions.value.length - 1) {
        router.push({ params: { id: questions.value[questionIndex + 1].id } })
      } else {
        try {
          await fixInterview();
          router.push({ name: 'DiagnosticQuestionaireDone' });
        } catch (err) {
          console.error(err);
        }
      }
    }
    const onPrevious = (event: IAnswer) => {
      const answerIndex = answers.value.findIndex((a: IAnswer) => a.question.id == event.question.id);
      // const questionIndex = questions.value.findIndex((q: IQuestion) => q.id == event.question.id)
      if (answerIndex >= 0) {
        answers.value.splice(answerIndex, 1, event);
      }
      if (questionIndex.value > 0) {
        router.push({ params: { id: questions.value[questionIndex.value - 1].id } })
      }
    }
   
    return {
      router,
      myPrescript,
      dataReady,
      questions,
      onNext,
      onPrevious,
      currentQuestion,
      questionIndex,
      existingAnswer,
      hasNext,
      hasPrevious,
    };
  }
})
</script>