<template>
  <top-layout>
    <template v-slot:title>
      <div class="relative sm:hidden">
        
        <svg
          @click="() => { router.push({ name: 'DoctorLp' }) }"
          class="absolute top-0 left-0 w-10 h-10"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        <div class="">
          ログイン
        </div>
      </div>
      <div class="hidden sm:flex items-center justify-center font-semibold">
        <div class="text-6xl text-black">
          Persona
        </div>
        <div class="text-4xl bg-black px-3 py-2 text-white ml-2">
          For Doctor
        </div>
      </div>
    </template>
    <div class="grid grid-cols-12">
      <form
        class="py-5 col-span-12 sm:col-span-6 sm:col-start-4 md:col-span-4 md:col-start-5 rounded p-5 "
        :disabled="loading"
        ref="from"
        method="post"
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
            class="primary mb-10 w-72 sm:block sm:w-full"
          >
            <div class="inline-block">
              ログイン
            </div>
            <svg
            class=" w-6 h-6 float-right"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
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
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ILogin } from '@/types/Interfaces';

import {formRequired} from '@/mixins/FormValidator';

import useAuth from '@/types/Auth';
import useDoctor from '@/types/Doctor';

export default defineComponent({
  components: {
  },
  setup() {
    const router = useRouter();

    const {
      getToken,
      getUserId,
    } = useAuth();
    
    const {
      getDoctor
    } = useDoctor();

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
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('profile');
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
        const token = await getToken(formData.value);
        window.localStorage.setItem('token', JSON.stringify(token));
        const userId = await getUserId();
        const profile = await getDoctor(userId);
        console.log(profile)
        window.localStorage.setItem('profile', JSON.stringify(profile));

        router.push({ name: 'DoctorDashboard' }) ;
      } catch (err) {
        console.log(err)
        if (err.response) {
          const { status, data } = err.response;
          console.log(data)
          if (status >= 400 && status < 500) {
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
          setLoginError('ネットワークエラー')
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