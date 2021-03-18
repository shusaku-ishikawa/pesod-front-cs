<template>
  <div class="w-full grid grid-cols-2">
    <div
      @click="changeTo(0)"
      class="cursor-pointer col-span-1 border py-2"
      :class="{ 'bg-yellow-400': modelValue === 0 }"
    >
      男性
    </div>
    <div
      @click="changeTo(1)"
      :class="{ 'bg-yellow-400': modelValue === 1 }"
      class="cursor-pointer col-span-1 border py-2"
    >
      女性
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, SetupContext } from 'vue';
export default defineComponent({
  components: {
    
  },
  props: {
    modelValue: {
      type: Number
    }
  },
  emits: [
    'update:modelValue'
  ],
  setup(props: any, context: SetupContext ) {
    const changeTo = (val: number) => {
      context.emit('update:modelValue', val);
    }
    return {
      changeTo
    }
  }
})
</script>