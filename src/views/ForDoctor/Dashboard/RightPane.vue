<template>
  <div
    class="min-h-full w-full sm:px-5 sm:py-5"
  >
    <div
      class="sm:hidden py-1 bg-gray-200 mb-5">
      <div class="absolute left-0 flex text-sm items-center">
        <svg
          @click="onPage('main')"
          class="w-6 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        <div>診察室</div>
      </div>
      <div>
        問診表
      </div>
    </div>
    <div class="px-3">
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
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, SetupContext } from "vue";
import ClientProfile from './ClientProfile.vue';
import Question from '@/views/ForClient/Diagnostic/Questionaires/Question.vue';

import useQuestionaire from '@/types/Questionaire';
import useLogs from '@/types/Logs';

export default defineComponent({
  components: {
    ClientProfile,
    Question
  },
  setup(_, context: SetupContext) {
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

    const onPage = (page: string) => {
      // alert('page')
      context.emit('page', page);
    };
    return {
      onPage,
      questions,
      logs
    };
  }
})
</script>
