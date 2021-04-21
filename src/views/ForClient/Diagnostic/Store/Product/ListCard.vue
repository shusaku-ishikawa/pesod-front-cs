<template>
  <div 
    class="relative flex px-3 py-2 "
    :class="{ 'shadow border rounded mb-2': isSelectable, 'bg-primary-light': inCart }"
  >
   
    <div class="flex items-center" v-if="isSelectable">
      <p-checkbox
        :modelValue="inCart"
        @update:modelValue="onCheck($event)"
        :disabled="!product.is_sales"
      ></p-checkbox>
    </div>
    <div class="flex-shrink-0">

      <img
        :src="product.image"
        alt=""
        style="width: 80px; height: auto"
      >
    </div>
    <div class="flex-grow text-left mx-2 mt-1">
      <div class="h-12" style="font-size: 14px">
        <u
          @click="onClick"
        >{{ product.name }}</u>
      </div>
      <div class="text-2xl text-right" style="line-height: 25px">
        {{ (product.price || 0).toLocaleString() }}円
      </div>
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
    'update:inCart',
    'showDetail'
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
    const onClick = () => {
      context.emit('showDetail', props.product)
    }
    return {
      router,
      onCheck,
      onClick
    };
  }
})
</script>