<template>
  <base-layout>
    <div class="flex-grow flex flex-col pt-5 ">
      
      <div
        class="flex w-full items-center py-1 px-10"
        :class="{ 'bg-yellow-100': !answeredAll }"
      >
        <div>
          <img class="" src="@/assets/icons/icon_monshin_80x80.png" alt="">
        </div>
        <div class="text-left ml-2">
          <div>問診</div>
          <div>
            {{ answeredAll ? '回答済み' : '未回答あり' }}
          </div>
          <div v-if="answeredAll">
            <div class="text-sm">有効期限：</div>
            <div>
              2021/2/2 2:00
            </div>
          </div>
        </div>
        <div class="flex-grow text-right">
          <router-link
            :to="{ name: 'DiagnosticQuestionaireTop' }"
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
      <div
        :class="{ 'text-gray-400': !answeredAll }"
      >
        <svg
          class="h-5 inline-block"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
        </svg>
      </div>
      <div
        class="flex w-full items-center py-1 px-10"
        :class="{ 'text-gray-400': !answeredAll, 'bg-yellow-100': !myDoctor,  }"  
      >
        <div>
          <img
            v-if="answeredAll"
            class=""
            src="@/assets/icons/icon_doctor_on_80x80.png"
            alt="">
          <img
            v-else
            class=""
            src="@/assets/icons/icon_doctor_off_80x80.png"
            alt="">
          
        </div>
        <div class="text-left ml-2">
          <div>医師選択</div>
          <div class="mb-1">
            {{ myDoctor != null ? '選択済み' : '未選択' }}
          </div>
          <div v-if="myDoctor != null">
            <div class="text-sm">担当医師：</div>
            <div>
              {{ myDoctor.name }}
            </div>
          </div>
        </div>
        <div class="flex-grow text-right">
          <router-link
            :to="{ name: 'DiagnosticDoctorList' }"
            v-slot="{ navigate, href }"
          >
            <svg
              :href="href"
              @click="navigate"
              class="h-10 inline-block"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>
      </div>
      <div
        :class="{ 'text-gray-400': !answeredAll }"
      >
        <svg
          class="h-5 inline-block"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
        </svg>
      </div>
      <div
        class="flex w-full items-center py-1 px-10"
        :class="{ 'text-gray-400': !answeredAll, 'bg-yellow-100': !myDoctor,  }"  
      >
        <div>
          <img
            v-if="anseredAll"
            class=""
            src="@/assets/icons/icon_medical_on_80x80.png"
            alt="">
          <img
            v-else
            class=""
            src="@/assets/icons/icon_medical_off_80x80.png"
            alt="">
          
        </div>
        <div class="text-left ml-2">
          <div>診察</div>
          <div>未受診</div>
          <div>受診する</div>
        </div>
        <div class="flex-grow text-right">
          <router-link
            :to="{ name: 'DiagnosticDoctorDetailChat', params: { id: 1 } }"
            v-slot="{ href, navigate }"
          >
            <svg
              :href="href"
              @click="navigate"
              class="h-10 inline-block"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>
      </div>
      <div
        :class="{ 'text-gray-400': !answeredAll }"
      >
        <svg
          class="h-5 inline-block"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
        </svg>
      </div>
      <div
        class=" flex w-full items-center py-1 px-10"
        :class="{ 'text-gray-400': !answeredAll, 'bg-yellow-100': !myDoctor,  }"  
      >
        
        <div>
          <img
            v-if="answeredAll"
            class=""
            src="@/assets/icons/icon_buy_on_80x80.png"
            alt=""
          >
          <img
            v-else
            class=""
            src="@/assets/icons/icon_buy_off_80x80.png"
            alt=""
          >
          
        </div>
        <div class="text-left ml-2">
          <div>購入</div>
          <div>院内処方がありません</div>
        </div>
        <div class="flex-grow text-right">
          <router-link
            :to="{ name: 'StoreProductList' }"
            v-slot="{ href, navigate }"
          >
            <svg
              :href="href"
              @click="navigate"
              class="h-10 inline-block"
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
import { defineComponent, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import useQuestionaire from '@/types/Questionaire';
import useDoctor from '@/types/Doctor';

export default defineComponent({
  components: {
  },
  setup() {
    const {
      answeredAll,
    } = useQuestionaire();

    const {
      myDoctor
    } = useDoctor();

    const router = useRouter();
    // onMounted(() => {
    //   router.push({ name: 'Top' });
    // });

    return {
      answeredAll,
      myDoctor,
    };
  }
})
</script>