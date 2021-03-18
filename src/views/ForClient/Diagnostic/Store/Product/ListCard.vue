<template>
  <div class="flex items-center px-3 py-2 hover:bg-gray-100">
    <div v-if="isSelectable">
      <p-checkbox
        :modelValue="inCart"
        @update:modelValue="onCheck($event)"
      ></p-checkbox>
    </div>
    <div>
      
      <img
        :src="product.image"
        alt=""
        style="width: 50px; height: 50px"
      >
    </div>
    <div class="flex-grow text-left ml-2">
      <div>
        {{ product.name }}
      </div>
      <div>
        {{ (product.price || 0).toLocaleString() }}円
      </div>
    </div>
    <div>
      <svg
        v-if="isSelectable"
        @click="() => { router.push({ name: 'StoreProductDetail', params: { id: product.id } }) }"
        class="w-8 h-8 inline-block cursor-pointer"
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
    </div>
  </div>
</template>
<script lang="ts">
import { IProduct } from '@/types/Interfaces';
import { defineComponent, onMounted, SetupContext } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  components: {
  },
  emits: [
    'update:inCart'
  ],
  props: {
    product: {
      type: Object as () => IProduct
    },
    inCart: {
      type: Boolean
    },
    isSelectable: {
      type: Boolean,
      default: true,
    },
  },
  setup(props: any, context: SetupContext) {
    const router = useRouter();
    
    const onCheck = (e: boolean) => {
      console.log(e)
      context.emit('update:inCart', e);
    };

    return {
      router,
      onCheck
    };
  }
})
</script>