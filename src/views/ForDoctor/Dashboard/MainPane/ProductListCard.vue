<template>
  <div
    :class="{ 'bg-primary-light': toPrescribe }"
    class="text-sm flex h-full items-center px-3 py-2 hover:bg-blue-100 border rounded">
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
      <div class="mb-2">
        {{ product.name }}
      </div>
      <table class="text-sm">
        <tbody>
          <tr>
            <th>製造会社</th>
            <td>{{ product.maker }}</td>
          </tr>
          <tr>
            <th>入数</th>
            <td>{{ product.quantity }}</td>
          </tr>
          <tr>
            <th>金額</th>
            <td>{{ product.price.toLocaleString() }}</td>
          </tr>
          
        </tbody>
      </table>
      
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