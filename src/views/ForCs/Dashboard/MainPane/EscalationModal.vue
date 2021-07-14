<template>
  <div class="inline-block shadow-xl transform align-middle mt-16" >
    <div class=" rounded bg-white p-10">
      <div class="text-left text-sm mb-2">
        エスカレーションする担当者を選択してください
      </div>
      <div class="grid grid-cols-2 gap-1 mb-2">
        <div
          v-for="(c, i) in counselors.filter(c => c.id != task.assignee.id)"
          :key="i"
          @click.stop="nextAssigneeId = c.id"
          class="rounded shadow p-2 w-72"
          :class="{ 'bg-blue-100': nextAssigneeId && nextAssigneeId == c.id }"
        >
          <input v-model="nextAssigneeId" :value="c.id" :id="`c${i}`" type="radio" name="cs">
          <label class="ml-2" :for="`c${i}`">{{ c.full_name }}</label>
        </div>
      </div>
      <hr class="my-4">
      <div class="flex ">
        <button
          @click="onChangeAssignee"
          :disabled="!nextAssigneeId"
          class="bg-white border text-xs text-black "
        >
          変更を確定する
        </button>
        <button
          @click="onClose"
          class="ml-auto bg-gray-200 text-white text-xs "
        >
          閉じる
        </button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  table {
    tr {
      th {
        background-color: #C4E2FF;
        white-space: nowrap;
        font-weight: 600;
        padding: 3px 10px;
        text-align-last: justify;
        text-justify: inter-ideograph;
      }
      th.no-justify {
        text-align-last: right;
        text-justify:auto;
      }
      td {
        text-align: left;
        padding: 3px 10px;
      }
      th, td {
        border: lightgray solid 1px;
      }
    }
  }
</style>
<script lang="ts">
import { defineComponent, computed, ref, onMounted, SetupContext } from "vue";
import { ICounselor, ICs, ITask } from '@/types/Interfaces'
import useTasks from "@/types/Task";
import { cloneDeep } from "lodash";

export default defineComponent({
  components: {
    
  },
  props: {
    // subscription: {
    //   type: Object as () => ISubscription[]
    // }
    task: Object as () => ITask,
    counselors: Object as () => ICounselor  []
  },
  emits: [
    'close',
    'elcalated'
  ],
  setup(props: any, context: SetupContext) {
    const onClose = () => {
      context.emit('close')
    }
    
    const {
      
      escalateTask,
      fetchActiveCounselorTask
    } = useTasks()

    const nextAssigneeId = ref<number | null>();
    const onChangeAssignee = async () => {
      if (nextAssigneeId.value == null) return;
      const nextAssignee = props.counselors.find((c: ICounselor) => c.id == nextAssigneeId.value);
      try {
        const d = await escalateTask(props.task, nextAssigneeId.value, 1);
        context.emit('escalated', cloneDeep(nextAssignee))    
      } catch (e) {
        const response = e.response;
        if (response) {
          const { status, data } = response;
          if (Array.isArray(data)) {
            alert(data[0]);
          } else {
            alert(JSON.stringify(data))
          }
        }
      }
      
    }
    return {
      onClose,
      nextAssigneeId,
      onChangeAssignee
    }
  }
})
</script>
