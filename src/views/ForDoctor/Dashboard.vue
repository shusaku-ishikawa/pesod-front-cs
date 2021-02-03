<template>
  <div
    class="h-screen pt-16 flex"
  >
    <navbar-for-doctor />
    <div
      class="sm:block overflow-y-auto sm:border-r border-gray-600 w-full sm:w-1/4"
      :class="{ 'block': activePage === 'left', 'hidden': activePage !== 'left' }"
    >
      <left-pane></left-pane>
    </div>
    <div
      class="sm:block flex-grow border-r border-gray-600 w-full sm:w-1/2"
      :class="{ 'block': activePage === 'main', 'hidden': activePage !== 'main' }"
    >
      <main-pane></main-pane>
    </div>
    <div
      class=" sm:block overflow-y-auto w-full sm:w-1/4"
      :class="{ 'block': activePage === 'right', 'hidden': activePage !== 'right' }"
    >
      <right-pane></right-pane>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import NavbarForDoctor from '@/components/NavbarForDoctor.vue';
import LeftPane from './Dashboard/LeftPane.vue';
import MainPane from './Dashboard/MainPane.vue';
import RightPane from './Dashboard/RightPane.vue';

export default defineComponent({
  components: {
    NavbarForDoctor,
    LeftPane,
    MainPane,
    RightPane
  },
  
  setup() {
    const activePage = ref('main');
  
    return {
      activePage
    };
  }
})
</script>
