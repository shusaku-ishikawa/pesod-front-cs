<template>
  <div>
    <div
      class="relative leading-8 text-left border-b border-black focus-within:border-blue-500"
      :class="{ 'border-red-600': error, 'border-gray-400': $attrs.disabled }"
    >
      <label
        :for="$attrs.id"
        class="text-sm font-semibold"
        :class="{ 'text-red-600': error }"
      >
        {{ $attrs.label }}
      </label>
      <div class="relative">
        <input
          ref="inputElement"
          :placeholder="$attrs.placeholder"
          :id="$attrs.id"
          :type="$attrs.type"
          :value="modelValue"
          :autocomplete="$attrs.autocomplete ? $attrs.autocomplete : 'on'"
          @input="onInput"
          :disabled="$attrs.disabled"
          class="block w-full appearance-none focus:outline-none"
          :class="{ 'text-gray-600 ': $attrs.disabled }"
        >
      
        <div
          v-if="hidable"
          class="absolute right-1 top-0 h-full table-cell align-middle"
        >
          <img
            v-if="!isHidden"
            class="inline-block"
            @click="updateHidden(true)"
            src="@/assets/img/pass_eye.png" alt=""> 
          <img
            v-else
            class="inline-block"
            @click="updateHidden(false)"
            src="@/assets/img/pass_eye_on.png" alt=""> 
          
        </div>
        
      </div>
      
    </div>
    
    <div
      v-if="error"
      class="text-left text-sm text-red-400 font-thin"
    >
      {{ error }}
    </div>
  </div>
</template>
<style lang="scss" scoped >
  
</style>
<script lang="ts">
import { defineComponent, onMounted, watch, ref, SetupContext } from 'vue';

import useFormField from '@/mixins/FormInput';

export default defineComponent({
  components: {
        
  },
  props: {
    modelValue: {
      type: String,
    },
    error: {
      type: String
    },
    hidable: {
      type: Boolean,
      default: false
    },
    isHidden: {
      type: Boolean
    }
  },
  emits: [
    'update:modelValue',
    'update:isHidden'
  ],
  setup(props, context: SetupContext) {
    
    
    const inputElement = ref<HTMLInputElement | null>(null);

    // const validateValue = (value: any) => {
    //   const message = validate(value, props.rules);
    //   if (inputElement.value) {
    //     inputElement.value.setCustomValidity(message);
    //   }
    //   return message;
    // }
    const onInput = (e: InputEvent) => {
      const { target } = e;
      if (!(target instanceof HTMLInputElement)) return;
      const { value } = target;
      // validateValue(value);
      context.emit('update:modelValue', value);
    };
    // watch(() => props.error, () => {
    //   if (props.error) {
    //     inputElement.value?.setCustomValidity(props.error);
    //   } else {
    //     inputElement.value?.setCustomValidity("");
    //   }
    // })
    // onMounted(() => {
    //   if (props.error) {
    //     inputElement.value.set
    //   } 
    // });
    const updateHidden = (val: boolean) => {
      context.emit('update:isHidden', val);
    }
    return {
      inputElement,
      onInput,
      updateHidden
    }
  }
})
</script>