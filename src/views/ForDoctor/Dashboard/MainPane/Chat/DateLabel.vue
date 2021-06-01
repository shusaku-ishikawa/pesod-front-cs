<template>
  <div>
    <div class="inline-block font-thin rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
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
    const display = moment(props.dateStr).format('YYYY/M/D')
    return {
      display
    }
  }
})
</script>
