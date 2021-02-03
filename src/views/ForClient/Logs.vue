<template>
  <base-layout> 
    <router-view
      :key="$route.fullPath"
    ></router-view>
  </base-layout>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  components: {
  },
  setup() {

    return {
    };
  }
})
</script>