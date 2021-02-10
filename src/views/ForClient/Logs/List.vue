<template>
  <div class="flex flex-col flex-grow relative">
    <page-title>
      毛髪記録
    </page-title>
    <div class="text-center flex flex-col flex-grow">
      
      <div class="flex-grow relative overflow-y-auto px-2 space-y-4">
        <log-list-card
          v-for="(l, i) in logs"
          :key="i"
          :log="l"
        ></log-list-card>
      </div>
    </div>
    <button
      @click="() => { router.push({ name: 'LogsDetail', params: { id: 'new' } }) }"
      class="absolute bg-gray-500 text-white bottom-5 right-5 rounded-full w-20 h-20 shadow-lg text-center">
      <svg
        class="w-8 h-8 mx-auto"
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import useLogs from '@/types/Logs';
import LogListCard from './ListCard.vue';

export default defineComponent({
  components: {
    LogListCard,
  },
  setup() {

    const router = useRouter();
    
    const {
      logs,
      fetchLogs
    } = useLogs();

    return {
      router,
      logs
    };
  }
})
</script>