<template>
  <router-view></router-view>
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