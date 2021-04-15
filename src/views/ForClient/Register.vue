<template>
  <base-layout>
    <template v-slot:title>
      <div class="relative">
        <!-- <svg
          class="absolute top-0 left-0 w-10 h-10"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg> -->
        <div class="">
          会員登録
        </div>
      </div>
    </template>
    <form
      ref="form"
      @submit.prevent="onSubmit"
      :disabled="loading"
    >
      <div
        v-if="formError != ''"
        class="mb-5 text-red-600"
      >
        {{ formError }}
      </div>
      <div class="grid grid-cols-12 gap-2">
        <div class="col-span-6 mb-10">
          <p-input
            label="姓"
            type="text"
            :required="true"
            autocomplete="first_name"
            v-model="formData.first_name"
            :rules="[formRequired]"
          ></p-input>
        </div>
        <div class="col-span-6">
          <p-input
            label="名"
            type="text"
            :required="true"
            autocomplete="last_name"
            v-model="formData.last_name"
            :rules="[formRequired]"
          ></p-input>
        </div>
        <div class="col-span-6 mb-10">
          <p-input
            label="姓かな"
            type="text"
            :required="true"
            autocomplete="first_kana"
            v-model="formData.first_kana"
            :rules="[formRequired]"
          ></p-input>
        </div>
        <div class="col-span-6">
          <p-input
            label="名かな"
            type="text"
            :required="true"
            autocomplete="last_kana"
            v-model="formData.last_kana"
            :rules="[formRequired]"
          ></p-input>
        </div>
        <div class="col-span-12 mb-10">
          <p-input
            label="郵便番号"
            type="text"
            :required="true"
            autocomplete="zip_code"
            v-model="formData.zip_code"
            :rules="[formRequired, getRegexpTester('^[0-9]{7}', '7桁の数値を入力してください。')]"
          ></p-input>
        </div>
        <div class="col-span-12 mb-10">
          <p-input
            label="都道府県"
            type="text"
            :required="true"
            autocomplete="prefecture"
            v-model="formData.prefecture"
            :rules="[formRequired]"
            
          ></p-input>
        </div>
        <div class="col-span-12 mb-10">
          <p-input
            label="市区町村"
            type="text"
            :required="true"
            autocomplete="city"
            v-model="formData.city"
            :rules="[formRequired]"
          ></p-input>
        </div>
        <div class="col-span-12 mb-10">
          <p-input
            label="番地"
            type="text"
            :required="true"
            autocomplete="street"
            v-model="formData.street"
            :rules="[formRequired]"
          ></p-input>
        </div>
        <div class="col-span-12 mb-10">
          <p-input
            label="建物名（任意）"
            type="text"
            autocomplete="building"
            v-model="formData.building"
            :rules="[]"
          ></p-input>
        </div>
        <div class="col-span-12 mb-10">
          <p-input
            label="電話番号"
            type="text"
            :required="true"
            autocomplete="phone_number"
            v-model="formData.phone_number"
            :rules="[formRequired, getRegexpTester('^[0-9]{10,15}', '10桁以上15桁以下の数値を入力してください。')]"
          ></p-input>
        </div>
        <div class="col-span-12 mb-10">
          <p-input
            label="生年月日"
            type="text"
            :required="true"
            autocomplete="birthday"
            v-model="formData.birthday"
            :rules="[formRequired, getRegexpTester('^[0-9]{4}\-[0-9]{1,2}\-[0-9]{1,2}', 'YYYY-MM-DDの形式で入力してください。')]"
          ></p-input>
        </div>
        <div class="col-span-12 mb-10">
          <p-input
            label="パスワード"
            type="password"
            :required="true"
            autocomplete="password"
            v-model="formData.password"
            :rules="[formRequired]"
          ></p-input>
        </div>
        <div class="col-span-12 mb-10">
          <gender-selector
            v-model="formData.gender"
          ></gender-selector>
        
        </div>
        <div
          class="col-span-12 mb-10"
        >
          <button
            type="submit"
            class="primary w-64 mb-10"
          >
            <div class="inline-block">
              次にすすむ
            </div>
            <svg
            class=" w-6 h-6 float-right"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
          <div
            class="cursor-pointer"
          >
            お問い合わせはこちら
          </div>
        </div>
          
      </div>
    </form>
  </base-layout>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {formRequired, getRegexpTester} from '@/mixins/FormValidator';
import GenderSelector from './RegistrationGenderSelector.vue';

import useAuth from '@/types/Auth';
import { IRegistration } from '@/types/Interfaces'

export default defineComponent({
  components: {
    GenderSelector
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const token: string = route.params.token.toString();
    
    const {
      activateAccount,
      registerProfile
    } = useAuth();

    const formData = ref<IRegistration>({
      first_name: '',
      last_name: '',
      first_kana: '',
      last_kana: '',
      phone_number: '',
      gender: 0,
      birthday: '',
      prefecture: '',
      city: '',
      street: '',
      building: '',
      zip_code: '',
      password: '',
    });

    const form = ref<HTMLFormElement | null>(null);    
    const formError = ref<string>('');
    
    const setFromError = (message: string) => {
      formError.value = message;
      window.setTimeout(() => {
        formError.value = '';
      }, 5000);  
    };

    const loading = ref(false);

    let registrationUrl: string | null = null;

    onMounted(async () => {
      // activate 
      try {
        const data = await activateAccount(token);
        registrationUrl = data.registration_url;
      } catch (err) {
        const {response} = err;
        if (response) {
          const {status, data} = response;
          console.error(data)
        } else {
          alert('error')
        }
        alert('failed to activate account')
        return;
        
      }
    });

    const onSubmit = async (event: Event) => {
      if (registrationUrl == null) return;
      // validate
      if (form.value) {
        const isValid = form.value.checkValidity();
        if (!isValid) {
          alert('not vaida')
          return;
        }
      }
      try {
        const data = await registerProfile(registrationUrl, formData.value);
        const accessToken = { access: data.access, refresh: data.refresh };
        window.localStorage.setItem('token', JSON.stringify(accessToken));
        router.push({ name: 'DiagnosticTop' })
      } catch (err) {
        console.log(err)
        if (err.response) {
          const { status, data } = err.response;
          console.log(data)
         
          setFromError(JSON.stringify(data))
         
        } else {
          setFromError('ネットワークエラー')
        }
        
      }
      loading.value = false;
      
    };

    return {
      form,
      formData,
      formError,
      formRequired,
      getRegexpTester,
      onSubmit,
    };
  }
})
</script>