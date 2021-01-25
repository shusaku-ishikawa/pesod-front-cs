<template>
  <div
    class="text-left relative border-b border-black focus-within:border-blue-500"
  >
    <input
      placeholder=" "
      :id="$attrs.id"
      :type="$attrs.type"
      :value="modelValue"
      @input="onInput"
      class="bg-transparent block w-full appearance-none focus:outline-none"
    >
    <label
      :for="$attrs.id"
      class="absolute top-0  duration-300 origin-0"
    >
      {{ $attrs.label }}
    </label>
  </div>  
</template>
<script lang="ts">
import { defineComponent, SetupContext } from 'vue';
export default defineComponent({
  components: {
        
  },
  props: {
    modelValue: {
      type: String,
    }
  },
  emits: [
    'update:modelValue'
  ],
  setup(_, ctx: SetupContext) {
    const onInput = (e: InputEvent) => {
      const { target } = e;
      if (!(target instanceof HTMLInputElement)) return;
      const { value } = target;
      console.log(value)
      ctx.emit('update:modelValue', value);
    };
    return {
      onInput
    }
  }
})
</script>