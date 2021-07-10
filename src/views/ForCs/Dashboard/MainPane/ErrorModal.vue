
<template>
  <div class="inline-block shadow-xl transform align-middle mt-16" >
    <div class=" rounded bg-white px-6 py-4 sm:pb-4">
      <div>
        再接続してください。
      </div>
      <hr class="my-4">
      <div class="flex ">
        
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
import { ICs, ITask } from '@/types/Interfaces'
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
    css: Object as () => ICs[]
  },
  emits: [
    'close',
    'update:assignee'
  ],
  setup(props: any, context: SetupContext) {
    const onClose = () => {
      context.emit('close')
    }
    
    const {
      updateAssignee  
    } = useTasks()

    const nextAssigneeId = ref<number | null>();
    const onChangeAssignee = async () => {
      if (nextAssigneeId.value == null) return;
      const nextAssignee = props.css.find((c: ICs) => c.id == nextAssigneeId.value);
      alert(props.task.id)
      alert(props.task.uuid)
      const d = await updateAssignee(props.task.id, nextAssigneeId.value);
      console.log(d)
      context.emit('update:assignee', cloneDeep(nextAssignee))
    }
    return {
      onClose,
      nextAssigneeId,
      onChangeAssignee
    }
  }
})
</script>
