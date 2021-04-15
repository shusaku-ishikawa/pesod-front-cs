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
    <div class="flex flex-col flex-grow pb-5">
      <div class="" style="padding: 20px 30px">
        <img src="@/assets/img/store/pay_list01.png" alt="">
      </div>
      <div class="bg-gray-100 text-left" style="height: 30px; padding-left: 30px; line-height: 30px">
        配送先情報の設定
      </div>
      <div class="text-left p-2">
        <!-- <div>
          <p-checkbox
            label="プロフィールの住所に発送"
            v-model="useRegisteredInfo"
          ></p-checkbox>
        </div> -->
        <!-- <div class="mb-5">
          <p-checkbox
            label="その他"
          ></p-checkbox>
        </div> -->
      </div>
      <div
        class=" pt-5"
        style="padding: 0px 30px;"
      >
        <div>
          <form 
            ref="form"
          >
             <div class="mb-7 text-left">
              <label class="text-sm font-semibold" for="atena">お宛名</label>
              <input
                class="block w-full border-b"
                id="atena"
                :value="delivery.receiver"
                type="text"
                disabled
                style="line-height: 40px; font-size: 20px"
              >
             
            </div>
            <div class="mb-7">
              <p-input
                label="郵便番号(ハイフンなし数字7桁)"
                type="text"
                :required="true"
                autocomplete="zip_code"
                :modelValue="delivery.zip_code"
                @update:modelValue="updateValue('zip_code', $event)"
                :error="errors.zip_code"
              ></p-input>
            </div>
            <div class="mb-7">
              <p-input
                label="都道府県"
                type="text"
                :required="true"
                autocomplete="prefecture"
                :modelValue="delivery.prefecture"
                @update:modelValue="updateValue('prefecture', $event)"
                :error="errors.prefecture"
              ></p-input>
            </div>
            <div class="mb-7">
              <p-input
                label="市区町村"
                type="text"
                :required="true"
                autocomplete="city"
                :modelValue="delivery.city"
                @update:modelValue="updateValue('city', $event)"
                :error="errors.city"
              ></p-input>
            </div>
            <div class="mb-7">
              <p-input
                label="番地以降"
                type="text"
                :required="true"
                autocomplete="street"
                :modelValue="delivery.address"
                @update:modelValue="updateValue('address', $event)"
                :error="errors.address"
              ></p-input>
            </div>
            <div class="mb-7">
              <p-input
                label="電話番号(ハイフンなし数字15桁以内)"
                type="text"
                autocomplete="phone"
                :modelValue="delivery.phone_number"
                @update:modelValue="updateValue('phone_number', $event)"
                :error="errors.phone_number"
              ></p-input>
            </div>
            <div class="mb-7 text-left">
              <p-select
                label="配送希望時間"
                :modelValue="delivery.deliv_time"
                @update:modelValue="updateValue('deliv_time', $event)"
                :error="errors.deliv_time"
                :options="delivTimes"
              ></p-select>
              
            </div>
            <!-- <div class="text-left">
              <p-checkbox
                label="デフォルトの発送先に設定"
              ></p-checkbox>
            </div>
            <div class="text-left mb-5">
              <p-checkbox
                label="発送先の住所を追加"
              ></p-checkbox>
            </div> -->
          </form>
        </div>
        
          
        <button
          :disabled="!validate()"
          @click="onCommitDelivery"
          class="image mb-3"
        >
          <img v-if="validate()" src="@/assets/img/store/pay_next_on.png" alt="">
          <img v-else src="@/assets/img/store/pay_next_off.png" alt="">
        
        </button>
        <button
          class="image"
          style="margin-bottom: 50px"
          @click="router.push({ name: 'StoreProductList' })"
        >
          <img src="@/assets/img/store/pay_back_long.png" alt="">
        </button>
      </div>
      
      <!-- </div> -->
    </div>
  </base-layout>
  
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, SetupContext, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {formRequired, getRegexpTester} from '@/mixins/FormValidator';

