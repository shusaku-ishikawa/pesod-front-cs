<template>
  <base-layout>
    <template v-slot:title>
      <div class="">
        <svg
          @click="() => { router.push({ name: 'DiagnosticDoctorList' }) }"
          class="h-8 w-8 cursor-pointer absolute "
          xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        <div>
          {{ doctor.first_name }} {{ doctor.last_name }}
        </div>
      </div>
    </template>
    <div class="flex flex-col h-full ">
      <div class="grid grid-cols-12 flex-grow flex flex-col">
        <div class="col-span-10 col-start-2">
          <div class="py-10">
            <img
              class="w-36 h-36 inline-block"
              v-if="doctor.image"
              :src="doctor.image" alt="">
            <svg
              v-else
              class="w-36 h-36 inline-block"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="mb-10">
            
            <button
              @click="onSelectDoctor()"
              class="block w-full bg-black text-white mb-3"
            >
              この医師を選ぶ
            </button>
            <button
              @click="() => { router.push({ name: 'DiagnosticDoctorList' }) }"
              class="sedondary border block w-full ">
              他の医師にする
            </button>
          </div>
          <div>
            <div class="border-b text-left mb-5">
              <div class="text-sm">
                クリニック名
              </div>
              <div class="py-2 text-lg">
                {{ doctor.clinic_name }}
              </div>
            </div>
            <div class="border-b text-left mb-5">
              <div class="text-sm">
                診療時間
              </div>
              <div
                v-html="doctor.medical_time"
                class="py-2 text-lg">
              </div>
            </div>
            <div class="border-b text-left mb-5">
              <div class="text-sm">
                休診日
              </div>
              <div class="py-2 text-lg">
                {{ doctor.closed_date }}
              </div>
            </div>
            <div class="border-b text-left mb-5">
              <div class="text-sm">
                所在地
              </div>
              <div class="py-2 text-lg">
                {{ doctor.prefecture }} {{ doctor.city }} {{ doctor.address }}
              </div>
            </div>
            <div class="border-b text-left mb-5">
              <div class="text-sm">
                クリニック概要
              </div>
              <div
                v-html="doctor.description"
                class="py-2 text-lg">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </base-layout>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import useDoctors from '@/types/Doctor';
import { IDoctor, IPrescript } from '@/types/Interfaces';
import usePrescript from '@/types/Prescript';

export default defineComponent({
  components: {
  },
  props: {
    doctor: {
      type: Object as () => IDoctor
    },
  },
  setup(prop, _) {
    const router = useRouter();

    const {
      selectDoctor
    } = usePrescript();

    const onSelectDoctor = async () => {
      if (prop.doctor == null) return;
      try {
        const data = await selectDoctor(prop.doctor.id || -1);
        // update myPrescript
        
        router.push({ name: 'DiagnosticDoctorDetailChat' })
      } catch (err) {
        console.error(err)
      }
      
    }
    
    return {
      router,
      onSelectDoctor
    }
  }
})
</script>