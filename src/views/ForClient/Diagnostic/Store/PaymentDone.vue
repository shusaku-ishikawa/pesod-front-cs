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
        :step="4"
      ></store-stepper>
      <div class="font-bold text-lg mt-10">
        ご注文ありがとうございます。
      </div>
    </div>
  </base-layout>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, SetupContext } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ISubscription, IProduct } from '@/types/Interfaces'
import StoreStepper from './Stepper.vue'

export default defineComponent({
  components: {
    StoreStepper,
  },
  props: {
    subscription: {
      type: Object as () => ISubscription
    }
  },
  setup(props: any, context: SetupContext) {
    const route = useRoute();
    const router = useRouter();

    

    return {
      route,
      router,
      // onSubmit
    };
  }
})
</script>