import usePrescript from '@/types/Prescript';
import StoreStepper from './Stepper.vue'
import { IDelivery, IDeliveryValidator } from '@/types/Interfaces'
import { has } from 'lodash';

export default defineComponent({
  components: {
    // StoreStepper
  },
  emits: [
    'update:delivery'
  ],
  props: {
    delivery: {
      type: Object as () => IDelivery
    },
    deliveryValidator: {
      type: Object as () => IDeliveryValidator
    }
  },
  setup(props: any, context: SetupContext) {
    const route = useRoute();
    const router = useRouter();
    
    const {
      myPrescript,
      getPrescript
    } = usePrescript();

    const delivTimes = [
      {
        value: 0,
        text: '指定なし'
      },
      {
        value: 1,
        text: '午前中'
      },
      {
        value: 12,
        text: '12:00～14:00'
      },
      {
        value: 14,
        text: '14:00～16:00'
      },
      {
        value: 16,
        text: '16:00～18:00'
      },
      {
        value: 18,
        text: '18:00～20:00'
      },
      {
        value: 19,
        text: '19:00～21:00'
      }
    ]
    const useRegisteredInfo = ref(false);

    const form = ref<HTMLFormElement | null>(null);
    
    const errors = ref<any>({
      receiver: '',
      prefecture: '',
      city: '',
      address: '',
      phone_number: '',
      deliv_time: '',
      zip_code: ''
    })
    const updateValue = (key: string, value: string) => {
      context.emit('update:delivery', { ...props.delivery, [key]: value })
    }
    // const onUpdateDelivery = () => {
    //   interface IProfileDelivery{
    //     zip_code: string;
    //     prefecture: string;
    //     city: string;
    //     address: string;
    //   }
    //   if (useRegisteredInfo.value) {
    //     console.log('hoge')
    //     if (myPrescript.value == null) return;
    //     console.log(myPrescript.value.customer)
    //     const registeredDeliveryInfo: IProfileDelivery = {
    //       zip_code: myPrescript.value.customer.zip_code,
    //       prefecture: myPrescript.value.customer.prefecture,
    //       city: myPrescript.value.customer.city,
    //       address: myPrescript.value.customer.address
    //     }
    //     context.emit('update:delivery', registeredDeliveryInfo)
    //   } else {
    //     // validation
    //     if (form.value) {
    //       const valid = form.value.reportValidity();
    //       if (!valid) {
    //         return;
    //       }
    //     }
    //     const formDataTrimmed: IProfileDelivery = {
    //       zip_code: formData.value.zip_code,
    //       prefecture: formData.value.prefecture,
    //       city: formData.value.city,
    //       address: `${formData.value.street}${formData.value.building}`
    //     }
    //     context.emit('update:delivery', formDataTrimmed)
    //   }
    // }
    const validate = (): boolean => {
      console.log('validate')
      let hasError = false;

      for (const key in props.deliveryValidator) {
        const validators = props.deliveryValidator[key];
        let fieldError = '';
        validators.map((v: Function) => {
          const error = v(props.delivery[key]);
          if (error && !fieldError) fieldError = error;
        })
        errors.value[key] = fieldError;
        if (fieldError) hasError = true;
      }
      return !hasError;
    }
    watch(() => props.delivery, () => {
      validate();
    });

    onMounted(async () => {
      myPrescript.value = await getPrescript();
      if (myPrescript.value == null) return;
      console.log(myPrescript.value.customer)
      const customer = myPrescript.value.customer;
     
    })
    
    const onCommitDelivery = () => {
      if (!validate()) return;
      context.emit('commit:delivery')
    }
    return {
      validate,
      onCommitDelivery,
      updateValue,
      useRegisteredInfo,
      route,
      router,
      form,
      errors,
      delivTimes
    };
  }
})
</script>