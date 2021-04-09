<template>
  <div class="flex p-2 rounded shadow border">
    <div>{{ creditCard.brand }}</div>
    <div class="ml-2">
      ***{{ creditCard.last4 }}
    </div>
    <div class="ml-2">
      {{ creditCard.exp_month }}/{{ creditCard.exp_year }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, defineEmit, ref, SetupContext } from 'vue';
export default defineComponent({
  props: {
    creditCard: {
      type: Object
    }
  },
  setup(props: any, context: SetupContext) {
    return {
      
    }
  }
})
</script>