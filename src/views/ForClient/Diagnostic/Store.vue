<template>
  <router-view
    v-if="subscription"
    :myPrescript="myPrescript"
    :subscription="subscription"
    @update:policy_accepted="onAccept"
    @update:cart="onUpdateCart"
    @update:delivery="onUpdateDelivery"
  ></router-view>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUpdated, ref } from 'vue';
import { useRoute } from 'vue-router';
import useSubscription from '@/types/Subscription';
import { IDelivery, IProduct, ISubscription } from '@/types/Interfaces';
import router from '@/router';
import { subtract } from 'lodash';
import PrescribeProductsModalVue from '@/views/ForDoctor/Dashboard/MainPane/PrescribeProductsModal.vue';
import usePrescript from '@/types/Prescript';

export default defineComponent({
  setup() {
    const {
      myPrescript,
      getPrescript
    } = usePrescript();
    const {
      subscription,
    } = useSubscription();

    const onUpdateCart = (products: IProduct[]) => {
      if (subscription.value == null) return;
      console.log(products)
      subscription.value.product_ids = products.map((p: IProduct) => ({ id: p.id || '', item_count: 1 }))
      router.push({ name: 'StorePayment1' })
      console.log(subscription.value.product_ids)
    };

    
    const onUpdateDelivery = (delivery: IDelivery) => {
      console.log(delivery)
      if (subscription.value == null) return;
      subscription.value.zip_code = delivery.zip_code;
      subscription.value.prefecture = delivery.prefecture;
      subscription.value.city = delivery.city;
      subscription.value.address = delivery.address;
      router.push({ name: 'StorePayment2' });
    };
    
    const onUpdatePayment = (event: any) => {
      return null;
    };

    const onAccept = () => {
      if (subscription.value == null) return;
      subscription.value.policy_accepted = true;
      alert('policy accept')
    }
    const checkPrescriptStatus = () => {
      if (myPrescript.value?.status != 4) {
        router.replace({ name: 'DiagnosticTop' })
      }
    }
    onUpdated(() => {

      console.log('on updated store vue')
    })


    onMounted(async () => {
      myPrescript.value = await getPrescript();
      checkPrescriptStatus();
      console.log('on mounted store vue')
      // creae empty subscription
      subscription.value = {
        policy_accepted: false,
        delivery_interval: 30,
        deliv_time: 12,
        zip_code: '',
        prefecture: '',
        city: '',
        address: '',
        phone_number: '',
        deliv_method: '',
        pay_method: '',
        product_ids: [],
      };
      
    });
    
    return {
      myPrescript,
      subscription,
      onAccept,
      onUpdateCart,
      onUpdateDelivery,
      
    }
  }
})
</script>