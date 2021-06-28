<template>
  <div
    :class="{ 'hover:bg-blue-100 cursor-pointer ': prescript.status != 3 }"
    class="mb-1  border flex w-full items-center p-2 px-4 rounded-tr rounded-br rounded-bl"
  >
    <table
      class="border-collapsed w-full ">
      <tbody
      >
        <tr
          
        >
          <th class="whitespace-nowrap">診察ID:</th>
          <td class="px-2" style="text-overflow: ellipsis;">{{ prescript.id }}</td>
        </tr>
        <tr

        >
          <th>診察日:</th>
          <td class="px-2">{{ prescript.prescript_date }}</td>
        </tr>
        
      </tbody>
    
    </table>
    <prescript-card-status
      class="mx-2"
      :status="prescript.status"
    ></prescript-card-status>
    <div class="flex-shrink-0 w-5 text-center">
      <arrow-right class="mx-auto" v-if="prescript.status != 3"></arrow-right>
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

