<template>
  <div class=" text-center flex-grow flex flex-col pt-10">
      <div class="mb-10">
        <router-link
          :to="{ name: 'QuestionaireTop' }"
          v-slot="{ href, navigate }"
        >
          <button
            :href="href"
            @click="navigate"
            class="primary w-72"
          >
            問診表
          </button>
          
        </router-link>
      </div>
      <div class="mb-10">
        <router-link
          :to="{ name: 'DoctorList' }"
          v-slot="{ href, navigate }"
        >
          <button
            :href="href"
            @click="navigate"
            class="primary w-72"
          >
            医師選択
          </button>
          
        </router-link>
      </div>
      <div class="mb-10">
        <router-link
          :to="{ name: 'DiagnosticNotCompleted' }"
          v-slot="{ href, navigate }"
        >
          <button
            :href="href"
            @click="navigate"
            class="primary w-72"
          >
            診断
          </button>
          
        </router-link>
      </div>
      <div>
        <button
          class="primary w-72"
        >
          ストア
        </button>
      </div>  
    <!-- </div> -->

  </div>
 
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
  },
  setup() {
    return null;
  }
})
</script>