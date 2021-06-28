<template>
  <div class="h-10 sm:h-14 fixed top-0 left-0 z-50 shadow w-full bg-blue-300  text-white">
    
    <div class="relative h-full flex items-center px-10">
      <div class="">
        <img src="@/assets/img/Pesod_logo_doctor_s.png" alt="">
        <!-- <pix-cardio-logo /> -->
      </div>
      
      <div v-if="profile != null" class="relative flex items-center ml-auto">
        <div>ようこそ {{ profile.first_name }} {{ profile.last_name }} 様</div>
        <div>  
          <svg
            @focus="showDrawer = true"
            @blur="onBlur"
            class="h-6 w-6 ml-5 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
          </svg>
          <div v-if="showDrawer" class="absolute right-0">
            <ul
              class="shadow-lg whitespace-nowrap text-sm"
            >
              <li
                v-for="(m, i) in menu"
                :key="i"
                @click="showDrawer = true && router.push({ name: m.route })"
                class="w-48 cursor-pointer bg-white text-gray-600 px-3 py-1 border-b"
              >
                {{ m.text }}
              </li>
              
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import useAuth from '@/types/Auth';

export default defineComponent({
  components: {
  },
  setup() {
    const router = useRouter();

    const {
      profile,
      isLoggedIn
    } = useAuth('doctor');

    const showDrawer = ref(false);

    const menu = [
      {
        route: 'DoctorLogin',
        text: 'ログアウト'
      },
    ]
    const onBlur = () => {
      window.setTimeout(() => {
        showDrawer.value = false
      }, 100)
    }
    return {
      menu,
      router,
      profile,
      showDrawer,
      onBlur,
      isLoggedIn,
    }
  }
})
</script>
