<template>
  <div
    :id="chatLog.id"
    class="flex items-end px-1 justify-end" 
  >
    
    <div
      class="flex items-end space-y-1 mx-2 flex-row-reverse"   
    >
      <div
        style="background-color: white"
        :class="{ 'rounded-br-none ': true }"
        class="text-left sm:max-w-sm md:max-w-md break-words leading-5 px-4 py-4 rounded-lg inline-block text-gray-600 "
      >
        <div class="mb-2 text-lg border-b-2 border-blue-500">処方のご提案</div>
        <div class="mb-2 text-red-600 text-xs">
          商品の説明、服用方法、副作用など、詳細な情報はリンク先をご確認下さい。
        </div>
        <div class="text-sm">
          処方内容
        </div>
        <div>
          
          <div @click="onClickPrescriptProduct(p.id)" class="bg-white cursor-pointer flex items-center border rounded px-2 mb-1" v-for="(p, i) in productList.filter(p => p)" :key="i">
            <div class="flex-shrink-0 p-2">
              <img :src="p.image" class="w-14 " alt="">
            </div>
            <div class="flex-grow text-xs font-semibold">
              {{ p.name }}
            </div>
             <div class="px-2 flex-shrink-0 ">
                <!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg> -->
                <arrow-right></arrow-right>
              </div>
          </div>
        </div>
      </div>
      <div style="font-size: 11px" class="text-xs mx-2 text-gray-500">
        {{ HHMM(chatLog.created_at) }}
      </div>
    </div>
    
    <!-- <img
      v-if="isMyMessage"
      src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" class="w-6 h-6 rounded-full order-1"> -->
  </div>
</template>
<style lang="scss" scoped>
  hr {
    border-top: 1px dotted gray;
  }
</style>
<script lang="ts">
import moment from 'moment';

import { computed, defineComponent, SetupContext, useContext, } from 'vue';

import { IChatLog, IProduct } from '@/types/Interfaces';
import usePrescript from '@/types/Prescript';

export default defineComponent({
  components: {
    
  },
  props: {
    chatLog: {
      type: Object as () => IChatLog,
      required: true
    },
    products: {
      type: Object as () => IProduct[]
    }
  },
  emits: [
    'showProductDetail'
  ],
  setup(props: any, context: SetupContext) {
    

    const productList = computed(() => {
      const pIds = JSON.parse(props.chatLog.message);
      return pIds.map((pid: string) => {
        return props.products.find((p: IProduct) => p.id == pid)
      })
    })
    
    
    const HHMM = (dateStr: string) => {
      return moment(dateStr).format('H:mm')
    }
    
    const onClickPrescriptProduct = (pId: string) => {
      context.emit('showProductDetail', pId)
    }
    const HOST = process.env.VUE_APP_HOST;
    return {
      productList,
      HHMM,
      HOST,
      onClickPrescriptProduct
    };
  }
})
</script>