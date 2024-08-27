export const getChartConfig = (chartType, data) => ({
    type: chartType,
    data: {
      labels: ['Label 1', 'Label 2', 'Label 3'],
      datasets: [
        {
          data,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'right', // Position the legend on the right side
          labels: {
            boxWidth: 20,
            padding: 15,
          },
        },
      },
      layout: {
        padding: {
          right: 100, // Add space on the right for the legend
        },
      },
    },
  });
  