<template>
  <!-- This is an example component -->
  <div class="flex justify-center">
    <label
      @click.prevent="onClick"
      class="flex items-center cursor-pointer"
    >
      
      <!-- toggle -->
      <div class="relative">
        <input
          type="checkbox"
          :checked="modelValue"
          class="hidden"
        />
        <!-- path -->
        <div
          class="toggle-path leading-7  bg-gray-200 w-12 h-7 rounded-full shadow-inner text-sm my-auto"
          :class="{ 'text-left': modelValue, 'text-white': modelValue, 'text-right': !modelValue }"
        >
        </div>
        <!-- crcle -->
        <div
          class="toggle-circle absolute w-5 h-5 bg-white rounded-full shadow inset-y-0 left-0"
        ></div>
      </div>
    </label>

  </div>

</template>
<style scoped>

.toggle-path {
  transition: background 0.3s ease-in-out;
}
.toggle-circle {
  top: 0.25rem;
  left: 0.2rem;
  transition: all 0.3s ease-in-out;
}
input:checked ~ .toggle-circle {
  transform: translateX(100%);
}
input:checked ~ .toggle-path {
  background-color:#0AA2E8;
}
</style>
<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref, SetupContext } from 'vue';
export default defineComponent({
  props: {
    modelValue: Boolean
  },
  emits: [
    'update:modelValue'
  ],
  setup(props, context: SetupContext) {
    const onClick = () => {
      context.emit('update:modelValue', !props.modelValue)
    }
    return {
      onClick
    }
  }
});
</script>