<template>
  <base-layout>
    <template v-slot:title>
      <page-title>
        購入
      </page-title>
    </template>
    <div class="flex flex-col flex-grow">
      <store-stepper
        class="mb-5"
        :step="3"
      ></store-stepper>
      <div class="text-left p-2">
        <product-list-card
          v-for="(p, i) in productsInCart"
          :key="i"
          :product="p"
          :isSelectable="false"
        ></product-list-card>
      </div>
      <hr class="my-3">
      <div class="mb-3">
        <table class="border-collapsed w-full">
          <tbody>
            <tr>
              <th class="font-normal">小計</th>
              <td>ｘｘｘｘｘ</td>
            </tr>
            <tr class="text-sm">
              <th class="font-normal">消費税</th>
              <td>ｘｘｘｘｘ</td>
            </tr>
            
          </tbody>
          <tbody>
            <tr class="text-lg">
              <th class="font-normal">合計</th>
              <td>xxxxxx</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mb-3">
        <p-checkbox
          label="定期便に登録する"
          v-model="scheduledDelivery"
        ></p-checkbox>
      </div>
      <div>
        <button
          @click="onFixOrder"
          class="primary block mx-auto mb-3"
        >
          注文を確定する
        </button>
        <button
          @click="router.push({ name: 'StorePayment2' })"
        >
          もどる
        </button>
      </div>
    </div>
  </base-layout>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, SetupContext } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ISubscription, IProduct } from '@/types/Interfaces'
import useProduct from '@/types/Product';

import ProductListCard from './Product/ListCard.vue';

import StoreStepper from './Stepper.vue'

export default defineComponent({
  components: {
    StoreStepper,
    ProductListCard
  },
  props: {
    subscription: {
      type: Object as () => ISubscription
    }
  },
  setup(props: any, context: SetupContext) {
    const route = useRoute();
    const router = useRouter();

    const {
      getProduct
    } = useProduct();

    const productsInCart = ref<IProduct[]>([]);
    const scheduledDelivery = ref(false);

    onMounted(async () => {
      // 商品がカートになければ商品画面に戻る
      if (props.subscription.product_ids.length === 0) {
        router.push({ name: 'StoreProductList' })
      }
      props.subscription.product_ids.map(async (pid: any) => {
        productsInCart.value.push(await getProduct(pid.id));
      });
    });

    const onFixOrder = () => {
      console.log(props.subscription)
      router.push({ name: 'StorePaymentDone' })
    }
    return {
      route,
      router,
      productsInCart,
      onFixOrder,
      scheduledDelivery
      // onSubmit
    };
  }
})
</script>