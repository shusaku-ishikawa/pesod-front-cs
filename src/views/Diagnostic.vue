<template>
  <base-layout>
    <template v-slot:title>
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

export default defineComponent({
  components: {
  },
  setup() {
    return null;
  }
})
</script>