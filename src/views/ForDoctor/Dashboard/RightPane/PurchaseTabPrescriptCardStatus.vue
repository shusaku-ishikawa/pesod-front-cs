<template>
  <div
    class="text-xs rounded flex-shrink-0"
    :class="{ 'bg-blue-100': status == 3, 'bg-gray-100': status == 0 || status == 4 }"
  >
    <img v-if="status != 3" class="h-6" src="@/assets/img/doctor_end_long.png" alt="">
    <img v-else class="" style="width: 80px" src="@/assets/img/doctor_now_long.png" alt="">
  
  </div>
</template>
<script lang="ts">
import { defineComponent, SetupContext } from 'vue'
export default defineComponent({
  props: {
    status: Number
  },
  setup(props: any, context: SetupContext) {
    const getStatusText = (status: number) => {
      const PRESCRIPT_STATUS: any = {
        1: "問診",
        2: "医師選択中",
        3: "診察中",
        4: "購入中",
        0: "処方手続き完了",
      }
      return PRESCRIPT_STATUS[status]
    }
    return {
      getStatusText
    }
  }
})
</script>