<template>
  <div class="flex items-center px-3 py-2 hover:bg-gray-100">
    <div>
      <p-checkbox
        :modelValue="toPrescribe"
        @update:modelValue="onCheck($event)"
      ></p-checkbox>
    </div>
    <div class="ml-4 flex-shrink-0">
      
      <img
        :src="product.image"
        alt=""
        style="width: 100px; height: auto"
      >
    </div>
    <div class="flex-grow text-left ml-4">
      <div>
        {{ product.name }}
      </div>
      <div>
        {{ (product.price || 0).toLocaleString() }}円
      </div>
      <div>
        {{ product.usage }}
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
    'update:toPrescribe'
  ],
  props: {
    product: {
      type: Object as () => IProduct
    },
    toPrescribe: {
      type: Boolean
    },
  },
  setup(props: any, context: SetupContext) {
    const router = useRouter();
    
    const onCheck = (e: boolean) => {
      console.log(e)
      context.emit('update:toPrescribe', e);

    };

    return {
      router,
      onCheck
    };
  }
})
</script>