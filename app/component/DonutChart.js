import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';



const colors = [
    'rgb(255, 99, 132)', // Deep red
    'rgb(54, 162, 235)', // Deep blue
    'rgb(255, 206, 86)', // Deep yellow
    'rgb(75, 192, 192)', // Deep teal
    'rgb(153, 102, 255)',// Deep purple
    'rgb(255, 159, 64)', // Deep orange
    'rgb(233, 30, 99)',  // Deep pink
    'rgb(33, 150, 243)', // Deep light blue
    'rgb(0, 188, 212)',  // Deep cyan
    'rgb(156, 39, 176)', // Deep violet
    'rgb(255, 87, 34)',  // Deep red-orange
    'rgb(0, 150, 136)',  // Deep teal-green
  ];
  

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ dataPoints }) => {
    // Generate colors based on data points
  
    const backgroundColors = colors.slice(0, dataPoints.length);
  
    const data = {
     
      datasets: [
        {
          label: 'balance',
          data: dataPoints,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors,
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Dynamic Donut Chart',
        },
      },
      animation: {
        duration: 2000,
        easing: 'easeInOutQuart',
      },
    };
  
    return <Doughnut data={data} options={options} />;
  };
  
  export default DonutChart;
