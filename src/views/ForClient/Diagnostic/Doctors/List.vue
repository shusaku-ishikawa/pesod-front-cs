<template>
  <base-layout>
    <template v-slot:title>
      <page-title>
        医師一覧
      </page-title>
    </template>
    <div class="flex flex-col flex-grow">
      <doctor-list-filter
        class="my-5"
      >
      </doctor-list-filter>
      <div class="flex-grow relative overflow-y-auto">
        <div class="absolute left-0 w-full pr-4">
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
    DoctorListFilter
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