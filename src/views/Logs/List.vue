<template>
  <div class="text-center flex flex-col">
    
    <div class="flex-grow relative overflow-y-auto">
      <log-list-card
        :class="{ 'border-b-2 border-gray-600': i < logs.length - 1 }"
        v-for="(l, i) in logs"
        :key="i"
        :log="l"
      ></log-list-card>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import useLogs from '@/types/Logs';
import LogListCard from '@/views/Logs/ListCard.vue';

export default defineComponent({
  components: {
    LogListCard,
  },
  setup() {
    const {
      logs,
      fetchLogs
    } = useLogs();

    return {
      logs
    };
  }
})
</script>