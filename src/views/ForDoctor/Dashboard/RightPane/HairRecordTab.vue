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
    
      <div
        v-for="(d, i) in dates"
        :key="i"
        class="px-3 mb-2 py-2 border-b border-gray-100"
      >
        <div class="text-left">
          {{ d }}
        </div>
        <div
          class="mb-1"
          v-for="(r, i) in getRecordsByDate(d)"
          :key="i"
        >
          
          <img v-if="r" :src="r.image" alt="">
          <img v-if="r == null && i == 0" src="@/assets/img/monshin_photo_A.png" alt="">
          <img v-if="r == null && i == 1" src="@/assets/img/monshin_photo_B.png" alt="">
          
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
import {uniq} from 'lodash'
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
    const getRecordsByDate = (date: string) => {
      const rs = props.hairRecords.filter((r: any) => r.shooting_date == date)
      return [
        rs.find((r: any) => r.shooting_part == 0) || null,
        rs.find((r: any) => r.shooting_part == 1) || null, 
      ]
    }
    return {
      dates,
      getRecordsByDate,
    };
  }
})
</script>
