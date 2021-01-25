<template>
  <div class="min-h-screen flex flex-col bg-gray-200">
    <div class="my-10 text-2xl font-extrabold px-2">
      <slot name="title">
      </slot>
    </div>
    <div class="w-full flex-grow mx-auto pt-4 px-2 flex flex-col">
      <slot name="default">
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
  }
})
</script>