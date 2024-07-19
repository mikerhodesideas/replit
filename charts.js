// charts.js

let mainChart, thumbnailCharts;

function initializeCharts() {
  mainChart = new Chart(document.getElementById('mainChart'), {
    type: 'line',
    data: { datasets: [] },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: 'Spend' } },
        y: { title: { display: true, text: 'Value' } }
      }
    }
  });

  const thumbnailCanvases = document.querySelectorAll('.thumbnail-chart');
  thumbnailCharts = Array.from(thumbnailCanvases).map(canvas => new Chart(canvas, {
    type: 'line',
    data: { datasets: [] },
    options: {
      responsive: true,
      scales: { x: { display: false }, y: { display: false } },
      plugins: { legend: { display: false } }
    }
  }));
}

function updateMainChart(data) {
  const datasets = [
    {
      label: 'Total Profit',
      data: data.map(d => ({ x: d.spend, y: d.totalProfit })),
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    },
    {
      label: 'Revenue Prediction',
      data: data.map(d => ({ x: d.spend, y: d.revenuePrediction })),
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1
    },
    {
      label: 'Incremental Revenue',
      data: data.map(d => ({ x: d.spend, y: d.incrementalRevenue })),
      borderColor: 'rgb(54, 162, 235)',
      tension: 0.1
    }
  ];

  mainChart.data.datasets = datasets;
  mainChart.update();
}

function updateThumbnailCharts(data) {
  const chartConfigs = [
    { data: d => ({ x: d.spend, y: d.incrementalRevenue }), label: 'Incremental Revenue' },
    { data: d => ({ x: d.spend, y: d.revenuePrediction }), label: 'Revenue vs. Spend' },
    { data: d => ({ x: d.roasAverage, y: d.totalProfit }), label: 'Profit vs. ROAS' },
    { data: d => ({ x: d.spend, y: d.totalProfit }), label: 'Profit vs. Spend' }
  ];

  thumbnailCharts.forEach((chart, index) => {
    const config = chartConfigs[index];
    chart.data.datasets = [{
      label: config.label,
      data: data.map(config.data),
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }];
    chart.update();
  });
}

// Call this function after the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCharts);