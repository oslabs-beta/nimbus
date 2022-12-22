import React, { useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

type RawData = {
  y: number,
  x: Date,
}; 

type LineChartProps = {
  rawData : Array<RawData>,
  label : string,
};

const LineChart = (props: LineChartProps) => {
  
  ChartJS.register(
    CategoryScale,
    TimeScale,
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
        tension: 0.1,
      },
    ]
  };

  return (
        <div> Total {props.label}
            <Line data = {data}/>
        </div>
  );
};

export default LineChart;