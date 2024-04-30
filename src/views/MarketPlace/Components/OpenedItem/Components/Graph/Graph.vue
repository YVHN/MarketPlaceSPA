<template>
  <div class="graph">
    <canvas class="graph-body" ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  mounted() {
    this.renderChart();
  },
  props: {
    graphData: {
      type: Array,
      required: false,
    },
  },
  methods: {
    // Функция для форматирования значений оси Y
    formatYValue(value) {
      if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + 'M$';
      }
      return value + '$';
    },
    renderChart() {
      const chartCanvas = this.$refs.chartCanvas;
      const ctx = chartCanvas.getContext('2d');
      const labels = [];
      const amounts = [];
      this.graphData.forEach((unit) => labels.push(unit.date));
      this.graphData.forEach((unit) => amounts.push(unit.amount));

      new Chart(ctx, {
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
                // Использую функцию форматирования
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
};
</script>

<style lang="scss" src="./Graph.scss" scoped></style>
