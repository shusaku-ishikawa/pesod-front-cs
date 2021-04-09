<template>
  <div>
    <label
      :for="$attrs.id"
      class="text-sm font-semibold"
      :class="{ 'text-red-600': error }"
    >
      {{ $attrs.label }}
    </label>
    <select
      
      @change="onChange"
      :id="$attrs.id"
      class="border-b focus:border-blue-500 focus:outline-none py-3 w-full block "
    >
      <option
        v-for="(o, i) in options"
        :key="i"
        :selected="o.value == modelValue"
      >
        {{ o.text }}
      </option>  
    </select>
    <div
      v-if="error"
      class="text-left text-sm text-red-400 font-thin"
    >
      {{ error }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, SetupContext } from "@vue/runtime-core";

export default defineComponent({
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Object
    },
    error: {
      type: String
    }
  },
  emits: [
    'update:modelValue'
  ],
  setup(props: any, context: SetupContext) {
    const onChange = (event: InputEvent) => {
      const {target} = event;
      if (!(target instanceof HTMLInputElement)) return;
      context.emit('update:modelValue', target.value);
    }
    return {
      onChange
    }
  }
})
</script>