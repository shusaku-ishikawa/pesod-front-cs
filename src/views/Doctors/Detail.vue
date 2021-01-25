<template>
  <base-layout>
    <template v-slot:title>
      <div class="bg-gray-400 py-2">
          医師プロフィール
      </div>
    </template>
    <div class="flex flex-col h-full">
      <div class="grid grid-cols-12 flex-grow flex flex-col">
        <div class="col-span-10 col-start-2">
          <div>
            <svg
              class="w-36 h-36 inline-block"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="text-3xl mb-2">
            {{ doctor.name }}
          </div>
          <div class="mb-2">
            {{ doctor.prefecture }}
          </div>
          <div class="mb-4">
            {{ doctor.description }}
          </div>
          <div class="mb-2">
            <router-link
              :to="{ name: 'DiagnosticChat', params: { doctorId: doctor.id } }"
              v-slot="{ href, navigate }"
            >
              <button
                :href="href"
                @click="navigate"
                class="primary block w-full"
              >
                診察を始める
              </button>
            </router-link>
          </div>
          <div>
            <router-link
              :to="{ name: 'DoctorList' }"
              v-slot="{ href, navigate }"
            >
              <button
                :href="href"
                @click="navigate"
                class="secondary block w-full"
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
import { defineComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import useDoctors from '@/types/Doctor';

export default defineComponent({
  components: {
  },
  setup() {
    const route = useRoute();
    const {id} = route.params;
    const dId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id);
    
    const {
      doctors,
      fetchDoctors
    } = useDoctors();
    console.log(dId)
    console.log(doctors.value)
    const doctor = doctors.value.find(d => d.id === dId);
    return {
      doctor
    };
  }
})
</script>