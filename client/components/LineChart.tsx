import React, { useState, useEffect } from "react";
import { Chart , CategoryScale, TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

type RawData = {
  y: number,
  x: string,
}; 

type LineChartProps = {
  rawData : Array<RawData>,
  label : string,
};

const LineChart = (props: LineChartProps) => {
  
  // Registers plugins to be applied on all charts
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend 
  );

  const data = {
    datasets: [
      {
        label: props.label,
        data: props.rawData,
        fill: false,
        borderColor: [
          "rgb(75, 192, 192)",
        ],
        tension: 0.3,
      },
    ]
  };
  
  return (
    <div> 
      <Line data = {data} />
    </div>
  );
};

export default LineChart;