<template>
  <base-layout>
    <template v-slot:title>
      <div class="">
        <svg
          @click="() => { router.push({ name: 'StoreProductList' }) }"
          class="h-8 w-8 cursor-pointer absolute "
          xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        <div>
          定期購入の申し込み
        </div>
      </div>
    </template>
    <div class="flex flex-col flex-grow px-4">
      <store-stepper
        class="mb-5"
        :step="4"
      ></store-stepper>
      <div class="font-bold text-2xl my-10">
        お申し込み<br>
        ありがとうございました
      </div>
      <div class="p-3 bg-blue-100 mb-5">
        <div>次回お届け日：１月１日</div>
        <div>配送日間隔：３０日</div>
      </div>
      <div class="text-left text-gray-600 text-sm mb-5">
        定期購入の詳細は、マイメニューからご確認い
        ただけます。<br>
        お申し込みいただいた商品を定期的にお届け
        するサービスです。<br>
        定期回数の縛りはありません。いつでもご解
        約可能です。<br>
        商品にて残りがある場合など、次回お届け日
        の変更は、お届け予定日の 5 日前までにご連
        絡ください。<br>
        ご解約はカスタマーセンターまでご連絡くださ
        い。
      </div>
      <div>
        <button
          class="block bg-black text-white w-full"
        >
          ホームに戻る
        </button>
      </div>
    </div>
  </base-layout>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, SetupContext } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ISubscription, IProduct } from '@/types/Interfaces'
import StoreStepper from './Stepper.vue'

export default defineComponent({
  components: {
    StoreStepper,
  },
  props: {
    subscription: {
      type: Object as () => ISubscription
    }
  },
  setup(props: any, context: SetupContext) {
    const route = useRoute();
    const router = useRouter();

    

    return {
      route,
      router,
      // onSubmit
    };
  }
})
</script>