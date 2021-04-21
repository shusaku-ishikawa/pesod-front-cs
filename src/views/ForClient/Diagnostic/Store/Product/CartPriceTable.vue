<template>
  <table class="w-full mx-auto">
    <tbody>
      <tr>
        <th class="text-left text-sm">商品数</th>
        <td class="text-right">
          {{ cart.length }}個
        </td>
      </tr>
      <tr>
        <th class="text-left text-sm">小計<span class="text-xs">（税別）</span></th>
        <td class="text-right">
          {{ cartItemTotalPrice.toLocaleString() }}円
        </td>
      </tr>
      <tr>
        <th class="text-left text-sm">消費税</th>
        <td class="text-right">
          {{ cartItemTotalTax.toLocaleString() }}円
        </td>
      </tr>
      <tr class="text-2xl font-bold text-base leading-10">
        <th class="text-left">合計<span class="text-xs">（税込）</span></th>
        <td class="text-right">
          {{ (cartItemTotalPrice + cartItemTotalTax).toLocaleString() }}円
        </td>
      </tr>
      
    </tbody>
  </table>
</template>
<script lang="ts">
import { defineComponent, computed, SetupContext } from 'vue'
import { IProduct } from '@/types/Interfaces'

export default defineComponent({
  props: {
    cart: {
      type: Object as () => IProduct[]
    }
  },
  setup(props: any, context: SetupContext) {
    const cartItemTotalPrice = computed(() => {
      let total = 0;
      props.cart.map((p: IProduct) => {
        total += p.price;
      })
      return total;
    });
    const cartItemTotalTax = computed(() => {
      let total = 0;
      props.cart.map((p: IProduct) => {
        total += p.price * p.tax_rate / 100;
      })
      return total;
    })
    return {
      cartItemTotalPrice,
      cartItemTotalTax
    }
  },
})
</script>
