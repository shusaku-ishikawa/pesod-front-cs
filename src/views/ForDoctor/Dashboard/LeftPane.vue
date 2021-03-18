<template>
  <div
    class="min-h-full w-full px-2 py-3"
  >
    <div class="flex mb-3 w-full ">
      <input
        class="border block flex-grow pl-2 "
        type="text">
      <button
        class="border bg-white"
      >
        <svg
          class="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
        </svg>
      </button>
      
    </div>
    <div>
      <div
        v-for="(p, i) in prescripts.filter(p => p.status > 2)"
        :key="i"
        class="py-2 flex items-center px-3 py-2 border-b  hover:bg-blue-200 cursor-pointer text-sm"
        @click="onSelectPrescript(p)"
        :class="{ 'bg-gray-200': modelValue && modelValue.id === p.id }"
      >
        <div
          class="flex flex-col flex-grow text-left"
        >
          <div class="flex items-center justify-between">
            <div class="font-medium text-base ">
              {{ p.customer.first_name }} {{ p.customer.last_name }}
            </div>
            <div
              class=" ml-1 px-2 rounded shadow-lg text-xs"
              :class="{ 'bg-yellow-100 text-black': p.status === 3, 'text-gray-600 border-gray-200': p.status !== 3 }"
            >
              {{ p.status === 3 ? '対応中' : '対応済' }}
            </div>
          </div>
          <div>
            ID: {{ p.customer.id }}
          </div>
        </div>
        <!-- <div class="ml-2">
          <svg
            class="w-6"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </div> -->
      </div>
    </div>
   
  </div>
</template>
<script lang="ts">
import { defineComponent, SetupContext, ref, onMounted } from "vue";
import usePrescript from '@/types/Prescript';
import { IPrescript } from '@/types/Interfaces';

export default defineComponent({
  components: {
  },
  props: {
    modelValue: {
      type: Object as () => IPrescript
    }
  },
  emits: [
    'page',
    'update:modelValue'
  ],
  setup(_, context: SetupContext) {
    
    
    const {
      prescripts,
      fetchPrescripts  
    } = usePrescript();

    
    
    onMounted(async () => {
      prescripts.value = await fetchPrescripts();
      console.log(prescripts.value)
    })

    const onSelectPrescript = (p: IPrescript) => {
      context.emit('update:modelValue', p);
      context.emit('page', 'main')
    };

    return {
      onSelectPrescript,
      prescripts
    };
  }
})
</script>
