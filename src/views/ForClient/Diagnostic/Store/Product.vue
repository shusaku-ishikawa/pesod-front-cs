<template>
  <router-view
    @update:cart="onUpdateCart"
  ></router-view>
</template>
<script lang="ts">
import { defineComponent, onMounted, SetupContext } from 'vue';
import { useRoute } from 'vue-router';
import { IProduct, ISubscription } from '@/types/Interfaces';

export default defineComponent({
  // props: {
  //   subscription: {
  //     type: Object as () => ISubscription
  //   }
  // },
  emits: [
    'update:cart',
  ],
  setup(props: any, context: SetupContext) {

    const onUpdateCart = (products: IProduct[]) => {
      context.emit('update:cart', products);
    };
    return {
      onUpdateCart
    }
  }
})
</script>