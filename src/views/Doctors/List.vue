<template>
  <base-layout>
    <template v-slot:title>
       <div class="bg-gray-400 py-2">
          医師一覧
      </div>
    </template>
    <div class="flex flex-col">
      <doctor-list-filter
        class="my-5"
      >
      </doctor-list-filter>
      <div class="flex-grow relative overflow-y-auto">
        <doctor-list-card
          v-for="(d, i) in doctors"
          :key="i"
          :doctor="d"
        ></doctor-list-card>
      </div>
    </div>
  </base-layout>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import useDoctors from '@/types/Doctor';
import DoctorListCard from '@/views/Doctors/ListCard.vue';
import DoctorListFilter from '@/views/Doctors/ListFilter.vue';

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