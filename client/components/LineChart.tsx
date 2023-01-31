import React from "react";
import { Chart, CategoryScale, TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { RawData, LineChartProps } from "../types";

const LineChart = (props: LineChartProps) => {
  
  // Registers plugins to be applied on all charts
  Chart.register(
    TimeScale,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend 
  );

  // Set chart data
  const data = {
    datasets: [
      {
        label: props.label,
        data: props.rawData,
        fill: false,
        borderColor: [
          "#fb9ce5",
        ],
        tension: 0.3,
      },
    ]
  };

  return (
    <Line data = {data} options = {{
      responsive: true,
      maintainAspectRatio: false,
    }}/>
  );
};

export default LineChart;