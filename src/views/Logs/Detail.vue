<template>
  <div class="px-2 flex flex-col">
    <div class="text-left text-2xl">
      1/22(金)
    </div>
    <div class="grid grid-cols-2 gap-1 mb-3">
      <div class="col-span-1 rounded h-48 bg-gray-200 flex flex-col justify-around">
        <div>前頭部</div>
        <div>
          <svg
            class="w-10 h-10 inline-block cursor-pointer"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          タップして撮影
        </div>
      </div>
      <div class="col-span-1 rounded bg-gray-200 flex flex-col justify-around">
        <div>頭頂部</div>
        <div>
          <svg
            class="w-10 h-10 inline-block cursor-pointer"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          タップして撮影
        </div>
      </div>
      
    </div>
    <div class="flex mb-3">
      <div class="w-20 h-20 bg-gray-100">
        日光
      </div>
      <div class="w-20 h-20 bg-gray-100 ml-1">
        飲酒
      </div>
      <div class="w-20 h-20 bg-gray-100 ml-1">
        タバコ
      </div>
      <div class="w-20 h-20 bg-gray-100 ml-1">
        運動
      </div>
    </div>
    <div class="text-left">
      <label for="memo">
        メモ
      </label>
      <div>
        <textarea class=" p-1 w-full border rounded" id="memo" cols="30" rows="5"></textarea>
      </div>
    </div>
    <div class="text-right mb-3">
      <button
        class="primary"
      >
        保存
      </button>
    </div>
  </div>    
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import useLogs from '@/types/Logs';

export default defineComponent({
  components: {
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
