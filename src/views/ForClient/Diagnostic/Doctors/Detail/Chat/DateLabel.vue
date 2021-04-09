<template>
  <div>
    <div class="inline-block rounded-full bg-gray-200 px-3 py-1 text-sm text-white">
      {{ display }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, defineEmit, SetupContext } from 'vue';
import moment from 'moment';

export default defineComponent({
  props: {
    dateStr: String
  },
  setup(props: any, context: SetupContext) {
    const display = moment(props.dateStr).format('M/D(ddd)')
    return {
      display
    }
  }
})
</script>
