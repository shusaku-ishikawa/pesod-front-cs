<template>
  <base-layout>
    <template v-slot:title>
      <div class="">
        <svg
          @click="() => { router.push({ name: 'Top' }) }"
          xmlns="http://www.w3.org/2000/svg"
          class="absolute left-1 h-6 w-6 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
        <div>
          Pesod 育毛対策 お手続き
        </div>
      </div>
    </template>
    <div v-if="!myPrescript">
      loading...
    </div>
    
    <div
      v-else
      class="flex-grow flex flex-col pt-5" style="margin: 0 20px;">
      <div>
        <div class="mb-5 font-bold text-sm">
          診察・処方に必要なお手続きをお願いたします
        </div>
        <div class="text-xs text-left mb-3 " style="margin: 0px 10px 12px">
          Pesodでは、問診と医師の診察から、あなたに最適な<br>
          育毛対策方針・処方を提案します。下記のお手続きを上<br>
          から順にご対応ください。
        </div>
        <div style="font-size: 0.5rem; margin: 0px 10px 20px; padding: 8px 4px" class=" bg-gray-100 py-2 text-left">
          医師の判断により、医薬品の提供ができない場合がございます。<br>
          あらかじめご了承ください。
        </div>
      </div>
      <div>
        
        <img
          v-if="prescriptStatus == 1"
          src="@/assets/img/taisaku_menu_01_on.png"
          alt=""
          class="block w-full cursor-pointer"
          @click="() => { router.push({ name: 'DiagnosticQuestionaireTop' }) }"
        >
        <img
          v-if="prescriptStatus >= 2"
          src="@/assets/img/taisaku_menu_01_off.png"
          alt=""
          class="block w-full"
        >
      </div>
      <div>
        <img
          v-if="prescriptStatus < 2"
          src="@/assets/img/taisaku_menu_02.png"
          alt=""
          class="block w-full"
        >
        <img
          v-if="prescriptStatus == 2"
          src="@/assets/img/taisaku_menu_02_on.png"
          alt=""
          class="block w-full cursor-pointer"
          @click="() => { router.push({ name: 'DiagnosticDoctorList' }) }"
        
        >
        
        <img
          v-if="prescriptStatus >= 3"
          src="@/assets/img/taisaku_menu_02_off.png"
          alt=""
          class="block w-full"
        >
      </div>
      <div>
        <img
          v-if="prescriptStatus < 3"
          src="@/assets/img/taisaku_menu_03.png"
          alt=""
          class="block w-full cursor-pointer"
          @click="() => { router.push({ name: 'DiagnosticDoctorDetailChat', params: { id: myPrescript.doctor.id } }) }"
        
        >
        <img
          v-if="prescriptStatus == 3"
          src="@/assets/img/taisaku_menu_03_on.png"
          alt=""
          class="block w-full cursor-pointer"
          @click="() => { router.push({ name: 'DiagnosticDoctorDetailChat', params: { id: myPrescript.doctor.id } }) }"
        
        >
        <img
          v-if="prescriptStatus >= 4"
          src="@/assets/img/taisaku_menu_03_off.png"
          alt=""
          class="block w-full"
        >
      </div>
      <div>
        <img
          v-if="prescriptStatus < 4"
          src="@/assets/img/taisaku_menu_04.png"
          alt=""
          class="block w-full cursor-pointer"
          @click="() => { router.push({ name: 'StoreProductList' }) }"
        >
        <img
          v-if="prescriptStatus >= 4"
          src="@/assets/img/taisaku_menu_04_on.png"
          alt=""
          class="block w-full cursor-pointer"
          @click="() => { router.push({ name: 'StoreProductList' }) }"
        >
        
      </div>
    </div>
  </base-layout>
</template>
<style lang="scss" scoped>
 
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
      router,
      prescriptStatus,
      myPrescript,
      formatDate
    };
  }
})
</script>