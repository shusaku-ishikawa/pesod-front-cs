<template>
  <div class="pt-10 px-2">
    処方箋
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-1">
        <button
          class="primary w-full"
        >
          あり
        </button>
      </div>
      <div class="col-span-1">
        <button
          class="secondary w-full"
        >
          なし
        </button>
      </div>
    </div>
  </div>
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