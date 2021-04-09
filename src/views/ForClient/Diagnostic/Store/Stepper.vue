<template>
  <div class="px-5 py-3">
    <div class="flex items-center">
        <div class="flex items-center text-teal-600 relative">
            <div
                :class="{ 'bg-gray-600 text-white border-gray-600': step >= 1 }"
                class="rounded-full h-10 w-10 py-1 border-2 text-lg"
            >
                
                <div>
                    1
                </div>
            </div>
            <div
                
                class="absolute top-0 -ml-10 text-center mt-14 w-32 text-xs font-medium"
                :class="{ 'text-black': step >= 1, 'text-gray-400': step < 1 }"
            >
                配送先
            </div>
        </div>
        <div
            :class="{ 'border-gray-600': step >= 2 }"
            class="flex-auto border-t-8 border-teal-600"
        ></div>
        <div class="flex items-center text-teal-600 relative">
            <div
                :class="{ 'bg-gray-600 text-white border-gray-600': step >= 2 }"
                class="rounded-full h-10 w-10 py-1 text-lg  border-2 border-teal-600"
            >
                <div>2</div>
            </div>
            <div
                
                class="absolute top-0 -ml-10 text-center mt-14 w-32 text-xs font-medium"
                :class="{ 'text-black': step >= 2, 'text-gray-400': step < 2 }"
            >
                支払い
            </div>

        </div>
        <div
            :class="{ 'border-gray-600': step >= 3 }"
            class="flex-auto border-t-8 border-teal-600"
        ></div>
        <div class="flex items-center text-teal-600 relative">
            <div
                :class="{ 'bg-gray-600 text-white border-gray-600': step >= 3 }"
                class="rounded-full h-10 w-10 py-1 text-lg  border-2 "
            >
                
                <div>
                    3
                </div>
            </div>
            <div
                
                class="absolute top-0 -ml-10 text-center mt-14 w-32 text-xs font-medium"
                :class="{ 'text-black': step >= 3, 'text-gray-400': step < 3 }"
            >
                最終確認
            </div>
        </div>
        <div
            :class="{ 'border-gray-600': step >= 4 }"
            class="flex-auto border-t-8 border-teal-600"
        ></div>
         <div class="flex items-center text-teal-600 relative">
            <div
                :class="{ 'bg-gray-600 text-white border-gray-600': step >= 4 }"
                class="rounded-full h-10 w-10 py-1 text-lg  border-2 "
            >
                
                <div>
                    4
                </div>
            </div>
            <div
                
                class="absolute top-0 -ml-3 text-center mt-14 w-16 text-xs font-medium"
                :class="{ 'text-black': step >= 4, 'text-gray-400': step < 4 }"
            >
                注文確定
            </div>
        </div>
     
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  components: {
    
  },
  props: {
    step: {
        type: Number
    }  
  },
  setup() {
    const route = useRoute();

    return {
      route
    };
  }
})
</script>