<template>
  <div
    class="flex py-4 hover:bg-gray-50"
  >
    <div class="my-auto">
      <svg
        class="w-16 h-16"
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <div
      class="px-2 flex-grow flex flex-col"
    >
       <div class="flex items-center">
         <div class="whitespace-nowrap font-medium pr-3">{{ doctor.prefecture }}</div>
         <div class=" px-2 text-xs border-2 border-gray-600">
           オンライン診療検収受講済み
          </div>
       </div>
       <div class="text-left">
         <div class="font-medium text-3xl py-1">{{ doctor.name }}</div>
         <div class="text-sm">
           クリニック名：{{ doctor.clinicName }}
         </div>
         <div class="text-sm">
           {{ doctor.status }}
         </div>
       </div>
    </div>
    <div class="my-auto">
      <svg
        @click="() => { router.push({ name: 'DoctorDetail', params: { id: doctor.id } }) }"
        class="w-10 h-10 text-gray-400 cursor-pointer"
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