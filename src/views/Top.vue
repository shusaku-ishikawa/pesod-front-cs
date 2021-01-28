<template>
  <base-layout>
    <div class="flex-grow flex flex-col pt-5 w-72 mx-auto">
      
      <div class="flex w-full items-center py-1">
        <div>
          <img class="h-20" src="@/assets/icons/icon_monshin.png" alt="">
        </div>
        <div class="text-left ml-2">
          <div>問診</div>
          <div>回答済み</div>
          <div>有効期限：</div>
          <div>
            2021/2/2 2:00
          </div>
        </div>
        <div class="flex-grow text-right">
          <router-link
            :to="{ name: 'QuestionaireTop' }"
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
      <div>
        <svg
          class="h-5 inline-block"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
        </svg>
      </div>
      <div class="flex w-full items-center  py-1">
        <div>
          <img class="h-20" src="@/assets/icons/icon_doctor_on.png" alt="">
        </div>
        <div class="text-left ml-2">
          <div>医師選択</div>
          <div>選択済み</div>
          <div>担当医師：</div>
          <div>
            山田太郎
          </div>
        </div>
        <div class="flex-grow text-right">
          <router-link
            :to="{ name: 'DoctorList' }"
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
      <div>
        <svg
          class="h-5 inline-block"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
        </svg>
      </div>
      <div class="flex w-full items-center  py-1">
        <div>
          <img class="h-20" src="@/assets/icons/icon_medical_on.png" alt="">
        </div>
        <div class="text-left ml-2">
          <div>診察</div>
          <div>未受診</div>
          <div>受診する</div>
        </div>
        <div class="flex-grow text-right">
          <router-link
            :to="{ name: 'DiagnosticChat', params: { doctorId: 1 } }"
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
      <div>
        <svg
          class="h-5 inline-block"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
        </svg>
      </div>
      <div class=" flex w-full items-center py-1">
        <div>
          <img class="h-20" src="@/assets/icons/icon_buy_on.png" alt="">
        </div>
        <div class="text-left ml-2">
          <div>購入</div>
          <div>院内処方がありません</div>
        </div>
        <div class="flex-grow text-right">
          <router-link
            :to="{ name: 'StorePrescription' }"
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