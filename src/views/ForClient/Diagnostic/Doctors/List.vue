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
        <div class="absolute left-0 w-full">
          <doctor-list-card
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
import { defineComponent, onMounted } from 'vue';

import useDoctors from '@/types/Doctor';
import DoctorListCard from './ListCard.vue';
import DoctorListFilter from './ListFilter.vue';

export default defineComponent({
  components: {
    DoctorListCard,
    DoctorListFilter
  },
  setup() {
    const {
      doctors,
      fetchDoctors
    } = useDoctors();

    onMounted(() => {
      fetchDoctors();
    });
    return {
      doctors
    };
  }
})
</script>