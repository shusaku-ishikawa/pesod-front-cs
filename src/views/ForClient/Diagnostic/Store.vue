<template>
  <router-view
    v-if="subscription"
    :myPrescript="myPrescript"
    :subscription="subscription"
    @update:policy_accepted="onAccept"
    v-model:cart="cart"
    @commit:cart="onCommitCart"
    
    :deliveryValidator="deliveryValidator"
    v-model:delivery="delivery"
    @commit:delivery="onCommitDelivery"

    :card="card"
    @commit:payment="onCommitPayment"
    
    @commit:order="onCommitOrder"
  ></router-view>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUpdated, ref } from 'vue';
import { useRoute } from 'vue-router';
import useSubscription from '@/types/Subscription';
import { IDelivery, IDeliveryValidator, IProduct, ISubscription } from '@/types/Interfaces';
import router from '@/router';
import { add, last, subtract, values, zip } from 'lodash';
import PrescribeProductsModalVue from '@/views/ForDoctor/Dashboard/MainPane/PrescribeProductsModal.vue';
import usePrescript from '@/types/Prescript';
import useProducts from '@/types/Product';
import { formRequired, getRegexpTester } from '@/mixins/FormValidator';

export default defineComponent({
  setup() {
  
    const {
      myPrescript,
      getPrescript
    } = usePrescript();
    
    const {
      subscription,
      createSubscription
    } = useSubscription();

    const cart = ref<IProduct[]>([]);
    const delivery = ref<IDelivery>({
      receiver: '',
      prefecture: '',
      city: '',
      street: '',
      building: '',
      address: '',
      zip_code: '',
      phone_number: '',
      deliv_time: 0
    });
    const deliveryValidator: IDeliveryValidator = {
      receiver: [
        formRequired
      ],
      prefecture: [
        formRequired
      ],
      city: [
        formRequired
      ],
      street: [],
      building: [],
      address: [
        formRequired
      ],
      zip_code: [
        formRequired,
        getRegexpTester(/^[0-9]{7}$/, '数字のみ７桁で入力してください')
      ],
      phone_number: [
        formRequired,
        getRegexpTester(/^[0-9]{10,15}$/, '15桁以下の数値で入力してください。')
      ],
      deliv_time: [
        formRequired
      ],
    }
    const card = ref(null);

    const onCommitCart = () => {
      // if (subscription.value == null) return;
      // subscription.value.product_ids = cart.value.map((p: IProduct) => ({ id: p.id || '', item_count: 1 }))
      router.push({ name: 'StorePayment1' })
      // console.log(subscription.value.product_ids)
    };

    
    const onCommitDelivery = () => {
      // if (subscription.value == null) return;
     
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
      if (myPrescript.value == null) return;
      checkPrescriptStatus();
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
        pay_method: 0,
        product_ids: [],
      };
      myPrescript.value.prescript_products?.map((p: IProduct) => {
        if (p.is_doctor_recommend) {
          cart.value.push(p)
        }
      })
      const {
        zip_code,
        first_name,
        last_name,
        prefecture,
        city,
        address,
        phone_number,
        
      } = myPrescript.value.customer;
      delivery.value.receiver = `${first_name}${last_name}`;
      delivery.value.prefecture = prefecture;
      delivery.value.city = city;
      delivery.value.address = address;
      delivery.value.zip_code = zip_code;
      delivery.value.phone_number = phone_number;
    });

    const onCommitPayment = (event: any) => {
      card.value = event;
      router.push({ name:'StorePayment3' })
    }
    const validateOrder = () => {
      if (subscription.value == null) return false;
      if (cart.value.length == 0) {
        router.push({ name: 'StoreProductList' });
        return false;
      }
      // delivery
      let deliveryError;
      for (const key in deliveryValidator) {
        const validators = deliveryValidator[key];
        validators.map((v: Function) => {
          const error = v(delivery.value[key]);
          if (error) deliveryError = error;
        })
        if (deliveryError) {
          router.push({ name: 'StorePayment1' });
          return false;
        }
      }
      return true;
      
    };
    
    const onCommitOrder = async () => {
      // set products 
      if (subscription.value == null) return;
      
      if (!validateOrder()) return;
      
      subscription.value.product_ids = cart.value.map((p: IProduct) => ({ product: p.id || '', item_count: 1 }));
      
      // set delivery
      subscription.value.zip_code = delivery.value.zip_code;
      subscription.value.prefecture = delivery.value.prefecture;
      subscription.value.city = delivery.value.city;
      subscription.value.address = delivery.value.address;
      subscription.value.phone_number = delivery.value.phone_number;
      subscription.value.deliv_time = delivery.value.deliv_time;
      subscription.value.deliv_method = '日本郵便'
      console.log(subscription.value)
      const sub = await createSubscription(subscription.value);
      console.log(sub)
      router.push({ name: 'StorePaymentDone' })
      
    }
    return {
      card,
      cart,
      delivery,
      myPrescript,
      subscription,
      onAccept,
      onCommitCart,
      onCommitDelivery,
      onCommitPayment,
      onCommitOrder,
      deliveryValidator,
    }
  }
})
</script>