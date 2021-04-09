<template>
  <label class="inline-flex items-center">
    <input
      @change="onChange"
      type="checkbox"
      :disabled="$attrs.disabled"
      class="form-checkbox h-6 w-6 text-gray-600" :checked="modelValue"><span class="ml-2 text-gray-700">
      {{ $attrs.label }}
    </span>
  </label>
</template>
<script lang="ts">
import { defineComponent, SetupContext } from 'vue';
export default defineComponent({
  components: {
        
  },
  props: {
    modelValue: {
      type: Boolean,
    }
  },
  emits: [
    'update:modelValue'
  ],
  setup(_, ctx: SetupContext) {
    const onChange = (e: InputEvent) => {
      const { target } = e;
      if (!(target instanceof HTMLInputElement)) return;
      
      ctx.emit('update:modelValue', target.checked);
    };
    return {
      onChange
    }
  }
})
</script>