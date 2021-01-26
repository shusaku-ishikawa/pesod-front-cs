<template>
  <div class="h-16 w-full bg-gray-200  px-2 items-center flex justify-around">
    <div
      @click="() => { router.push({ name: 'DiagnosticTop' }) }"
      class="flex flex-col cursor-pointer"
    >
      <div class="text-center">
        <img
          class="w-8 h-8 inline-block"
          src="@/assets/icons/icon_stethoscope.png"
          alt=""
        >
      </div>
      <div class="text-xs">
        対策ROOM
      </div>
    </div>
    <div
      @click="() => { router.push({ name: 'HairConsultant' }) }"
      class="flex flex-col cursor-pointer"
    >
      <div class="text-center ">
        
        <img
          class="w-8 h-8 inline-block"
          src="@/assets/icons/icon_hairDiagnostician.png"
          alt=""
        >
      </div>
      <div class="text-xs">
        毛髪診断士
      </div>
    </div>
    <div
      @click="() => { router.push({ name: 'LogsList' }) }"
      class="flex flex-col cursor-pointer"
    >
      <div class="text-center">
        <img
          class="w-8 h-8 inline-block"
          src="@/assets/icons/icon_myRecord.png"
          alt=""
        >
      </div>
      <div class="text-xs">
        自分の記録
      </div>
    </div>
    <div class="flex flex-col cursor-pointer">
      <div class="text-center">
        <img
          class="w-8 h-8 inline-block"
          src="@/assets/icons/icon_medicalHistory.png"
          alt=""
        >
      </div>
      <div class="text-xs">
        診断履歴
      </div>
    </div>
    <div
      @click="() => { router.push({ name: 'StorePrescription' }) }"
      class="flex flex-col cursor-pointer"
    >
      <div class="text-center">
        <img
          class="w-8 h-8 inline-block"
          src="@/assets/icons/icon_store.png"
          alt=""
        >
      </div>
      <div class="text-xs">
        ストア
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  components: {
        
  },
  setup() {
    const router = useRouter();
    
    return {
      router
    }
  }
})
</script>
