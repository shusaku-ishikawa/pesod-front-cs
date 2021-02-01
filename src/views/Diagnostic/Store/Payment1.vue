<template>
  <div class="">
    <store-stepper
      class="mb-5"
      :step="1"
    ></store-stepper>
    <div class="border-b border-t">
      配送先を選択
    </div>
    <div class="text-left p-2">
      <div>
        <p-checkbox
          label="プロフィールの住所に発送"
        ></p-checkbox>
      </div>
      <div class="mb-5">
        <p-checkbox
          label="その他"
        ></p-checkbox>
      </div>
      <div class="mb-7">
        <p-input
          label="郵便番号"
        ></p-input>
      </div>
      <div class="mb-7">
        <p-input
          label="都道府県"
        ></p-input>
      </div>
      <div class="mb-7">
        <p-input
          label="市区町村"
        ></p-input>
      </div>
      <div class="mb-7">
        <p-input
          label="番地"
        ></p-input>
      </div>
      <div class="mb-7">
        <p-input
          label="建物名（任意）"
        ></p-input>
      </div>
      <div>
        <p-checkbox
          label="デフォルトの発送先に設定"
        ></p-checkbox>
      </div>
      <div>
        <p-checkbox
          label="発送先の住所を追加"
        ></p-checkbox>
      </div>
    </div>
    <div>
     
      <button
        @click="router.push({ name: 'StorePayment2' })"
        class="primary block mx-auto mb-3"
      >
        支払い方法を選択
      </button>
        
      <button>
        もどる
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import StoreStepper from './Stepper.vue'

export default defineComponent({
  components: {
    StoreStepper
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    return {
      route,
      router
    };
  }
})
</script>