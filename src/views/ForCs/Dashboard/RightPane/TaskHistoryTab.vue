<template>
  <div class="w-full sm:py-5 text-xs">
   
    <div class="text-left mb-5">
      <TabHeader>
        カウンセラー相談
      </TabHeader>
      <div
        v-if="loadingTasks"
        class="border shadow rounded-tr rouned-br rounded-bl p-2 w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
            <div class="flex-1 space-y-4 py-1">
              <div class="space-y-2">
                <div class="h-4 bg-blue-100 rounded"></div>
                <div class="h-4 bg-blue-100 rounded"></div>
                <div class="h-4 bg-blue-100 rounded"></div>
                
              </div>

          </div>
        </div>
      </div>
      <div
        
        v-else
      >
        <div
          v-if="counselorTasks.length == 0"
          class="mb-1 border p-2 px-4 rounded-tr rounded-br rounded-bl"
        >相談履歴がありません</div>
        <TaskHistoryTabTaskCard
          v-for="(t, i) in counselorTasks"
          :key="i"
          :task="t"
          @click="() => { if (t.status == 0) modalTask = t }"
        />
      
      </div>
      
    </div>
    <div class="text-left mb-5">
      <TabHeader>
        カスタマーサポート相談
      </TabHeader>
      <div
        v-if="loadingTasks"
        class="border shadow rounded-tr rouned-br rounded-bl p-2 w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
            <div class="flex-1 space-y-4 py-1">
              <div class="space-y-2">
                <div class="h-4 bg-blue-100 rounded"></div>
                <div class="h-4 bg-blue-100 rounded"></div>
                <div class="h-4 bg-blue-100 rounded"></div>
                
              </div>

          </div>
        </div>
      </div>
      <div
        v-else
        class=""
      >
        
        <div
          v-if="csTasks.length == 0"
          class="mb-1 border p-2 px-4 rounded-tr rounded-br rounded-bl"
        >相談履歴がありません</div>
        <TaskHistoryTabTaskCard
          v-for="(t, i) in csTasks"
          :key="i"
          :task="t"
          @click="() => { if (t.status == 0) modalTask = t }"
        />
      </div>
    </div>
    
    <FrameModal
      v-if="modalTask != null"
      @close="modalTask = null"
    >
      
      <TaskHistoryModal
        v-if="modalTask != null"
        :task="modalTask"
        @close="modalTask = null"
      />
    </FrameModal>
  </div>
</template>
<style lang="scss" scoped>
  table {
    tr {
      th {
        white-space: nowrap;
        font-weight: 500;
        text-align-last: justify;
        text-justify: inter-ideograph;
      }
      td {
        padding: 3px 10px;
      }
    }
  }
  .title-tag::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background: #01579B;
    transform: scaleY(1.3) perspective(.6em) rotateX(5deg);
    transform-origin: bottom left;
    border-radius: 8px 8px 0 0;
  }
</style>
<script lang="ts">
import { defineComponent, ref, onMounted, SetupContext, computed } from "vue";

import { IAnswer, IAnswerOption, IOrder, IPrescript, ITask } from "@/types/Interfaces";

import TaskHistoryModal from './TaskHistoryTabTaskHistoryModal.vue';
import TaskHistoryTabTaskCard from './TaskHistoryTabTaskCard.vue';
import TabHeader from '@/components/TabHeader.vue';

export default defineComponent({
  components: {
    TaskHistoryModal,
    TaskHistoryTabTaskCard,
    TabHeader
  },
  props: {
    task: {
      type: Object as () => ITask
    },
    loadingTasks: {
      type: Boolean
    },
    counselorTasks: {
      type: Object as () => ITask[]
    },
    csTasks: {
      type: Object as () => ITask[]
    },
    
  },
  setup(props: any, context: SetupContext) {
   
    const modalTask = ref<IPrescript | null>(null);
    
   
    return {
      modalTask,
    };
  }
})
</script>
