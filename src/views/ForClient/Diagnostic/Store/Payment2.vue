<template>
  <base-layout>
    <template v-slot:title>
      <div class="">
        <svg
          @click="() => { router.push({ name: 'DiagnosticTop' }) }"
          class="h-6 w-6 left-1 cursor-pointer absolute "
          xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        
        </svg>
        <div>
          定期購入の申し込み
        </div>
      </div>
    </template>
    <div class="flex flex-col flex-grow ">
      <div class="" style="padding: 20px 30px">
        <img src="@/assets/img/store/pay_list02.png" alt="">
      </div>
      <div class="bg-gray-100 text-left" style="height: 30px; padding-left: 30px; line-height: 30px">
        クレジットカード決済
      </div>
      <div class="text-left" style="padding: 30px 30px">
        
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
        <div v-show="!useCurrentCard" class="" style="padding-bottom: 50px">
          <div class="mb-5" ref="payjs" id="payjs">
            
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
            :disabled="(useCurrentCard && defaultCard == null) || loading"
            class="image mb-3"
          >
             <img v-if="(useCurrentCard && defaultCard == null) || loading" src="@/assets/img/store/pay_next_off.png" alt="">
             <img v-else src="@/assets/img/store/pay_next_on.png" alt="">
             
             
          </button>
          <button
            class="image"
            style="margin-bottom: 50px"
            @click="router.push({ name: 'StorePayment1' })"
          >
            <img src="@/assets/img/store/pay_back_long.png" alt="">
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
    // StoreStepper,
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
    
    const loading = ref(false);
    const onSubmit = () => {
      if (useCurrentCard.value) {
        context.emit('commit:payment', defaultCard.value);
        return; 
      }
      if (PayJP == null || cardElement == null) return;
      loading.value = true;
      PayJP.createToken(cardElement).then(async (r) => {
        if (r.error) {
          console.error(r.error)
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
            const card = ret.cards.find(c => c.id == ret.default_card)
            context.emit('commit:payment', card)
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
          
        }
        loading.value = false;
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
      defaultCard,
      loading
    };
  }
})
</script>