<template>
  <div class="graph">
    <canvas class="graph-body" ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import { parseDate } from '@/functions/marketplace';

export default {
  mounted() {
    this.renderChart();
  },
  props: {
    graphData: {
      type: Object,
      required: true,
    },
  },
  watch: {
    graphData() {
      this.renderChart();
    },
  },
  methods: {
    // Function to format Y-axis values
    formatYValue(value) {
      if (value >= 1000000) {
        return (value / 1000000).toFixed(0) + 'M$';
      }
      return value + '$';
    },
    renderChart() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      const chartCanvas = this.$refs.chartCanvas;
      const ctx = chartCanvas.getContext('2d');
      const labels = [];
      const amounts = [];
      if(!this.graphData && !Object.keys(this.graphData).length) {
        
      }
      else if(this.graphData?.data) {
        this.graphData.data.forEach((unit) => labels.push(parseDate(unit.date, this.getDateFormatType)));
        this.graphData.data.forEach((unit) => amounts.push(unit.amount));
      }

      this.chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              data: amounts,
              backgroundColor: 'transparent',
              borderColor: '#5FD8DF',
              borderWidth: 2,
              pointBackgroundColor: '#A1FAFF',
              pointBorderColor: '#5FD8DF',
              pointBorderWidth: 1,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              display: true,
              position: 'top',
              ticks: {
                color: 'rgba(255, 255, 255, 0.18)',
                padding: 20,
              },
              grid: {
                color: '#d0d5dd',
              },
            },
            y: {
              display: true,
              ticks: {
                color: '#5fdf6c',
                padding: 20,
                // Use the formatting function
                callback: this.formatYValue,
              },
              grid: {
                color: '#d0d5dd',
              },
            },
          },
          dir: 'ltr',
        },
      });
    },
  },
  data() {
    return {
      chartInstance: null,
    };
  },
  computed: {
    getDateFormatType() {
     const types = {
      year: 'month',
      month: 'default',
      week: 'day',
      day: 'time'
     }
     return types[this.graphData?.type] || 'default';
   }
  }
};
</script>

<style lang="scss" src="./Graph.scss" scoped></style>
