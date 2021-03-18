<template>
  <div>
    <div
      class="text-left relative border-b border-black focus-within:border-blue-500"
    >
      <input
        ref="inputElement"
        placeholder=" "
        :id="$attrs.id"
        :type="$attrs.type"
        :value="modelValue"
        :autocomplete="$attrs.autocomplete ? $attrs.autocomplete : 'on'"
        @input="onInput"
        class="bg-transparent block w-full appearance-none focus:outline-none"
      >
      
      <label
        :for="$attrs.id"
        class="absolute top-0 duration-300 origin-0"
      >
        {{ $attrs.label }}
      </label>
    </div>
    <div
      v-if="error"
      class="text-left text-sm text-red-400 font-thin"
    >
      {{ error }}
    </div>
  </div>
</template>
<style lang="scss">
  
</style>
<script lang="ts">
import { defineComponent, onMounted, PropType, ref, SetupContext } from 'vue';

import useFormField from '@/mixins/FormInput';

export default defineComponent({
  components: {
        
  },
  props: {
    modelValue: {
      type: String,
    },
    rules: {
      type: Array as PropType<Function[]>,
      default: () => []
    }
  },
  emits: [
    'update:modelValue'
  ],
  setup(props, ctx: SetupContext) {
    
    const {
      error,
      validate
    } = useFormField();
    
    const inputElement = ref<HTMLInputElement | null>(null);

    const validateValue = (value: any) => {
      const message = validate(value, props.rules);
      if (inputElement.value) {
        inputElement.value.setCustomValidity(message);
      }
      return message;
    }
    const onInput = (e: InputEvent) => {
      const { target } = e;
      if (!(target instanceof HTMLInputElement)) return;
      const { value } = target;
      validateValue(value);
      ctx.emit('update:modelValue', value);
    };
    
    onMounted(() => {
      if (inputElement.value) {
        // inputElement.value.setCustomValidity('入力してください')
        const message = validateValue(props.modelValue);
      }  
    });

    return {
      inputElement,
      onInput,
      error,
    }
  }
})
</script>