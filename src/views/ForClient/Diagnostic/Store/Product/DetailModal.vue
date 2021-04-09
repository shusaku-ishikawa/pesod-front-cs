<template>
  <div class="inline-block shadow-xl transform align-middle" >
    <div class="my-5 rounded bg-white px-6 py-4 sm:pb-4">
      <div>
        <img
          :src="product.image"
          class="mx-auto"
        >
      </div>
      <div>
        <div>
          {{ product.name }}
        </div>
        <table class="mx-auto">
          <tbody>
            <tr>
              <th>医薬品分類</th>
              <td>{{ product.categories }}</td>
            </tr>
            <tr>
              <th>製造会社</th>
              <td>{{ product.maker }}</td>
            </tr>
            <tr>
              <th>入数</th>
              <td>{{ product.quantity }}</td>
            </tr>
            
          </tbody>
        </table>
        <div class="mb-5">
          <div class="font-semibold text-left">用法・容量</div>
          <div class="mb-5">
            {{ product.dose }}
          </div>
          <div class="font-semibold text-left">注意事項</div>
          <div>
            {{ product.usage }}
          </div>

        </div>
        <button
          @click="onClose"
          class="w-72 mx-auto border"
        >
          閉じる
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, SetupContext } from "vue";
import { IMessageTemplate, IProduct } from '@/types/Interfaces';

export default defineComponent({
  components: {
    
  },
  props: {
    product: {
      type: Object as () => IProduct
    }
  },
  emits: [
    'close',
    'select:template'
  ],
  setup(_, context: SetupContext) {
    
    const onClose = () => {
      context.emit('close')  
    };
    return {
      onClose,
    }
  }
})
</script>
