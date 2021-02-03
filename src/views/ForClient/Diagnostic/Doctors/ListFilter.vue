<template>
  <div class="text-center w-64 mx-auto">
    <button
      class="secondary w-full"
    >
      <div
        @click="() => { isExpanded = !isExpanded }"
        class="flex justify-center"
      >
        <svg
          v-if="!isExpanded"
          class="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
        <svg
          v-else
          class="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
        </svg>
        <div>絞り込み検索</div>
      </div>
    </button>
    <div v-show="isExpanded" class="duration-600">
      <ul>
        <li
          v-for="(f, i) in filterValues"
          :key="i"
          class="flex text-left pl-5 py-2 border border-black"
        >
          <p-checkbox
            :label="f.text"
          ></p-checkbox>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
  },
  props: {
  },
  setup() {
    const filterValues = [
      {
        text: '診療中のみ',
        value: 'Active'
      },
      {
        text: '男性医師のみ',
        value: 'Male'
      },
      {
        text: '女性医師のみ',
        value: 'Female'
      },
    ];
    const isExpanded = ref(false);

    return {
      isExpanded,
      filterValues
    };
  }
})
</script>