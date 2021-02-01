<template>
  <div class="w-full p-1">
    <form
      class="flex"
      @submit.prevent="() => {}"  
    >
      <textarea 
        class="rounded-lg border flex-grow px-2 focus:outline-none"
        cols="30"
        rows="2"
      ></textarea>
      <button
      class="rounded-lg border ml-1" 
      >
        送信
      </button>
    </form>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, SetupContext, } from 'vue';

export default defineComponent({
  components: {
    
  },
  props: {
  },
  setup(props, ctx: SetupContext) {
    
    return null;
  }
})
</script>