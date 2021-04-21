<template>
  
  <div class="bg-image h-screen w-screen table-cell align-middle">
    <div class="mx-auto rounded p-5 w-80">
      <img
        src="@/assets/img/doctor/pesod_logo_doctor.png"
        alt=""
        class="mb-5"
      >
      <form
        class=" "
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
    
  </div>
</template>
<style scoped>
  .bg-image {
    background-image: url(/img/top_bk_PC.png);
    background-size: contain;
  }
</style>
<script lang="ts">
import { defineComponent, ref, onMounted, isProxy } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ILogin } from '@/types/Interfaces';

import {formRequired} from '@/mixins/FormValidator';

import useAuth from '@/types/Auth';
import useDoctor from '@/types/Doctor';
import { remove } from 'lodash';

export default defineComponent({
  components: {
  },
  setup() {
    const router = useRouter();

    const {
      createToken,
      storeToken,
      removeToken,
      getUserId,
      getProfile,
      storeProfile,
      removeProfile,
      getProfileFromLS
    } = useAuth('doctor');
    
    const {
      getDoctor
    } = useDoctor('doctor');

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
      removeToken()
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
        const token = await createToken(formData.value);
        storeToken(token);
        const userId = await getUserId();
        // const profile = await getPro(userId);
        // console.log(profile)
        // storeProfile(profile)

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