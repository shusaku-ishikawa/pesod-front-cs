<template>
  <base-layout>
    <template v-slot:title>
      <div
        class="bg-gray-400 py-2"
      >
        問診表
      </div>
    </template>
    <div class="flex-grow flex flex-col">  
      <router-view
        v-if="questions.length > 0"
        :key="$route.fullPath"
      ></router-view>
    </div>
  </base-layout>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import useQuestionaire from '@/types/Questionaire';
import { IQuestion } from '@/types/Interfaces';
export default defineComponent({
  components: {
  },
  setup() {

    const {
      questions,
      fetchQuestions,
    } = useQuestionaire();
  
    onMounted(() => {
      fetchQuestions();
    });
    
    const onAnswer = (event: any, index: number) => {
      if (event.target == null) return;
      questions.value[index].answer = event.target.value;
    };

    return {
      questions,
      onAnswer
    };
  }
})
</script>