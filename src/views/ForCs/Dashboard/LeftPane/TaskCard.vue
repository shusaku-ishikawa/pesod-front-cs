<template>
   <div
    class="cursor-pointer relative py-4 flex items-center px-3 py-2 border-b border-gray-100  hover:bg-blue-100 text-sm w-full"
    :class="{ 'bg-primary-light': isActive, 'cursor-pointer': task.status == 3 }"
  >
    <UserIcon
      :iconType="task.consulter.icon_type"
    />
    <div
      class="ml-3 flex flex-col flex-grow text-left"
    >
      <div class="mb-1">
        {{ task.consulter.first_name }} {{ task.consulter.last_name }}
      </div>
      <table class="w-full text-sm">
        <tbody>
          <tr>
            <th>ID：</th>
            <td class="">{{ task.consulter.id }}</td>
          </tr>
          <tr>
            <th class="whitespace-nowrap">相談日：</th>
            <td> {{ getFormattedDate(task.created_at, 'YYYY/M/D') }}</td>
          </tr>
          <tr>
            <th>担当：</th>
            <td>{{ task.assignee ? task.assignee.full_name : '-' }}</td>
          </tr>
          
        </tbody>
      </table>
      
    </div>
    <TaskCardStatus
      class="px-1 flex-shrink-0"
      :status="task.status"
      :isAssigned="task.assignee != null"
    ></TaskCardStatus>
  </div>
</template>
<style scoped lang="scss">
  table {
    table-layout: fixed;
    border-collapse: collapse;
    tr {
      line-height: 14px;
      td {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      th {
        width: 80px;
        font-weight: 500;
        white-space: nowrap;
        text-align-last: justify;
        text-justify: inter-ideograph;
      }
      td {
        padding: 0px 10px;
        line-height: 14px;
      }
    }
  }
</style>
<script lang="ts">
import { IPrescript } from "@/types/Interfaces";
import { defineComponent, ref, SetupContext } from "vue";
import TaskCardStatus from './TaskCardStatus.vue';
import UserIcon from '@/components/UserIcon.vue'
import { getFormattedDate } from '@/mixins/dateUtils'

export default defineComponent({
  components: {
    TaskCardStatus,
    UserIcon
  },
  props: {
    task: Object as () => IPrescript,
    isActive: Boolean
  },
  setup(props: any, context: SetupContext){
    

    return {
      getFormattedDate,
    }
  }
})
</script>