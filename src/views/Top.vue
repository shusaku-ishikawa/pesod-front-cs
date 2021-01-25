<template>
  <base-layout>
    <div class="flex-grow flex flex-col justify-around">
          
      <div>
        <router-link
          :to="{ name: 'DiagnosticTop' }"
          v-slot="{ href, navigate }"
        >
          <button
            :href="href"
            @click="navigate"
            class="primary w-72"
          >
            対策 ROOM
          </button>
          
        </router-link>
      </div>
      <div>
        <router-link
          :to="{ name: 'HairConsultant' }"
          v-slot="{ href, navigate }"
        >
          <button
            :href="href"
            @click="navigate"
            class="primary w-72"
          >
            毛髪診断士に相談
          </button>
          
        </router-link>
      </div>
      <div>
        <router-link
          :to="{ name: 'LogsList' }"
          v-slot="{ href, navigate }"
        >
          <button
            :href="href"
            @click="navigate"
            class="primary w-72"
          >
            自分の記録
          </button>
          
        </router-link>
      </div>
      
        
    </div>
  </base-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import BaseLayout from '@/layouts/Base.vue';
export default defineComponent({
  components: {
    BaseLayout
  },
  setup() {
    return null;
  }
})
</script>