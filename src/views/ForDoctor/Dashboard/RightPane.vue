<template>
  <div
    class="min-h-full w-full sm:px-3 sm:py-5"
  >
    <div>
      <ul class='flex cursor-pointer text-sm justify-center'>
        <li
          
          v-for="(t, i) in tabs"
          :key="i"
          @click="tab = t.value"
          :class="{ 'bg-gray-400 text-white ': t.value === tab }"
          class='flex-auto py-1 px-4 bg-white rounded-t-lg border'
        >
          {{ t.text }}
        </li>
      </ul>
    </div>
    <answer-tab
      v-if="tab === 'answer'"
      :prescript="prescript"
    ></answer-tab>
    <user-profile-tab
      v-if="tab === 'profile'"
      :prescript="prescript"
    ></user-profile-tab>
    
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, SetupContext, ref } from "vue";
import AnswerTab from './RightPane/AnswerTab.vue';
import UserProfileTab from './RightPane/UserProfileTab.vue';

import { IAnswer, IAnswerOption, IPrescript } from "@/types/Interfaces";

export default defineComponent({
  components: {
    AnswerTab,
    UserProfileTab
  },
  props: {
    prescript: {
      type: Object as () => IPrescript
    }
  },
  setup(_, context: SetupContext) {
    const tabs = [
      {
        value: 'answer',
        text: '問診表'
      },
      {
        value: 'profile',
        text: 'ユーザ情報'
      },
      {
        value: 'hairRecord',
        text: '毛髪記録'
      },
      
    ]
    const tab = ref<string>('answer')
    onMounted(async () => {
      // fetchLogs();
    });

    const onPage = (page: string) => {
      // alert('page')
      context.emit('page', page);
    };
    

    return {
      onPage,
      tabs,
      tab
      
    };
  }
})
</script>
