<template>
  <div class=" rounded-lg text-left flex items-end" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
    <!-- <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"> -->
      <ul
        class="bg-white"
      >
        <li
          v-for="(t, i) in templates"
          :key="i"
          class="border px-5 py-1 hover:bg-blue-100"
          @click="onClickTemplate(t)"
        >
          {{ t }}
        </li>
      </ul>
      <svg
        class="w-6 cursor-pointer"
        @click="onClickClose"
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    <!-- </div> -->
  </div>
</template>
<script lang="ts">

import { defineComponent, ref, watch, onMounted, onUpdated, onBeforeMount, onBeforeUnmount, computed, onErrorCaptured } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  name: 'SeriesModal',
  components: {
  },
  setup(props, context) {
    
    const templates: string[] = [
      '発毛について',
      '薬剤について',
      '体質について'
    ];
    const onClickTemplate = (t: string) => {
      context.emit('select', t);
    };
    const onClickClose = () => {
      context.emit('close');
    };
    return {
      templates,
      onClickClose,
      onClickTemplate
    }
  }
})
</script>
