<template>
  <div
    class="flex items-end px-1"
    :class="{ 'justify-end': !isMyMessage }"
  >
    <div
      class="flex flex-col space-y-2 mx-2"
      :class="{ 'items-start': isMyMessage, 'order-1': !isMyMessage, 'items-end': !isMyMessage, 'order-2': isMyMessage }"
    >
        <!-- <div> -->
          <span
            :class="{ 'rounded-bl-none': isMyMessage, 'rounded-br-none': !isMyMessage }"
            class="text-left w-64 sm:max-w-sm md:max-w-md break-words text-sm leading-tight px-4 py-4 rounded-lg inline-block bg-gray-300 text-gray-600">
            {{ message.message }}
          </span>
        <!-- </div> -->
    </div>
    <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" class="w-6 h-6 rounded-full order-1">
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, SetupContext, } from 'vue';

import { IMessage } from '@/types/Interfaces';

import useAuth from '@/types/Auth';

export default defineComponent({
  components: {
    
  },
  props: {
    message: {
      type: Object as () => IMessage,
      required: true
    }
  },
  setup(props, ctx: SetupContext) {
    const {
      loginUser
    } = useAuth();

    const isMyMessage = computed(() => {
      return props.message.speaker.id === loginUser.value.id;
    });
    
    return {
      isMyMessage
    };
  }
})
</script>