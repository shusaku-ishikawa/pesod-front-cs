<template>
  <base-layout>
    <template v-slot:title>
      <page-title>
        相談窓口
      </page-title>
    </template>
    <div class="flex flex-col  mx-auto pt-5 px-5">
      <div class="flex items-center py-1 mb-5">
        <img class="" src="@/assets/icons/icon_professional_80x80.png" alt="">
          
        <div class="text-left ml-2 flex-auto">
          <div>毛髪診断士相談室</div>
          <div class="text-sm">平日 10:00-19:00</div>
          <div class="text-sm break-all">毛髪診断士にチャットでご相談ください。</div>
        </div>
        <div class="flex-grow text-right">
          <router-link
            :to="{ name: 'SupportHairConsultant' }"
            v-slot="{ navigate, href }"
          >
            <svg
              :href="href"
              @click="navigate"
              class="h-10 inline-block cursor-pointer "
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>
      </div>
      <div class="flex items-center py-1">
        <img class="" src="@/assets/icons/icon_customerSupport_80x80.png" alt="">  
        <div class="text-left ml-2 flex-grow">
          <div>カスタマーサポート</div>
          <div class="text-sm">平日 10:00-19:00</div>
        </div>
        <div class="flex-grow text-right">
          <router-link
            :to="{ name: 'SupportCS' }"
            v-slot="{ navigate, href }"
          >
            <svg
              :href="href"
              @click="navigate"
              class="h-10 inline-block cursor-pointer "
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>
      </div>
    
    </div>
        
    
  </base-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  components: {
  },
  setup() {
    const route = useRoute();

    return {
      route
    };
  }
})
</script>