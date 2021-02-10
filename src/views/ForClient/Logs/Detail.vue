<template>
  <div class="flex-grow">
    <page-title>
      <div class="flex self-left mr-auto">
        <router-link
          :to="{ name: 'LogsList' }"
          v-slot="{ href, navigate }"
        >
          <page-title-back
            :href="href"
            @click="navigate"
          ></page-title-back>
        </router-link>
        <div>毛髪記録</div>
      </div>
    </page-title>
    <div class="px-2 flex flex-col">
      <div class="flex text-lg text-left ">
        <div>日付</div>
        <div class="flex-grow text-right">
          <select class="" name="" id="">
            <option value="">2020/1/20</option>
          </select>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-1 mb-3">
        <div
          @click="() => { front.click() }"
          class="cursor-pointer col-span-1 rounded h-48 bg-gray-200 flex flex-col justify-around">
          <div>前頭部</div>
          <div>
            <svg
              v-if="frontImage == null"
              class="w-10 h-10 inline-block"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <img
              v-else
              class="max-h-full max-w-full"
              :src="frontImage"
              alt=""
            >
            <input
              accept="image/*"
              ref="front"
              id="front"
              type="file"
              class="hidden"
              @change="onFrontImageChange"
            >
          </div>
          <div>
            タップして撮影
          </div>
        </div>
        <div
          @click="() => { top.click() }"
          class="cursor-pointer col-span-1 rounded bg-gray-200 flex flex-col justify-around">
          <div>頭頂部</div>
          <div>
            <svg
              v-if="topImage == null"
              class="w-10 h-10 inline-block"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <img
              v-else
              class="max-h-full max-w-full"
              :src="topImage"
              alt=""
            >
            <input
              accept="image/*"
              @change="onTopImageChange"
              ref="top"
              id="top"
              type="file"
              class="hidden"
            >
          </div>
          <div>
            タップして撮影
          </div>
        </div>
        
      </div>
      <!-- <div class="flex mb-3">
        <div class="w-20 h-20 bg-gray-100">
          日光
        </div>
        <div class="w-20 h-20 bg-gray-100 ml-1">
          飲酒
        </div>
        <div class="w-20 h-20 bg-gray-100 ml-1">
          タバコ
        </div>
        <div class="w-20 h-20 bg-gray-100 ml-1">
          運動
        </div>
      </div>
      <div class="text-left">
        <label for="memo">
          メモ
        </label>
        <div>
          <textarea class=" p-1 w-full border rounded" id="memo" cols="30" rows="5"></textarea>
        </div>
      </div> -->
      <div class="text-right mb-3">
        <button
          :disabled="frontImage == null || topImage == null"
          class="primary"
        >
          保存
        </button>
      </div>
    </div>  
  </div>  
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import useLogs from '@/types/Logs';

export default defineComponent({
  components: {
  },
  setup() {
    const {
      logs,
      fetchLogs
    } = useLogs();

    
    const front = ref(null);
    const top = ref(null);
    
    const frontImage = ref<string | ArrayBuffer | null>(null);
    const topImage = ref<string | ArrayBuffer | null>(null);
    
    const frontImageReader = new FileReader();
    const topImageReader = new FileReader();
    
    frontImageReader.onload = (event: ProgressEvent) => {
      console.log('onload');
      console.log(frontImageReader.result);
      frontImage.value = frontImageReader.result;
    };
    topImageReader.onload = (event: ProgressEvent) => {
      console.log('onload');
      console.log(topImageReader.result);
      topImage.value = topImageReader.result;
    };
    
    const onFrontImageChange = (e: Event) => {
      const {target} = e;
      if (!(target instanceof HTMLInputElement)) return;
      const { files } = target;
      if (files == null || !files.length) return;
      frontImageReader.readAsDataURL(files[0]);
    };

    const onTopImageChange = (e: Event) => {
      const {target} = e;
      if (!(target instanceof HTMLInputElement)) return;
      const { files } = target;
      if (files == null || !files.length) return;
      topImageReader.readAsDataURL(files[0]);
    };

    
    return {
      front,
      frontImage,
      onFrontImageChange,
      top,
      topImage,
      onTopImageChange,
      logs
    };
  }
})
</script> 
