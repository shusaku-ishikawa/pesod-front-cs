<template>
  <base-layout>
    <div class="w-full bg-white flex-grow px-5 pt-5">
      <div class="mb-5">
        説明テキスト説明テキスト説明テキスト説明テキスト説明テキスト説明テキスト説明テキスト説明テキスト説明テキスト説明テキスト説明テキスト説明テキスト説明テキスト
      </div>
      <div>
        <div
          class="flex items-center mb-3"
        >
          <div
            class="px-5 "
          >
            <img
              class=""
              style="z-index:999"
              src="@/assets/icons/icon_myPage_off_80x80.png"
              alt=""
            >
          </div>
          <div class="flex-auto text-left">
            <div
              class="text-lg font-semibold"
            >
              マイページ
            </div>
            <div class="text-sm">
              アカウント情報や<br>
              定期便の確認はこちら
            </div>
          </div>
          <div>
            <svg
              @click="() => { router.push({ name: 'MyPageTop' }) }"
              class="h-10 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        <div
          class="flex items-center mb-3"
        >
          <div
            class="px-5 "
          >
            <img
              class=""
              style="z-index:999"
              src="@/assets/icons/icon_consultation_off_80x80.png"
              alt=""
            >
          </div>
          <div class="flex-auto text-left">
            <div
              class="text-lg font-semibold"
            >
              相談窓口
            </div>
            <div class="text-sm">
              毛髪のお悩みや<br>
              お問い合わせはこちら。
            </div>
          </div>
          <div>
            <svg
              @click="() => { router.push({ name: 'SupportTop' }) }"
              class="h-10 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        <div
          class="flex items-center mb-3"
        >
          <div
            class="px-5 "
          >
            <img
              class=""
              style="z-index:999"
              src="@/assets/icons/icon_medicalHistory_off_80x80.png"
              alt=""
            >
          </div>
          <div class="flex-auto text-left">
            <div
              class="text-lg font-semibold"
            >
              診察履歴
            </div>
            <div class="text-sm">
              過去の診察履歴を<br>
              確認できます。
            </div>
          </div>
          <div>
            <svg
              @click="() => { router.push({ name: 'DiagnosticTop' }) }"
              class="h-10 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        <div
          class="flex items-center mb-3"
        >
          <div
            class="px-5 "
          >
            <img
              class=""
              style="z-index:999"
              src="@/assets/icons/icon_myRecord_off_80x80.png"
              alt=""
            >
          </div>
          <div class="flex-auto text-left">
            <div
              class="text-lg font-semibold"
            >
              毛髪記録
            </div>
            <div class="text-sm">
              日々の記録をつけて<br>
              変化を確認しましょう。
            </div>
          </div>
          <div>
            <svg
              @click="() => { router.push({ name: 'LogsList' }) }"
              class="h-10 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </base-layout>
</template>
<style lang="scss" scoped>


</style>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  components: {
  },
  setup() {
    const router = useRouter();
    return {
      router  
    };
  }
})
</script>