<template>
  <div
    class="w-full bg-gray-100 items-center flex "
    style="height: 50px; background-color: #CCEAFF"
  >
    <div
      @click="() => { router.push({ name: 'MyPageTop' }) }"
      class="h-full flex-grow flex flex-col cursor-pointer pt-1"
      :class="{ 'bg-gray-600 text-white': route.name.includes('MyPage') }"
    >
      <div class="text-center">
        <img
          v-if="route.name.includes('MyPage')"
          class="w-6 h-6 inline-block"
          src="@/assets/icons/icon_myPage_on.png"
          alt=""
        >
        <img
          v-else
          class="w-6 h-6 inline-block"
          src="@/assets/icons/icon_myPage_off.png"
          alt=""
        >
      </div>
      <div class="text-xs">
        マイページ
      </div>
    </div>
    <div
      @click="() => { router.push({ name: 'SupportTop' }) }"
      class="h-full flex-grow flex flex-col cursor-pointer  pt-1"
      :class="{ 'bg-gray-600 text-white': route.name.includes('Support') }"
    >
      <div class="text-center ">
        <img
          v-if="route.name.includes('Support')"
          class="w-6 h-6 inline-block"
          src="@/assets/icons/icon_consultation_on.png"
          alt=""
        >
        <img
          v-else
          class="w-6 h-6 inline-block"
          src="@/assets/icons/icon_consultation_off.png"
          alt=""
        >
      </div>
      <div class="text-xs">
        相談窓口
      </div>
    </div>
    <div
      @click="() => { router.push({ name: 'DiagnosticTop' })  }"
      class="h-full flex-grow flex flex-col cursor-pointer pt-1"
      :class="{ 'bg-gray-600 text-white': route.name.includes('Diagnostic') }"
    
    >
      <div class="text-center">
        <img
          v-if="route.name.includes('Diagnostic')"
          class="w-6 h-6 inline-block"
          src="@/assets/icons/icon_medicalHistory_on.png"
          alt=""
        >
        <img
          v-else
          class="w-6 h-6 inline-block"
          src="@/assets/icons/icon_medicalHistory_off.png"
          alt=""
        >
      </div>
      <div class="text-xs">
        診断履歴
      </div>
    </div>
    <div
      @click="() => { router.push({ name: 'LogsList' })}"
      class=" h-full flex-grow flex flex-col cursor-pointer pt-1"
      :class="{ 'bg-gray-600 text-white': route.name.includes('Logs') }"
    
    >
      <div class="text-center">
        <img
          v-if="route.name.includes('Logs')"
          class="w-6 h-6 inline-block"
          src="@/assets/icons/icon_myRecord_on.png"
          alt=""
        >
        <img
          v-else
          class="w-6 h-6 inline-block"
          src="@/assets/icons/icon_myRecord_off.png"
          alt=""
        >
      </div>
      <div class="text-xs">
        毛髪記録
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
    const route = useRoute();
    return {
      router,
      route
    }
  }
})
</script>
