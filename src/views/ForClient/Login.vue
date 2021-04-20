<template>
  <base-layout>
    <template v-slot:title>
      <div class="relative">
        <router-link
          :to="{ name: 'Lp' }"
          v-slot="{ href, navigate }"
        >
          <svg
            :href="href"
            @click="navigate"
            class="absolute top-0 left-1 w-6 h-6 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </router-link>
        <div class="">
          ログイン
        </div>
      </div>
    </template>
    <div class="" style="padding: 0px 20px">
      <div class="" style="margin-top: 40px">
        <img
          class="mx-auto mb-12"
          style="width: 60px"
          src="@/assets/img/pesod_logo_s.png"
          alt=""
          
        >
      </div>
      <form
        :disabled="loading"
        ref="from"
        method="post"
        class="py-5 p-5 "
        @submit.prevent="onLogin"
      >
        <div
          v-if="loginError != ''"
          class="mb-5 text-red-600"
        >
          {{ loginError }}
        </div>
        <p-input
          class="mb-10 leading-8"
          label="メールアドレス"
          placeholder="sample@pesod.co.jp"
          id="email"
          type="email"
          :required="true"
          autocomplete="email"
          v-model="formData.email"
          :rules="[formRequired]"
        >
        </p-input>
        <p-input
          class="mb-12 leading-8"
          label="パスワード"
          placeholder="英数字8文字以上で入力"
          autocomplete="current-password"
          id="password"
          :type="isPasswordHidden ? 'password' : 'text'"
          v-model="formData.password"
          :rules="[formRequired]"
        >
        </p-input>
        <div class="w-100 text-right">
          <button
            :disabled="loading"
            type="button"
            class="image text-right relative"
            style="top: -80px;"
          >
            <img
              v-if="!isPasswordHidden"
              @click="isPasswordHidden = true"
              src="@/assets/img/pass_eye.png" alt=""> 
            <img
              v-else
              @click="isPasswordHidden = false"
              src="@/assets/img/pass_eye_on.png" alt=""> 
            
            </button>
        </div>
        <div
          class="text-center"
        >

          
          <button
            :disabled="loading"
            type="submit"
            class="image w-60 mb-8"
          >
            <img
              src="@/assets/img/top_login_btn.png" alt=""> 
              
            </button>
          <div>
            <a class="cursor-pointer text-sm"><u>パスワードをお忘れの方はこちら</u></a>
          </div>
        </div>
      </form>
    </div>
  </base-layout>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ILogin } from '@/types/Interfaces';
import {formRequired} from '@/mixins/FormValidator';

import useAuth from '@/types/Auth';
import usePrescript from '@/types/Prescript';
import StoreVue from './Diagnostic/Store.vue';

export default defineComponent({
  components: {
  },
  setup() {
    const router = useRouter();

    const {
      createToken,
      removeToken,
      storeToken,
    } = useAuth();
    const {
      getPrescript
    } = usePrescript();
    
    const formData = ref<ILogin>({
      email: '',
      password: '' 
    });
    
    const form = ref<HTMLFormElement | null>(null);

    const loginError = ref<string>('');
    
    const setLoginError = (message: string) => {
      loginError.value = message;
      window.setTimeout(() => {
        loginError.value = '';
      }, 5000);  
    };
    
    onMounted(() => {
      removeToken();
    });

    const loading = ref(false);

    const onLogin = async (event: Event) => {
      // validate
      if (form.value) {
        const isValid = form.value.checkValidity();
        if (!isValid) {
          alert('not vaida')
          return;
        }
      }
      try {
        loading.value = true;
        const tokenData = await createToken(formData.value);
        storeToken(tokenData);
        router.push({ name: 'Top' }) ;
      } catch (err) {
        console.log(err)
        if (err.response) {
          const { status, data } = err.response;
          
          if (status >= 400 && status < 500) {
            alert(JSON.stringify(data))
            setLoginError('ログインに失敗しました。')
          } else {
            setLoginError(JSON.stringify(data))
          }
          // formData.value = {
          //   email: '',
          //   password: ''
          // }
        } else {
          // network error or timeout
          setLoginError(JSON.stringify(err))
        }
        
      }
      loading.value = false;
    };
    const isPasswordHidden = ref(true);
    
    return {
      loading,
      form,
      formRequired,
      formData,
      loginError,
      // formValid,
      onLogin,
      isPasswordHidden
    };
  }
})
</script>