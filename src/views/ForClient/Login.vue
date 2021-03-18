<template>
  <top-layout>
    <template v-slot:title>
      <div class="relative">
        <router-link
          :to="{ name: 'Lp' }"
          v-slot="{ href, navigate }"
        >
          <svg
            :href="href"
            @click="navigate"
            class="absolute top-0 left-0 w-10 h-10 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </router-link>
        <div class="">
          ログイン
        </div>
      </div>
    </template>
    <div class="grid grid-cols-12">
      
      <form
        :disabled="loading"
        ref="from"
        method="post"
        class="py-5 col-span-12 sm:col-span-6 sm:col-start-4 md:col-span-4 md:col-start-5 p-5 "
        @submit.prevent="onLogin"
      >
        <div
          v-if="loginError != ''"
          class="mb-5 text-red-600"
        >
          {{ loginError }}
        </div>
        <p-input
          class="mb-10"
          label="メールアドレス"
          id="email"
          type="email"
          :required="true"
          autocomplete="email"
          v-model="formData.email"
          :rules="[formRequired]"
        >
        </p-input>
        <p-input
          class="mb-12"
          label="パスワード"
          autocomplete="current-password"
          id="password"
          type="password"
          v-model="formData.password"
          :rules="[formRequired]"
        >
        </p-input>
        <div
          class="text-center"
        >
          
          <button
            :disabled="loading"
            type="submit"
            class="primary arrow w-64 mb-10"
          >
            ログイン
            
          </button>
          <div>
            <a class="cursor-pointer ">パスワードをお忘れの方はこちら</a>
          </div>
        </div>
      </form>
    </div>
  </top-layout>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ILogin } from '@/types/Interfaces';
import {formRequired} from '@/mixins/FormValidator';

import useAuth from '@/types/Auth';
import usePrescript from '@/types/Prescript';

export default defineComponent({
  components: {
  },
  setup() {
    const router = useRouter();

    const {
      token,
      getToken,
      getUserId,
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
      token.value = null;
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
        const tokenData = await getToken(formData.value);
        token.value = tokenData;
        
        router.push({ name: 'DiagnosticTop' }) ;
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
    return {
      loading,
      form,
      formRequired,
      formData,
      loginError,
      // formValid,
      onLogin
    };
  }
})
</script>