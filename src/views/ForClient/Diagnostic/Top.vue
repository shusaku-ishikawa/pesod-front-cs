<template>
  <base-layout>
    <div v-if="!myPrescript">
      loading...
    </div>
    <div
      v-else
      class="flex-grow flex flex-col pt-5 ">
      <div
        class="flex w-full items-center py-1 px-10"
        :class="{ 'bg-yellow-100': prescriptStatus === 1 }"
      >
        <div>
          <img class="" src="@/assets/icons/icon_monshin_80x80.png" alt="">
        </div>
        <div class="text-left ml-2">
          <div>問診</div>
          <div>
            {{ prescriptStatus > 1 ? '回答済み' : '未回答あり' }}
          </div>
          <div v-if="prescriptStatus > 1">
            <div class="text-sm">有効期限：{{ formatDate(myPrescript.prescription_use_period, 'YYYY/M/D') }}</div>
            
          </div>
        </div>
        <div class="flex-grow text-right">
          <router-link
            :to="{ name: 'DiagnosticQuestionaireTop' }"
            v-slot="{ navigate, href }"
          >
            <svg
              v-if="prescriptStatus === 1"
              :href="href"
              @click="navigate"
              class="h-8 inline-block cursor-pointer "
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>
      </div>
      <div
        :class="{ 'text-gray-400': prescriptStatus != 1 }"
      >
        <svg
          class="h-5 inline-block"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
        </svg>
      </div>
      <div
        class="flex w-full items-center py-1 px-10"
        :class="{ 'text-gray-400': prescriptStatus < 2, 'bg-yellow-100': prescriptStatus === 2 }"  
      >
        <div>
          <img
            v-if="prescriptStatus >= 2"
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
            {{ myPrescript.doctor != null ? '選択済み' : '未選択' }}
          </div>
          <div class="flex items-center text-sm" v-if="myPrescript.doctor != null">
            <div class="text-sm">担当医師：</div>
            <div>
              {{ myPrescript.doctor.first_name }} {{ myPrescript.doctor.last_name }}
            </div>
          </div>
        </div>
        <div class="flex-grow text-right">
          <router-link
            :to="{ name: 'DiagnosticDoctorList' }"
            v-slot="{ navigate, href }"
          >
            <svg
              v-if="prescriptStatus === 2"
              :href="href"
              @click="navigate"
              class="h-8 inline-block"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>
      </div>
      <div
        :class="{ 'text-gray-400': prescriptStatus != 2 }"
      >
        <svg
          class="h-5 inline-block"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
        </svg>
      </div>
      <div
        class="flex w-full items-center py-1 px-10"
        :class="{ 'text-gray-400': prescriptStatus < 3, 'bg-yellow-100': prescriptStatus === 3,  }"  
      >
        <div>
          <img
            v-if="prescriptStatus >= 3"
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
          <div>
            {{ prescriptStatus >= 3 ? '診察済み' : '未診察'  }}
          </div>
        </div>
        <div class="flex-grow text-right">
          <router-link
            :to="{ name: 'DiagnosticDoctorDetailChat', params: { id: myPrescript.doctor?.id } }"
            v-slot="{ href, navigate }"
          >
            <svg
              v-if="prescriptStatus === 3"
              :href="href"
              @click="navigate"
              class="h-8 inline-block"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>
      </div>
      <div
        :class="{ 'text-gray-400': prescriptStatus != 3 }"
      >
        <svg
          class="h-5 inline-block"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
        </svg>
      </div>
      <div
        class=" flex w-full items-center py-1 px-10"
        :class="{ 'text-gray-400': prescriptStatus < 4, 'bg-yellow-100': prescriptStatus === 4,  }"  
      >
        
        <div>
          <img
            v-if="prescriptStatus === 4"
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
          <div>
            {{ prescriptStatus >= 4 ? '院内処方済み' : '未処方' }}
          </div>
        </div>
        <div class="flex-grow text-right">
          <router-link
            :to="{ name: 'StoreProductList' }"
            v-slot="{ href, navigate }"
          >
            <svg
              v-if="prescriptStatus === 4"
              :href="href"
              @click="navigate"
              class="h-8 inline-block"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </base-layout>
</template>
<style lang="scss" scoped>
  img {
    height: 70px;
    width: 70px;
  }
</style>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import usePrescript from '@/types/Prescript';
import useDoctor from '@/types/Doctor';
import moment from 'moment';
import { getRegexpTester } from '@/mixins/FormValidator';

export default defineComponent({
  components: {
  },
  setup() {
    const {
      myPrescript,
      getPrescript
    } = usePrescript();
    
    const formatDate = (val: string | null, format: string) => {
      if (val == null) return '';
      return moment(val).format(format);

    }
    
    const router = useRouter();
    
    onMounted(async () => {
      
      myPrescript.value = await getPrescript();
      
      // router.push({ name: 'Top' });
    });

    const prescriptStatus = computed(() => {
      //return myPrescript.value?.status;
      return myPrescript.value?.status
    })
    return {
      prescriptStatus,
      myPrescript,
      formatDate
    };
  }
})
</script>