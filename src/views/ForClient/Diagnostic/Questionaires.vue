<template>
  <base-layout>
    <template v-slot:title>
      <page-title>
        問診表
      </page-title>
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