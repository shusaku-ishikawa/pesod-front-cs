<template>
  <base-layout>
    <template v-slot:title>
      <div class="bg-gray-400 py-2">
        自分の記録
      </div>
    </template>
    <div class="flex-grow">
      <router-view
        :key="$route.fullPath"
      ></router-view>
    </div>
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