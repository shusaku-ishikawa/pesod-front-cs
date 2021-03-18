<template>
  <div
    ref="container"
    class="h-screen pt-10 sm:pt-14 flex"
  >
    <navbar-for-doctor />
    <div
      class="sm:block overflow-y-auto sm:border-r border-gray-600 w-full sm:w-1/4"
      :class="{ 'block': activePage === 'left', 'hidden': activePage !== 'left' }"
    >
      <left-pane

        v-model="activePrescript"
        @page="onPage"
      ></left-pane>
    </div>
    <div
      class="sm:block flex-grow border-r border-gray-600 w-full sm:w-1/2"
      :class="{ 'block': activePage === 'main', 'hidden': activePage !== 'main' }"
    >
      <div
        v-if="activePrescript == null"
      >
        顧客を選択してください。
      </div>
      
      <main-pane
        v-else
        :prescript="activePrescript"
        @page="onPage"
      ></main-pane>
    </div>
    <div
      class=" sm:block overflow-y-auto w-full sm:w-1/4"
      :class="{ 'block': activePage === 'right', 'hidden': activePage !== 'right' }"
    >
      <div
        v-if="activePrescript == null"
      >
        顧客を選択してください。
      </div>
      
      <right-pane
        v-else
        @page="onPage"
        :prescript="activePrescript"
      ></right-pane>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import NavbarForDoctor from '@/components/NavbarForDoctor.vue';
import LeftPane from './Dashboard/LeftPane.vue';
import MainPane from './Dashboard/MainPane.vue';
import RightPane from './Dashboard/RightPane.vue';

import { useRoute, useRouter } from 'vue-router';
import useAuth from '@/types/Auth';
import useChatLog from '@/types/ChatLog';
import { IPrescript, IChatMessage } from "@/types/Interfaces";

export default defineComponent({
  components: {
    NavbarForDoctor,
    LeftPane,
    MainPane,
    RightPane
  },
  
  setup() {
    const container = ref<HTMLElement | null>(null);
    const activePage = ref('main');
    
    const route = useRoute();
    const router = useRouter();

    const {
      token
    } = useAuth();

    const activePrescript = ref<IPrescript | null>(null);
    
    // alert(JSON.stringify(prescript.value))
    
    

      
    
    onMounted(() => {
      if (container.value == null) return;
      container.value.style.height = window.innerHeight + 'px';  
    });

    const onPage = (event: string) => {
      activePage.value = event;
    }

    return {
      onPage,
      container,
      activePage,
      activePrescript
    };
  }
})
</script>
