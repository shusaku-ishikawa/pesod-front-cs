<template>
  <base-layout>
    <template v-slot:title>
      <div class="">
        <svg
          @click="() => { router.push({ name: 'DiagnosticTop' }) }"
          xmlns="http://www.w3.org/2000/svg"
          class="absolute h-6 w-6 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
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
        v-if="myPrescript != null && questions.length > 0"
        :key="$route.fullPath"
      ></router-view>
    </div>
  </base-layout>
</template>
<script lang="ts">
import { defineComponent, isProxy, onMounted, onUpdated, ref } from 'vue';
import useQuestionaire from '@/types/Questionaire';
import { IQuestion } from '@/types/Interfaces';
import usePrescript from '@/types/Prescript'
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
  },
  setup() {
    const router = useRouter();
    const {
      myPrescript,
      getPrescript,
    } = usePrescript();

    const {
      questions,
      fetchQuestions,
    } = useQuestionaire();
  
    onMounted(async () => {
      myPrescript.value = await getPrescript();
      const data = await fetchQuestions();
      questions.value = data;
    });
    
    onUpdated(() => {
      if (myPrescript.value?.status != 1) {
        router.push({ name: 'DiagnosticTop' })
      }
    })
   
    return {
      myPrescript,
      questions,
    };
  }
})
</script>