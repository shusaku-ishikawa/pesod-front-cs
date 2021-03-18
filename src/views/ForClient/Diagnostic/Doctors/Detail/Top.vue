<template>
  <base-layout>
    <template v-slot:title>
      <page-title>
        医師プロフィール
      </page-title>
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
          <div class="text-3xl mb-2">
            {{ doctor.first_name }} {{ doctor.last_name  }}
          </div>
          <div class="mb-2">
            {{ doctor.prefecture }}
          </div>
          <div class="mb-4 break-words">
            {{ doctor.description }}
          </div>
          <div class="mb-2">
            
            <button
              @click="onSelectDoctor"
              class="primary block mx-auto w-72"
            >
              診察を始める
            </button>
          </div>
          <div>
            <router-link
              :to="{ name: 'DiagnosticDoctorList' }"
              v-slot="{ href, navigate }"
            >
              <button
                :href="href"
                @click="navigate"
                class="secondary block mx-auto w-72"
              >
                他の医師を選択
              </button>
            </router-link>
            
          </div>
        </div>
      </div>
    </div>
  </base-layout>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import useDoctors from '@/types/Doctor';
import { IDoctor, IPrescript } from '@/types/Interfaces';
import usePrescript from '@/types/Prescript';
import router from '@/router';

export default defineComponent({
  components: {
  },
  props: {
    doctor: {
      type: Object as () => IDoctor
    },
  },
  setup(prop, _) {
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
      onSelectDoctor
    }
  }
})
</script>