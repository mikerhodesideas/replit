// tables.js

function updateComparisonTable(data) {
    const table = document.getElementById('comparisonTable');
    const currentData = data[data.length - 1];
    const initialData = data[0];
  
    const rows = [
      { metric: 'Cost', initial: initialData.spend, adjusted: currentData.spend },
      { metric: 'Revenue', initial: initialData.revenuePrediction, adjusted: currentData.revenuePrediction },
      { metric: 'COGS', initial: initialData.revenuePrediction * currentCOGS, adjusted: currentData.revenuePrediction * currentCOGS },
      { metric: 'ROAS', initial: initialData.roasAverage, adjusted: currentData.roasAverage },
      { metric: 'Profit', initial: initialData.totalProfit, adjusted: currentData.totalProfit },
      { metric: 'POAS', initial: initialData.totalProfit / initialData.spend, adjusted: currentData.totalProfit / currentData.spend }
    ];
  
    table.innerHTML = `
      <tr>
        <th>Metric</th>
        <th>Initial</th>
        <th>Adjusted</th>
        <th>Incremental</th>
      </tr>
      ${rows.map(row => `
        <tr>
          <td>${row.metric}</td>
          <td>${formatNumber(row.initial)}</td>
          <td>${formatNumber(row.adjusted)}</td>
          <td>${formatNumber(row.adjusted - row.initial)}</td>
        </tr>
      `).join('')}
    `;
  }
  
  
  function updateTable(data) {
    const table = document.getElementById('dataTable');
    table.innerHTML = `
      <tr>
        <th>Spend</th>
        <th>Revenue Prediction</th>
        <th>ROAS Average</th>
        <th>Incremental ROAS</th>
        <th>Incremental Revenue</th>
        <th>Total Profit</th>
        <th>Incremental Profit</th>
        <th>Incremental COGS</th>
        <th>Incremental Spend</th>
      </tr>
      ${data.filter((_, i) => i % 10 === 0).map(row => `
        <tr>
          <td>${formatNumber(row.spend)}</td>
          <td>${formatNumber(row.revenuePrediction)}</td>
          <td>${formatNumber(row.roasAverage)}</td>
          <td>${formatNumber(row.incrementalROAS)}</td>
          <td>${formatNumber(row.incrementalRevenue)}</td>
          <td>${formatNumber(row.totalProfit)}</td>
          <td>${formatNumber(row.incrementalProfit)}</td>
          <td>${formatNumber(row.incrementalCOGS)}</td>
          <td>${formatNumber(row.incrementalSpend)}</td>
        </tr>
      `).join('')}
    `;
  }
  
  function formatNumber(num) {
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }