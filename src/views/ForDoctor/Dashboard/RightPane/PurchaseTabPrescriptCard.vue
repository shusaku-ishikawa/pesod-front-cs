<template>
  <div
    class="mb-1 cursor-pointer border hover:bg-blue-100 flex w-full items-center p-2 px-4 rounded-tr rounded-br rounded-bl"
  >
    <table
      class="border-collapsed w-full ">
      <tbody
      >
        <tr
          
        >
          <th class="whitespace-nowrap">診察ID</th>
          <td class="px-2" style="text-overflow: ellipsis;">{{ prescript.id }}</td>
        </tr>
        <tr

        >
          <th>診察日</th>
          <td class="px-2">{{ prescript.prescript_date }}</td>
        </tr>
        
      </tbody>
    
    </table>
    <prescript-card-status
      class="mx-2"
      :status="prescript.status"
    ></prescript-card-status>
    <div class="flex-shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
    </div>
  </div>
</template>
<style scoped lang="scss">
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
</style>
<script lang="ts">
import { IPrescript } from "@/types/Interfaces";
import { defineComponent, ref, SetupContext } from "vue";
import PrescriptCardStatus from './PurchaseTabPrescriptCardStatus.vue'

export default defineComponent({
  components: {
    PrescriptCardStatus,
  },
  props: {
    prescript: Object as () => IPrescript
  },
  setup(props: any, context: SetupContext) {
    
    return {}
  }
})
</script>

