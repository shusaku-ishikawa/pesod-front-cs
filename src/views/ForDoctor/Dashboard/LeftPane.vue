<template>
  <div
    class="min-h-full w-full px-2 py-3"
  >
    <div class="relative mb-3 w-full ">
      <input
        class="rounded-full px-4 focus:outline-none focus:ring w-full py-2 border block flex-grow "
        type="text">
      <button
        class="absolute right-2 top-1 rounded-full bg-white"
      >
        <svg
          class="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
        </svg>
      </button>
      
    </div>
    <div class="mb-5">
      <button
        @click="onlyActive = !onlyActive"
        :class="{ 'bg-green-600 text-white': !onlyActive }"
        class="block w-full shadow bg-gray-200 text-black">
        {{ onlyActive ? '全て表示' : '対応中のみ表示' }}
      </button>
    </div>
    <div>
      <div
        v-for="(p, i) in prescripts.filter(p => p.status > 2)"
        :key="i"
        class="py-2 flex items-center px-3 py-2 border-b  hover:bg-blue-200 text-sm"
        @click="onSelectPrescript(p)"
        :class="{ 'bg-primary-light': modelValue && modelValue.id === p.id, 'cursor-pointer': p.status == 3 }"
      >
        <div class="flex-shrink-0">
          
          <img
            v-if="p.customer.icon_type == 0"
            class="w-12"
            src="@/assets/img/doctor/icon_man.png" alt=""
          >
          <img
            v-if="p.customer.icon_type == 1"
            class="w-12"
            src="@/assets/img/doctor/icon_woman.png" alt=""
          >
          <img
            v-if="p.customer.icon_type == 2"
            class="w-12"
            src="@/assets/img/doctor/icon_dog.png" alt=""
          >
          <img
            v-if="p.customer.icon_type == 3"
            class="w-12"
            src="@/assets/img/doctor/icon_cat.png" alt=""
          >
          <img
            v-if="p.customer.icon_type == 4"
            class="w-12"
            src="@/assets/img/doctor/icon_robot.png" alt=""
          >
          
          
        </div>
        <div
          class="ml-3 flex flex-col flex-grow text-left"
        >
          <div class="flex items-center justify-between">
            <div class="font-medium text-base ">
              {{ p.customer.first_name }} {{ p.customer.last_name }}
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
    } = usePrescript('doctor');

    const onlyActive = ref(false)
    
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
      prescripts,
      onlyActive
    };
  }
})
</script>
