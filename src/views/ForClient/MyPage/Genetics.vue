<template>
  <base-layout>
    <template v-slot:title>
      <page-title>
        <div class="flex items-center absolute left-0">
          <page-title-back
            @click="() => { router.push({ name: 'MyPageTop' }) }"
          >
          </page-title-back>
          <div>マイページ</div>
        </div>
        遺伝子タイプ
      </page-title>
    </template>
    <div class="flex flex-col flex-grow py-5">
      <radar-chart></radar-chart>
      
    </div>
  </base-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { Radar } from 'vue-chartjs';
import RadarChart from './Genetics/RadarChart.vue';

export default defineComponent({
  components: {
    RadarChart
  },
  setup() {
    const router = useRouter();
    return {
      router
    }
  }
})
</script>