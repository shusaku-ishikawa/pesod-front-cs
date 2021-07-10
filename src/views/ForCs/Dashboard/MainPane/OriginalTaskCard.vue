<template>
  <div class="flex text-xs border shadow rounded-lg mx-4">
    <div style="background-color: #F6E88F" class="border-r rounded-tl-lg rounded-bl-lg flex flex-col justify-center p-2">
      エスカレーション要確認
    </div>
    <div class="flex flex-grow items-center p-2 rounded-tr-lg rounded-br-lg ">
      <table class="flex-grow ">
        <tbody>
          <tr>
            <th>開始日</th>
            <td>
              {{ getFormattedDate(task.created_at, 'YYYY/M/D') }}
            </td>
          </tr>
          <tr>
            <th>終了日</th>
            <td>
              {{ getFormattedDate(task.ended_at, 'YYYY/M/D') }}
            </td>
          </tr>
          <tr>
            <th>担当者</th>
            <td>
              {{ task.assignee.full_name }}
            </td>
          </tr>
          
        </tbody>
      </table>
      
      <ArrowRight class="w-3 h-3 mx-2" />

    </div>
  </div>
</template>
<style scoped lang="scss">
table {
    th,td {
      text-align: left;
      padding: 2px 5px;
      font-weight: 500;
    }
    th {
      white-space: nowrap;
    }
    td {
      width: 100%
    }
  }
</style>
<script lang="ts">
import { ITask } from '@/types/Interfaces'
import Vue, { defineComponent } from 'vue'
import { getFormattedDate } from '@/mixins/dateUtils';

export default defineComponent({
  props: {
    task: Object as () => ITask
  }, 
  setup() {
    return {
      getFormattedDate
    }
  }
})
</script>