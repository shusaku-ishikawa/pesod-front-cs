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
        :step="1"
      ></store-stepper>
      <div class="border-b border-t">
        配送先を選択
      </div>
      <div class="text-left p-2">
        <div>
          <p-checkbox
            label="プロフィールの住所に発送"
            v-model="useRegisteredInfo"
          ></p-checkbox>
        </div>
        <!-- <div class="mb-5">
          <p-checkbox
            label="その他"
          ></p-checkbox>
        </div> -->
      </div>
      <div
        class="px-3 pt-5"
      >
        <div v-if="!useRegisteredInfo">
          <form 
            ref="form"
          >

            <div class="mb-7">
              <p-input
                label="郵便番号"
                type="text"
                :required="true"
                autocomplete="zip_code"
                v-model="formData.zip_code"
                :rules="[formRequired, getRegexpTester('^[0-9]{7}', '7桁の数値を入力してください。')]"
              ></p-input>
            </div>
            <div class="mb-7">
              <p-input
                label="都道府県"
                type="text"
                :required="true"
                autocomplete="prefecture"
                v-model="formData.prefecture"
                :rules="[formRequired]"
              ></p-input>
            </div>
            <div class="mb-7">
              <p-input
                label="市区町村"
                type="text"
                :required="true"
                autocomplete="city"
                v-model="formData.city"
                :rules="[formRequired]"
              ></p-input>
            </div>
            <div class="mb-7">
              <p-input
                label="番地"
                type="text"
                :required="true"
                autocomplete="street"
                v-model="formData.street"
                :rules="[formRequired]"
              ></p-input>
            </div>
            <div class="mb-7">
              <p-input
                label="建物名（任意）"
                type="text"
                autocomplete="building"
                v-model="formData.building"
                :rules="[]"
              ></p-input>
            </div>
            <div class="text-left">
              <p-checkbox
                label="デフォルトの発送先に設定"
              ></p-checkbox>
            </div>
            <div class="text-left mb-5">
              <p-checkbox
                label="発送先の住所を追加"
              ></p-checkbox>
            </div>
          </form>
        </div>
        
          
        <button
          @click="onUpdateDelivery"
          class="primary block mx-auto mb-3"
        >
          支払い方法を選択
        </button>
      </div>
      <button
        @click="router.push({ name: 'StoreProductList' })"
      >
        もどる
      </button>
      <!-- </div> -->
    </div>
  </base-layout>
  
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, SetupContext } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {formRequired, getRegexpTester} from '@/mixins/FormValidator';

import usePrescript from '@/types/Prescript';
import StoreStepper from './Stepper.vue'
import { IDelivery } from '@/types/Interfaces'

export default defineComponent({
  components: {
    StoreStepper
  },
  emits: [
    'update:delivery'
  ],
  setup(_, context: SetupContext) {
    const route = useRoute();
    const router = useRouter();
    
    const {
      myPrescript,
      getPrescript
    } = usePrescript();

    const useRegisteredInfo = ref(true);

    const form = ref<HTMLFormElement | null>(null);
    const formData = ref<IDelivery>({
      prefecture: '',
      city: '',
      street: '',
      building: '',
      zip_code: '',
      address: '',
    });
    
    const onUpdateDelivery = () => {
      interface IProfileDelivery{
        zip_code: string;
        prefecture: string;
        city: string;
        address: string;
      }
      if (useRegisteredInfo.value) {
        console.log('hoge')
        if (myPrescript.value == null) return;
        console.log(myPrescript.value.customer)
        const registeredDeliveryInfo: IProfileDelivery = {
          zip_code: myPrescript.value.customer.zip_code,
          prefecture: myPrescript.value.customer.prefecture,
          city: myPrescript.value.customer.city,
          address: myPrescript.value.customer.address
        }
        context.emit('update:delivery', registeredDeliveryInfo)
      } else {
        // validation
        if (form.value) {
          const valid = form.value.reportValidity();
          if (!valid) {
            return;
          }
        }
        const formDataTrimmed: IProfileDelivery = {
          zip_code: formData.value.zip_code,
          prefecture: formData.value.prefecture,
          city: formData.value.city,
          address: `${formData.value.street}${formData.value.building}`
        }
        context.emit('update:delivery', formDataTrimmed)
      }
    }
    onMounted(async () => {
      myPrescript.value = await getPrescript();
    })
    return {
      useRegisteredInfo,
      route,
      router,
      form,
      formData,
      formRequired,
      getRegexpTester,
      onUpdateDelivery
    };
  }
})
</script>