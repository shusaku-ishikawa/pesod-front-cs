<template>
  <div>
    <div
      @click="() => { input.click() }"
    >
      <img
        v-if="!modelValue && photoType == 'A'"
        src="@/assets/img/monshin_photo_A.png"
        alt=""
      >
      <img
        v-if="!modelValue && photoType == 'B'"
        src="@/assets/img/monshin_photo_B.png"
        alt=""
      >
      
      <img
        v-if="modelValue"
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
    photoType: {
      type: String,
      default: 'A'
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