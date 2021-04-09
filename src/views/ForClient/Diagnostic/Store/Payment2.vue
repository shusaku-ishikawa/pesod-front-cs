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
    <div class="flex flex-col flex-grow ">
      <store-stepper
        class="mb-10"
        :step="2"
      ></store-stepper>
      <div class="bg-gray-100">
        クレジットカード決済
      </div>
      <div class="text-left p-2">
        
        <div class="mb-3">
          <p-checkbox
            label="登録済みのカードを使用"
            v-model="useCurrentCard"
          
          ></p-checkbox>
        </div>
        <credit-card
          class="mb-5"
          
          v-if="defaultCard && useCurrentCard"
          :creditCard="defaultCard"
        ></credit-card>
        <div v-show="!useCurrentCard" class="mb-3">
          <div class="mb-5" ref="payjs" id="payjs">
            here
          </div>
          <!-- <div>
            <p-checkbox
              v-model="createAsDefault"
              label="カード情報を登録する"
            ></p-checkbox>
          </div> -->
        </div>
        <div>
          <button
            @click="onSubmit()"
            :disabled="(useCurrentCard && defaultCard == null)"
            class="bg-black text-white w-full block mx-auto mb-3"
          >
            次に進む
          </button>
          <button
            class="secondary w-full block mx-auto mb-3"
            @click="router.push({ name: 'StorePayment1' })"
          >
            もどる
          </button>
        </div>
      </div>
      
    </div>
  </base-layout>
</template>
<script>
import router from '@/router';
import { computed, defineComponent, onMounted, ref, useContext } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import StoreStepper from './Stepper.vue'
import usePayjp from '@/types/Payjp';
import CreditCard from './Payment2/CreditCard.vue';
import { create } from 'lodash';

export default defineComponent({
  components: {
    StoreStepper,
    CreditCard
  },
  emits: [
    'commit:payment'
  ],
  setup(props, context) {
    const route = useRoute();
    const router = useRouter();
    const payjs = ref(null);

    let PayJP = null;
    let cardElement = null;

    const {
      getPublicKey,
      fetchCards,
      createCard
    } = usePayjp();

    
    const cardCreated = ref(false);
    const createAsDefault = ref(true);
    const cards = ref(null);
    const defaultCard = computed(() => {
      if (cards.value == null) return;
      const c = cards.value.cards.find(c => c.id == cards.value.default_card)
      return c;
    })
    onMounted(async () => {
      const pubkey = await getPublicKey();
      cards.value = await fetchCards();
      console.log(cards.value)
      console.log(pubkey)
      const scriptTag = document.createElement('script');
      scriptTag.src = 'https://js.pay.jp/v2/pay.js';
      scriptTag.addEventListener('load', () => {
        
        /* eslint no-undef: 0 */
        PayJP = window.Payjp(pubkey.pub_key);
        const elements = PayJP.elements()

        // element(入力フォームの単位)を生成します
        cardElement = elements.create('card')
        cardElement.mount('#payjs');

      });
      if (payjs.value == null) return;
      payjs.value.appendChild(scriptTag);
      
    });
    const useCurrentCard = ref(false);
    
    const onSubmit = () => {
      if (useCurrentCard.value) {
        context.emit('commit:payment', defaultCard.value);
        return; 
      }
      if (PayJP == null || cardElement == null) return;
      PayJP.createToken(cardElement).then(async (r) => {
        if (r.error) {
          console.error(r.error.message)
          alert(r.error.message)
        } else {
          console.log(r.id);
          // create token
          const payload = {
            token: r.id,
            is_default: true
          }
          // alert(payload)
          try {
            const ret = await createCard(payload)
            console.log(ret)
          } catch (err) {
            const response = err.response;
            if (response) {
              const {status, data} = response;
              if (status == 400) {
                alert(JSON.stringify(data));
                return;
              }
            }
          }
          context.emit('commit:payment', ret)
        }
      });
      // r
    };
    
    
    return {
      route,
      router,
      payjs,
      onSubmit,
      useCurrentCard,
      cards,
      cardCreated,
      createAsDefault,
      defaultCard
    };
  }
})
</script>