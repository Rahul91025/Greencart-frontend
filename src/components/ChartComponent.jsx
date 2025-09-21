import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent = ({ labels, data, title }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)', 
          'rgba(239, 68, 68, 0.8)',  
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: function(context) {
            return context[0].label;
          },
          label: function(context) {
            return `Count: ${context.parsed.y}`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
        ticks: {
          color: 'rgba(0, 0, 0, 0.6)',
          font: {
            size: 12,
            weight: '500',
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(0, 0, 0, 0.6)',
          font: {
            size: 12,
            weight: '500',
          },
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 8,
      }
    }
  };

  return (
    <div className="relative h-80">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;