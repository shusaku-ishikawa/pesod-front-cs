<template>
  <div class="inline-block shadow-xl transform align-middle" >
    <div class="my-5 rounded bg-white px-6 py-4 sm:pb-4">
      <div>
        <img
          :src="product.image"
          class="mx-auto"
          style="width: 200px"
        >
      </div>
      <div>
        
        <div
          style="font-size: 14px; font-weight: 600; margin-bottom: 20px"
        >
          {{ product.name }}
        </div>
        <table class="mx-auto" style="width: 70%; font-size: 14px; margin-bottom: 25px">
          <tbody>
            <tr>
              <th style="text-align-last: justify; text-justify: inter-ideograph;">医薬品分類</th>
              <td>{{ product.categories }}</td>
            </tr>
            <tr>
              <th style="text-align-last: justify; text-justify: inter-ideograph;">製造会社</th>
              <td>{{ product.maker }}</td>
            </tr>
            <tr>
              <th style="text-align-last: justify; text-justify: inter-ideograph;">入数</th>
              <td>{{ product.quantity }}</td>
            </tr>
            
          </tbody>
        </table>
        <div class="mb-5 text-left" style="font-size: 14px">
          <div class="font-semibold " >用法・容量</div>
          <div class="mb-5" v-html="product.dose">
          </div>
          <div class="font-semibold text-left">注意事項</div>
          <div v-html="product.usage">
          </div>

        </div>
        <button
          style="margin-top: 30px; margin-bottom: 15px;"
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
