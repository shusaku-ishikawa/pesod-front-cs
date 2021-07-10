<template>
  <div class="flex-shrink-0">
      
    <img
      v-if="iconType == 0"
      class="w-10"
      src="@/assets/img/doctor/icon_man.png" alt=""
    >
    <img
      v-if="iconType == 1"
      class="w-10"
      src="@/assets/img/doctor/icon_woman.png" alt=""
    >
    <img
      v-if="iconType == 2"
      class="w-10"
      src="@/assets/img/doctor/icon_dog.png" alt=""
    >
    <img
      v-if="iconType == 3"
      class="w-10"
      src="@/assets/img/doctor/icon_cat.png" alt=""
    >
    <img
      v-if="iconType == 4"
      class="w-10"
      src="@/assets/img/doctor/icon_robot.png" alt=""
    >
    
    
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
  props: {
    iconType: Number
  }
})
</script>