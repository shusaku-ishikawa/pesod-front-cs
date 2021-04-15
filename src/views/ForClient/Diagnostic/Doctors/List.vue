<template>
  <base-layout>
    <template v-slot:title>
      <div class="">
        <svg
          @click="() => { router.push({ name: 'DiagnosticTop' }) }"
          xmlns="http://www.w3.org/2000/svg"
          class="absolute h-6 w-6 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
        <div>
          医師を選択
        </div>
      </div>
    </template>
    <div class="flex flex-col flex-grow " style="margin: 0px 20px; padding: 40px 0px 0px">
      <div class="px-2">
        <div class="font-semibold mb-3 text-sm">
          受診を希望する医師を選択してください
        </div>
        <div class="text-xs text-left mb-3 " style="margin: 0px 10px 12px">
        
          医師を選択すると、詳細画面へ遷移します。診察はチャ
          ットで行われるため、対面によるストレスを感じることは
          ありません。
        </div>
        <div style="font-size: 0.5rem; margin: 0px 10px 20px; padding: 8px 4px" class=" bg-gray-100 py-2 text-left">
          健康被害の可能性がある等、医師の判断で他の通信手段でご連
          絡させていただく場合がございます。
        </div>
      </div>
      <div class="flex-grow  overflow-y-auto">
        <div class=" left-0 w-full pr-4">
          <doctor-list-card
            
            :class="{ 'border-b': i < doctors.length - 1 }"
            v-for="(d, i) in doctors"
            :key="i"
            :doctor="d"
          ></doctor-list-card>
        </div>
        
      </div>
    </div>
  </base-layout>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

import usePrescript from '@/types/Prescript';
import useDoctors from '@/types/Doctor';
import DoctorListCard from './ListCard.vue';
import DoctorListFilter from './ListFilter.vue';
import { IDoctor } from '@/types/Interfaces';
import {useRouter} from 'vue-router';

export default defineComponent({
  components: {
    DoctorListCard,
  },
  setup() {
    const router = useRouter();

    
    const {
      doctors,
      fetchDoctors
    } = useDoctors();

    const dataReady = ref(false);
    
    onMounted(async () => {
      try {
        doctors.value = await fetchDoctors();
        dataReady.value = true;
        console.log(doctors.value)
      } catch (err) {
        console.error(err);
      }
    });
    return {
      dataReady,
      doctors
    };
  }
})
</script>