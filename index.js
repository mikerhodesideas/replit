// index.js

let initialCost = 1000;
let initialRevenue = 2000;
let initialCOGS = 0.5;
let currentCost, currentRevenue, currentCOGS;

document.addEventListener('DOMContentLoaded', () => {
  initializeControls();
  resetToInitial();
  updateChart();
});

function initializeControls() {
  document.getElementById('costSlider').addEventListener('input', updateChart);
  document.getElementById('revenueSlider').addEventListener('input', updateChart);
  document.getElementById('cogsSlider').addEventListener('input', updateChart);
  
  document.getElementById('increase20').addEventListener('click', () => adjustCost(1.2));
  document.getElementById('increase50').addEventListener('click', () => adjustCost(1.5));
  document.getElementById('increase100').addEventListener('click', () => adjustCost(2));
  document.getElementById('maximizeProfit').addEventListener('click', maximizeProfit);
  document.getElementById('reset').addEventListener('click', resetToInitial);

  // Initialize input fields
  document.getElementById('initialCost').addEventListener('change', (e) => {
    initialCost = parseFloat(e.target.value);
    resetToInitial();
  });
  document.getElementById('initialRevenue').addEventListener('change', (e) => {
    initialRevenue = parseFloat(e.target.value);
    resetToInitial();
  });
  document.getElementById('initialCOGS').addEventListener('change', (e) => {
    initialCOGS = parseFloat(e.target.value) / 100;
    resetToInitial();
  });
}

function updateChart() {
  currentCost = parseFloat(document.getElementById('costSlider').value);
  currentRevenue = parseFloat(document.getElementById('revenueSlider').value);
  currentCOGS = parseFloat(document.getElementById('cogsSlider').value) / 100;

  const data = calculateData();
  updateMainChart(data);
  updateThumbnailCharts(data);
  updateTable(data);
  updateComparisonTable(data);
}

function calculateData() {
  const dataPoints = 100;
  const step = currentCost / dataPoints;
  
  let data = [];
  for (let i = 0; i <= dataPoints; i++) {
    const cost = i * step;
    const revenue = predictRevenue(cost);
    const profit = calculateProfit(revenue, cost);
    const roas = calculateROAS(revenue, cost);
    const poas = calculatePOAS(profit, cost);
    
    data.push({
      spend: cost,
      revenuePrediction: revenue,
      roasAverage: roas,
      incrementalROAS: i > 0 ? (revenue - data[i-1].revenuePrediction) / (cost - data[i-1].spend) : roas,
      incrementalRevenue: i > 0 ? revenue - data[i-1].revenuePrediction : revenue,
      totalProfit: profit,
      incrementalProfit: i > 0 ? profit - data[i-1].totalProfit : profit,
      incrementalCOGS: i > 0 ? (revenue - data[i-1].revenuePrediction) * currentCOGS : revenue * currentCOGS,
      incrementalSpend: i > 0 ? cost - data[i-1].spend : cost
    });
  }
  
  return data;
}

function predictRevenue(cost) {
  return initialRevenue * Math.sqrt(cost / initialCost);
}

function calculateProfit(revenue, cost) {
  return revenue * (1 - currentCOGS) - cost;
}

function calculateROAS(revenue, cost) {
  return revenue / cost;
}

function calculatePOAS(profit, cost) {
  return profit / cost;
}

function adjustCost(factor) {
  const newCost = currentCost * factor;
  document.getElementById('costSlider').value = newCost;
  updateChart();
}

function maximizeProfit() {
  const data = calculateData();
  const maxProfitPoint = data.reduce((max, point) => point.totalProfit > max.totalProfit ? point : max);
  document.getElementById('costSlider').value = maxProfitPoint.spend;
  updateChart();
}

function resetToInitial() {
  document.getElementById('costSlider').value = initialCost;
  document.getElementById('revenueSlider').value = initialRevenue;
  document.getElementById('cogsSlider').value = initialCOGS * 100;
  updateChart();
}

// Chart update functions will be implemented in a separate file