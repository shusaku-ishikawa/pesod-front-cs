<template>
  <div
    class="canvas-wrapper p-7"
  >
    <canvas
      ref="canvas"
      width="100"
      height="100"
    >
      
    </canvas>
  </div>
</template>
<style lang="scss">
  .canvas-wrapper {
    background-image: url('/img/simulation-radar.png');
    background-size: 100% 100%;
    
  }
</style>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Chart from 'chart.js';

export default defineComponent({
  setup() {
    const canvas = ref<HTMLCanvasElement | null>(null);
    const createChart = (chartData: object) => {
      if (canvas.value == null) return;
      const options = {
        type: 'radar',
        data: chartData,
        options: {
          responsive: true,
          // maintainAspectRatio: false,
          legend: {
            display: false,
          },
          tooltips: {
            enabled: false, 
          },
          scale: {
            ticks: {
              min: 0,
              max: 6,
              stepSize:1,
              fontSize: 12,
            },
            angleLines: {
              display: false
            },
          }
        }
      }
      new Chart(canvas.value, options)
    };
    onMounted(() => {
      console.log('hello world ')
      createChart({
        labels: ['', '', '', '', "", ""],
        datasets: [
          {
            label: '',
            data: [2, 1.5, 5, 4.5, 5.5, 4.5],
            backgroundColor: "rgba(128, 148, 160, 0.7)",
            borderColor: "#8094A0",
            pointStyle: "circle",
            pointRadius: 1,
            borderWidth: 1,
          },
          {
            label: '',
            data: [0, 0, 0, 0, 0, 0],
            pointStyle: "circle",
            pointRadius: 1,
            borderWidth: 1,
          }
        ]
      })
    })
    return {
      canvas
    }
  }
});
</script>