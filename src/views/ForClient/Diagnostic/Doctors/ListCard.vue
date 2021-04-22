<template>
  <div
    @click="() => { router.push({ name: 'DiagnosticDoctorDetailTop', params: { id: doctor.id } }) }"
        
    class="flex py-2 hover:bg-gray-50"
  >
    <div class="flex-shrink-0 my-auto mx-2 ">
      
      <img
        v-if="doctor.image"
        :src="doctor.image"
        alt=""
        style="width: 80px!important"
        class="rounded-full"
      >
      <svg
        v-else
        style="width: 80px"
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <div
      class="flex-grow flex flex-col"
    >
       
       <div class="text-left mt-1">
         <div class="font-semibold text-lg mb-1">{{ doctor.first_name }} {{ doctor.last_name }} 医師</div>
         <div class="text-sm mb-1">
           <div class="text-xs">クリニック名:</div>
           <div class="font-semibold">{{ doctor.clinic_name }}</div>
         </div>
         <div class="text-sm">
           {{ doctor.prefecture }}{{ doctor.city }}
         </div>
       </div>
    </div>
    <div class="my-auto">
      <svg
        class="w-8 h-8 text-gray-400 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { IDoctor } from '@/types/Interfaces';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
  },
  props: {
    doctor: {
      type: Object as () => IDoctor
    }
  },
  setup() {
    const router = useRouter();
    return {
      router
    };
  }
})
</script>