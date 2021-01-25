<template>
  <base-layout>
    <template v-if="route.name !== 'DiagnosticTop'" v-slot:title>
      <div
        
        class="bg-gray-400 py-2 w-full"
      >
        診察 ROOM
      </div>
    </template>
    <router-view></router-view>
  </base-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  components: {
  },
  setup() {
    const route = useRoute();

    return {
      route
    };
  }
})
</script>