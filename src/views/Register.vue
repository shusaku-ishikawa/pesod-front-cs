<template>
  <top-layout>
    <template v-slot:title>
      <div class="relative">
        <svg
          class="absolute top-0 left-0 w-10 h-10"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        <div class="">
          会員登録
        </div>
      </div>
    </template>
    <div class="grid grid-cols-12 gap-2">
      
      <div class="col-span-6 mb-10">
        <p-input
          label="姓"
          type="text"
        ></p-input>
      </div>
      <div class="col-span-6">
        <p-input
          label="名"
          type="text"
        ></p-input>
      </div>
      <div class="col-span-6 mb-10">
        <p-input
          label="姓かな"
          type="text"
        ></p-input>
      </div>
      <div class="col-span-6">
        <p-input
          label="名かな"
          type="text"
        ></p-input>
      </div>
      <div class="col-span-12 mb-10">
        <p-input
          label="郵便番号"
          type="text"
        ></p-input>
      </div>
      <div class="col-span-12 mb-10">
        <p-input
          label="都道府県"
          type="text"
        ></p-input>
      </div>
      <div class="col-span-12 mb-10">
        <p-input
          label="市区町村"
          type="text"
        ></p-input>
      </div>
      <div class="col-span-12 mb-10">
        <p-input
          label="番地"
          type="text"
        ></p-input>
      </div>
      <div class="col-span-12 mb-10">
        <p-input
          label="建物名（任意）"
          type="text"
        ></p-input>
      </div>
      <div class="col-span-12 mb-10">
        <p-input
          label="電話番号"
          type="text"
        ></p-input>
      </div>
      <div class="col-span-12 mb-10">
        <p-input
          label="生年月日"
          type="text"
        ></p-input>
      </div>
      <div class="col-span-6 mb-10">
        男性
      </div>
      <div class="col-span-6 mb-10">
        女性
      </div>
      <div
        class="col-span-12 mb-10"
      >
        <button
          type="submit"
          class="primary w-64 mb-10"
        >
          <div class="inline-block">
            次にすすむ
          </div>
          <svg
          class=" w-6 h-6 float-right"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
        <div
          class="cursor-pointer"
        >
          お問い合わせはこちら
        </div>
      </div>
        
    </div>
  </top-layout>
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