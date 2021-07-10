<template>
  <div
    class="text-xs rounded flex-shrink-0 py-2 px-2"
    :class="{ 'bg-red-600 text-white': status == 1 && !isAssigned, 'bg-gray-100 text-black': status == 0, 'bg-blue-300 text-white': status == 1 && isAssigned }"
  >
    {{ getStatusText() }}
  </div>
</template>
<script lang="ts">
import { defineComponent, SetupContext } from 'vue'
export default defineComponent({
  props: {
    status: Number,
    isAssigned: Boolean
  },
  setup(props: any, context: SetupContext) {
    const getStatusText = () => {
      // const TASK_STATUS: any = {
      //   1: "OPEN",
      //   0: "CLOSE"
      // }
      // return TASK_STATUS[props.status]
      if (props.status == 0) {
        return '解決済'
      } else if (props.status == 1 && props.isAssigned) {
        return '対応中'
      } else {
        return '未対応'
      }
    }
    return {
      getStatusText
    }
  }
})
</script>