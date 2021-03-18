<template>
  <div>
    <div
      @click="() => { input.click() }"
    >
      <svg
        v-if="!modelValue"
        class="w-10 h-10 inline-block"
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <img
        v-else
        class="max-h-full max-w-full mx-auto"
        :src="modelValue"
        alt=""
      >
      <input
        accept="image/*"
        ref="input"
        id="input"
        type="file"
        class="hidden"
        @change="onImageChange"
      >
    </div>
    <div>
      タップして撮影
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, onUpdated, PropType, ref, SetupContext } from 'vue';

import useFormField from '@/mixins/FormInput';
import { getRegexpTester } from '@/mixins/FormValidator';

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
    const imageReader = new FileReader();
    // const imageDataUrl = ref<any>(null);

    imageReader.onload = (event: ProgressEvent) => {
      // imageDataUrl.value = imageReader.result;
      // ctx.emit('update:modelValue', imageReader.result);
      ctx.emit('update:modelValue', imageReader.result)
    };
    
    const onImageChange = (e: Event) => {
      const {target} = e;
      if (!(target instanceof HTMLInputElement)) return;
      const { files } = target;
      if (files == null || !files.length) return;
      imageReader.readAsDataURL(files[0]);
      // ctx.emit('update:modelValue', files[0]);
    };
    
    // onUpdated(() => {
    //   if (props.modelValue == null) return;
    //   imageReader.readAsDataURL(props.modelValue);
    // });
    // onMounted(() => {
    //   if (props.modelValue == null) return;
    //   imageReader.readAsDataURL(props.modelValue);
    // });
    
    const input = ref<HTMLInputElement | null>(null);
    return {
      input,
      onImageChange,
      // imageDataUrl
    }
  }
});
</script>