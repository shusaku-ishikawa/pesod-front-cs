<template>
  <div class="w-full sm:py-3 text-sm">
    <div
      v-if="loadingHairRecords"
    >
      <div
        v-for="i in 3"
        :key="i"
        class="border-b border-gray-100 rounded-tr rouned-br rounded-bl p-2 w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
          <div class="flex-1 space-y-2 py-1">
            <div class="space-y-1">
              <div class="h-32 bg-blue-100 rounded"></div>
              
            </div>

          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="logByDate.length == 0">
        毛髪記録がありません。
      </div>
      <div
        v-for="(logSet, i) in logByDate"
        :key="i"
        class="px-3 mb-2 py-2 border-b border-gray-100"
      >
        <div class="text-left">
          {{ convertDate(logSet.date) }}
        </div>
        <div
          class="p-3"
        >
          <div class="mb-1 ">
            <img class="w-full rounded-lg shadow" :src="logSet.frontLog.image" alt="">
          </div>
          <div>
            <img class="w-full rounded-lg shadow" :src="logSet.topLog.image" alt="">
            
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script lang="ts">
import { computed, defineComponent, onMounted, SetupContext } from "vue";

import { IAnswer, IAnswerOption, IHairRecord, IPrescript } from "@/types/Interfaces";
import useHairRecord from '@/types/HairRecord';
import {uniq, cloneDeep} from 'lodash'
import moment from "moment";
export default defineComponent({
  components: {
  },
  props: {
    prescript: {
      type: Object as () => IPrescript
    },
    hairRecords: {
      type: Object as () => IHairRecord[]
    },
    loadingHairRecords: {
      type: Boolean
    }
  },
  setup(props: any, context: SetupContext) {
    const dates = computed(() => {
      const dList = props.hairRecords.map((r: any) => r.shooting_date)
      return uniq(dList)
    })
    const logByDate = computed(() => {
      const dates = props.hairRecords.map((l: any) => l.shooting_date);
      const datesList = [...new Set(dates)];
      const ret = datesList.map((d: any) => {
        const data = props.hairRecords.filter((l: any) => l.shooting_date == d)
        const front = data.find((d: any) => d.shooting_part == 0);
        const top = data.find((d: any) => d.shooting_part == 1);
        return {
          date: d,
          frontLog: cloneDeep(front),
          topLog: cloneDeep(top), 
        }
      });
      return ret;
    })
    const convertDate = (d: string) => {
      return moment(d).format('YYYY年M月D日')
    }
    const getRecordsByDate = (date: string) => {
      const rs = props.hairRecords.filter((r: any) => r.shooting_date == date)
      return [
        rs.find((r: any) => r.shooting_part == 0) || null,
        rs.find((r: any) => r.shooting_part == 1) || null, 
      ]
    }
    return {
      convertDate,
      dates,
      logByDate,
    };
  }
})
</script>
