<template>
  <div
    class="flex flex-col min-h-full w-full px-2 py-3 text-sm"
  >
    <div class="relative mb-3 w-full ">
      <input
        placeholder="名前でフィルター"
        :value="searchWord"
        @input="onInputSearchWord"
        class="rounded-full px-4 focus:outline-none focus:ring w-full py-2 border block flex-grow "
        type="text">
      <button
        @click="onResetSearchWord"
        class="absolute right-0 bg-gransparent top-1 rounded-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
      
    </div>
    <div class="mb-3 flex items-center">
      <div class="flex-grow text-sm">
        終了した診察も表示    
      </div>
      <div class="ml-2">
        <toggle v-model="showInactive" />
      </div>
    </div>
    <!-- <div class="mb-5">
      <button
        @click="onlyActive = !onlyActive"
        :class="{ 'bg-green-600 text-white': !onlyActive }"
        class="block w-full shadow bg-gray-200 text-black">
        {{ onlyActive ? '全て表示' : '要対応のみ表示' }}
      </button>
    </div> -->
    <div class="flex-grow w-full relative overflow-y-auto">
      <div v-if="loadingPrescripts">
        <div
          v-for="i in 3"
          :key="i"
          class="mb-3 rounded-tr rouned-br rounded-bl p-2 w-full mx-auto">
          <div class="items-center animate-pulse flex space-x-4">
              <div >
                <div class="w-8 h-8 rounded-full bg-blue-100"></div>
              </div>
              <div class="flex-1 space-y-4 py-1">
                
                <div class="space-y-2">
                  <div class="h-4 bg-blue-100 rounded"></div>
                  <div class="h-4 bg-blue-100 rounded"></div>
                </div>

            </div>
          </div>
        </div>
      </div>
      <div v-else class="absolute w-full">
        <prescript-card
          v-for="(p, i) in prescriptsToDisplay"
          :key="i"
          :prescript="p"
          :isActive="activePrescript && activePrescript.id == p.id"
          @click="onSelectPrescript(p)"
        ></prescript-card>
          
        
      </div>
   </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, SetupContext, ref, onMounted, computed } from "vue";
import usePrescript from '@/types/Prescript';
import { IPrescript } from '@/types/Interfaces';
import PrescriptCard from './LeftPane/PrescriptCard.vue';
import Toggle from '@/components/Toggle.vue';

export default defineComponent({
  components: {
    PrescriptCard,
    Toggle
  },
  props: {
    loadingPrescripts: Boolean,
    prescripts: {
      type: Object as () => IPrescript[]
    },
    activePrescript: {
      type: Object as () => IPrescript
    },
    searchWord: String
  },
  emits: [
    'page',
    'update:activePrescript',
    'update:searchWord'
  ],
  setup(props: any, context: SetupContext) {
    
    
    
    const showInactive = ref(false)
    
    
    
    const prescriptsToDisplay = computed(() => {
      if (!showInactive.value) {
        return props.prescripts.filter((p: any) => p.status == 3)
      } else {
        return props.prescripts.filter((p: any) => p.status > 2)
      }
    })

    const onInputSearchWord = (event: Event) => {
      const {target} = event;
      if (!(target instanceof HTMLInputElement)) return;
      context.emit('update:searchWord', target.value);
    }
    const onSelectPrescript = (p: IPrescript) => {
      
      context.emit('update:activePrescript', p);
      context.emit('page', 'main')
    };
    
    const onResetSearchWord = () => {
      context.emit('update:searchWord', '')
    }

    return {
      onSelectPrescript,
      showInactive,
      prescriptsToDisplay,
      onInputSearchWord,
      onResetSearchWord,
    };
  }
})
</script>
