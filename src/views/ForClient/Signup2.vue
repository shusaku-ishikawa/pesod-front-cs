<template>
  <base-layout>
    <template v-slot:title>
      <div class="relative">
        <svg
          @click="() => { router.push({ name: 'Signup1' }) }"
          class="absolute top-0 left-0 w-10 h-10 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        <div class="">
          新規登録
        </div>
      </div>
    </template>
    <div class="grid grid-cols-12">
      <form
        ref="form"
        class="py-5 col-span-12 sm:col-span-6 sm:col-start-4 md:col-span-4 md:col-start-5 p-5"
        @submit.prevent="onSubmit"
      >
        <div
          v-if="formError != ''"
          class="mb-5 text-red-600"
        >
          {{ formError }}
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
        
        
        <div
          class="text-center"
        >
          <button
            :disabled="loading"
            type="submit"
            class="primary arrow w-64 mb-10"
          >
            確認メールを送信
            
          </button>
          <div>
            <a class="cursor-pointer ">確認メールが届かない場合は？</a>
          </div>
        </div>
      </form>
    </div>
  </base-layout>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref,  } from 'vue';
import { useRouter } from 'vue-router';
import { ILogin, ISignup } from '@/types/Interfaces';
import {formRequired} from '@/mixins/FormValidator';

import useAuth from '@/types/Auth';

export default defineComponent({
  components: {
  },
  setup() {
    const router = useRouter();
    
    const {
      getToken,
      removeToken,
      sendSignupEmail
    } = useAuth();

    const formData = ref({
      email: '',
    });
    
    const form = ref<HTMLFormElement | null>(null);

    const formError = ref<string>('');
    
    const setFromError = (message: string) => {
      formError.value = message;
      window.setTimeout(() => {
        formError.value = '';
      }, 5000);  
    };
    
    onMounted(() => {
      removeToken();
    });

    const loading = ref(false);

    const onSubmit = async (event: Event) => {
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
        const data = await sendSignupEmail(formData.value);
        if (data.is_send) {
          router.push({ name: 'Signup3', params: { email: formData.value.email } });  
        } else {
          alert(data.message)
        }
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
      router,
      loading,
      form,
      formRequired,
      formData,
      formError,
      // formValid,
      onSubmit
    };
  }
})
</script>