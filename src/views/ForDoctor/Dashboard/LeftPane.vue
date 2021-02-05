<template>
  <div
    class="min-h-full w-full px-3 py-5"
  >
    <div class="flex mb-3">
      <input
        class="border flex-grow"
        type="text">
      <button
        class="border bg-white"
      >
        <svg
          class="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
        </svg>
      </button>
      
    </div>
    <div>
      <div
        v-for="(c, i) in clients"
        :key="i"
        class="py-2 flex items-center px-3 py-5 border-b  hover:bg-blue-200 cursor-pointer"
        @click="onPage('main')"
      >
        <div
          class="flex flex-col flex-grow text-left"
        >
          <div class="flex items-center justify-between">
            <div class="font-medium text-lg ">
              {{ c.name }}
            </div>
            <div
              class="border ml-1 px-2 rounded"
              :class="{ 'bg-yellow-100 text-black': c.status === 1, 'text-gray-100 border-gray-200': status === 2 }"
            >
              {{ c.status === 1 ? '対応中' : '対応済' }}
            </div>
          </div>
          <div>
            ID: {{ c.id }}
          </div>
        </div>
        <div class="ml-2">
          <svg
            class="w-6"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
   
  </div>
</template>
<script lang="ts">
import { defineComponent, SetupContext } from "vue";

export default defineComponent({
  components: {
  },
  setup(_, context: SetupContext) {
    const clients = [
      {
        name: 'ペルソナ太郎',
        id: 1,
        status: 1
      },
      {
        name: 'ペルソナ太郎2',
        id: 1,
        status: 2
      },
      {
        name: 'ペルソナ太郎3',
        id: 1,
        status: 2
      },
      {
        name: 'ペルソナ太郎4',
        id: 1,
        status: 1
      },
      {
        name: 'ペルソナ太郎5',
        id: 1,
        status: 1
      },
      
    ]
    const onPage = (page: string) => {
      context.emit('page', page)
    };

    return {
      onPage,
      clients
    };
  }
})
</script>
