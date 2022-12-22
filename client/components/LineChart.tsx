import React, { useState, useEffect } from "react";
import "chartjs-adapter-moment";
import {
    Chart as ChartJS,
    CategoryScale,
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Line } from "react-chartjs-2";



type RawData = {
  y: number,
  x: Date,
}; 

// type d3Data = Array<RawData>;
// 
type LineChartProps = {
  rawData : Array<RawData>,
};
// props: LineChartProps

const LineChart = (props: LineChartProps) => {
  
  // const rawdata = [
  //   { 'x': 'Mon', 'y': 1 }, 
  //   { 'x': 'Tue', 'y': 2 }, 
  //   { 'x': 'Wed', 'y': 3 }, 
  //   { 'x': 'Thur', 'y': 4 }, 
  //   { 'x': 'Fri', 'y': 5 }
  // ];

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
        label: "My First Dataset",
        data: props.rawData,
        fill: false,
        borderColor: [
          "rgb(75, 192, 192)",
        ],
        tension: 0.1,
      },
    ]
  }


    return (
        <div> Line Chart

          <div>
            <Line
            data = {data}
            
            />

          </div>
        </div>
    )
};

export default LineChart;