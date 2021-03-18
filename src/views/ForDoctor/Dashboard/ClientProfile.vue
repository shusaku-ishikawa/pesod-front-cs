<template>
  <div
    class="border rounded-lg shadow-lg px-5 py-2"
  >
    <div class="text-lg text-center">
      Persona
    </div>
    <div
      class="flex "
    >
      <div>
        ID: {{ prescript.customer.id }}
      </div>
      <div class="ml-3">
        {{ prescript.customer.first_name }} {{ prescript.customer.last_name }}
      </div>
    </div>
    <div v-if="prescript.doctor" class="text-left">
      かかりつけ医: {{ prescript.doctor.first_name }} {{ prescript.doctor.last_name }}
    </div>
    
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { IPrescript } from '@/types/Interfaces';

export default defineComponent({
  components: {
  },
  props: {
    prescript: {
      type: Object as () => IPrescript
    }
  },
  setup() {
    return {
      
    };
  }
})
</script>
