<template>
  <div
    :class="{ 'hover:bg-blue-100 cursor-pointer ': task.status == 0 }"
    class="mb-1  border flex w-full items-center p-2 px-4 rounded-tr rounded-br rounded-bl"
  >
    <table
      class="border-collapsed w-full ">
      <tbody
      >
        
        <tr

        >
          <th>開始日:</th>
          <td class="px-2">{{ getFormattedDate(task.created_at, 'YYYY/M/D') }}</td>
        </tr>
        <tr

        >
          <th>終了日:</th>
          <td class="px-2">{{ getFormattedDate(task.ended_at, 'YYYY/M/D') }}</td>
        
        </tr>
        <tr

        >
          <th>担当者:</th>
          <td class="px-2">{{ task.assignee ? task.assignee.full_name : '-' }}</td>
        
        </tr>
        
        
      </tbody>
    
    </table>
   
    <div class="flex-shrink-0 w-5 text-center">
      <ArrowRight class="mx-auto" v-if="task.status == 0" />
    </div>
  </div>
</template>
<style scoped lang="scss">
  table {
    tr {
      line-height: 14px;
      th {
        white-space: nowrap;
        font-weight: 500;
        text-align-last: justify;
        text-justify: inter-ideograph;
      }
      td {
        padding: 1px 10px;
      }
    }
  }
</style>
<script lang="ts">
import { IPrescript, ITask } from "@/types/Interfaces";
import { defineComponent, ref, SetupContext } from "vue";
import { getFormattedDate } from '@/mixins/dateUtils'

export default defineComponent({
  components: {
    // PrescriptCardStatus,
  },
  props: {
    task: Object as () => ITask
  },
  setup(props: any, context: SetupContext) {
    return {
      getFormattedDate
    }
  }
})
</script>

