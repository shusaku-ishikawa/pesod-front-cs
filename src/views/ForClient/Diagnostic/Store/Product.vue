<template>
  <router-view
    v-if="products.length"
    :products="products"
    :cart="cart"
    @update:cart="onUpdateCart"
  ></router-view>
</template>
<script lang="ts">
import { defineComponent, onMounted, SetupContext } from 'vue';
import { useRoute } from 'vue-router';
import { IProduct, ISubscription } from '@/types/Interfaces';
import useProducts from '@/types/Product';

export default defineComponent({
  // props: {
  //   subscription: {
  //     type: Object as () => ISubscription
  //   }
  // },
  emits: [
    'update:cart',
  ],
  props: {
    cart: {
      type: Object as () => IProduct[]
    }
  },
  setup(props: any, context: SetupContext) {
    const {
      products,
      fetchProducts  
    } = useProducts();

    const onUpdateCart = (event: IProduct[]) => {
      console.log(event)
      context.emit('update:cart', event);
    };

    onMounted(async () => {
      products.value = await fetchProducts();
    })
    return {
      products,
      onUpdateCart
    }
  }
})
</script>