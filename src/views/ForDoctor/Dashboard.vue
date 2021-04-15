<template>
  <div
    ref="container"
    class="h-screen pt-10 sm:pt-14 flex"
  >
    <navbar-for-doctor />
    <splitpanes
      class="default-theme"
      
    >
      <pane
        class="sm:block overflow-y-auto  w-full sm:w-1/4"
        :class="{ 'block': activePage === 'left', 'hidden': activePage !== 'left' }"
      >
        <left-pane

          v-model="activePrescript"
          @page="onPage"
        ></left-pane>
      </pane>
      <pane
        class="sm:block flex-grow  w-full sm:w-1/2"
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
      </pane>
      <pane
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
      </pane>
    </splitpanes>
    
  </div>
</template>
<style scoped>
  .splitpanes--vertical>.splitpanes__splitter {
    min-width: 6px!important;
    background: linear-gradient(90deg, #ccc, #111);
  }

  /* .splitpanes--horizontal > .splitpanes__splitter {
    min-height: 6px;
    background: linear-gradient(0deg, #ccc, #111);
  } */
  .splitpanes.default-theme .splitpanes__pane {
    background-color: white;
  }
</style>
<script lang="js">
import { defineComponent, onMounted, ref } from "vue";
import NavbarForDoctor from '@/components/NavbarForDoctor.vue';
import LeftPane from './Dashboard/LeftPane.vue';
import MainPane from './Dashboard/MainPane.vue';
import RightPane from './Dashboard/RightPane.vue';

import { useRoute, useRouter } from 'vue-router';
import useAuth from '@/types/Auth';
import useChatLog from '@/types/ChatLog';
import { IPrescript, IChatMessage } from "@/types/Interfaces";
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

export default defineComponent({
  components: {
    NavbarForDoctor,
    LeftPane,
    MainPane,
    RightPane,
    Splitpanes,
    Pane
  },
  
  setup() {
    const container = ref(null);
    const activePage = ref('main');
    
    const route = useRoute();
    const router = useRouter();

    const {
      getToken
    } = useAuth();

    const activePrescript = ref(null);
    
    // alert(JSON.stringify(prescript.value))
    
    

      
    
    onMounted(() => {
      if (container.value == null) return;
      // container.value.style.height = window.innerHeight + 'px';  
    });

    const onPage = (event) => {
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
