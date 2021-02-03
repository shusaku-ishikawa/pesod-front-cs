<template>
  <div
    class="min-h-full w-full px- sm:px-5 py-5"
  >
    <client-profile
      class="mb-5"
    ></client-profile>
    <div
      v-for="(q, i) in questions"
      :key="i"
      class="mb-5"
    >
      <question
        :key="i"
        :index="i + 1"
        :question="q.question"  
      />
      <div v-if="q.answer" class="w-full bg-gray-400 py-1 text-sm">
        {{ q.answer }}
      </div>
      <div
        v-else
        class="w-full bg-red-400 py-1 text-sm"
      >
        未回答
      </div>
      
    </div>
    <div
      v-for="(l, i) in logs"
      :key="i"
    >
      <div class="text-left">
        2021/1/1
      </div>
      <div class="grid grid-cols-2 gap-1">
        <div
          class=""
        >
          <img class="h-36" :src="l.imgFront" alt="">
        </div>
        <div>
          <img class="h-36" :src="l.imgTop" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import ClientProfile from './ClientProfile.vue';
import Question from '@/views/ForClient/Diagnostic/Questionaires/Question.vue';

import useQuestionaire from '@/types/Questionaire';
import useLogs from '@/types/Logs';

export default defineComponent({
  components: {
    ClientProfile,
    Question
  },
  setup() {
    const {
      questions,
      fetchQuestions
    } = useQuestionaire();

    const {
      logs,
      fetchLogs
    } = useLogs();

    onMounted(() => {
      fetchQuestions();
      fetchLogs();
    });

    return {
      questions,
      logs
    };
  }
})
</script>
