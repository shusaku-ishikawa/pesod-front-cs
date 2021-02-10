<template>
  <base-layout>
    <template v-slot:title>
      <page-title>
        購入
      </page-title>
    </template>
    <div class="flex flex-col flex-grow">
      <store-stepper
        class="mb-5"
        :step="2"
      ></store-stepper>
      <div class="border-b border-t">
        支払い方法を選択
      </div>
      <div class="text-left p-2">
        
        <div>
          <p-checkbox
            label="登録済みのカードを使用"
          ></p-checkbox>
        </div>
        <div class="mb-5">
          <p-checkbox
            label="その他"
          ></p-checkbox>
        </div>
        <div class="mb-5" ref="payjs" id="payjs">
          here
        </div>
        <div>
          <p-checkbox
            label="カード情報を登録する"
          ></p-checkbox>
        </div>
      </div>
      <div>
        <button
          @click="onSubmit()"
          class="primary block mx-auto mb-3"
        >
          最終確認にすすむ
        </button>
        <button>
          もどる
        </button>
      </div>
    </div>
  </base-layout>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import StoreStepper from './Stepper.vue'

export default defineComponent({
  components: {
    StoreStepper
  },
  setup() {
    const route = useRoute();

    const payjs = ref(null);

    let PayJP = null;
    let cardElement = null;
    onMounted(() => {
      const scriptTag = document.createElement('script');
      scriptTag.src = 'https://js.pay.jp/v2/pay.js';
      scriptTag.addEventListener('load', () => {
        alert('loaded')
        // // elementsを取得します。ページ内に複数フォーム用意する場合は複数取得ください
        
        /* eslint no-undef: 0 */
        PayJP = window.Payjp('pk_test_777137856c4d8eba2c2ea6df');
        const elements = PayJP.elements()

        // element(入力フォームの単位)を生成します
        cardElement = elements.create('card')
        cardElement.mount('#payjs');

      });
      if (payjs.value == null) return;
      payjs.value.appendChild(scriptTag);
      
    });
    const onSubmit = () => {
      if (PayJP == null || cardElement == null) return;
      PayJP.createToken(cardElement).then((r) => {
        if (r.error) {
          alert(r.error.message)
        } else {
          alert(r.id);
        }
      });
    };
    return {
      route,
      payjs,
      onSubmit
    };
  }
})
</script>