import React from "react";
import "chartjs-adapter-moment";
import { Chart, CategoryScale, TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,} from "chart.js";
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-moment';

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
    TimeScale,
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
          "#F471B5",
        ],
        tension: 0.3,
      },
    ]
  };

  return (
    <Line data = {data} options = {{
      responsive: true,
      maintainAspectRatio: false,
      // scales: {
      //   x: {
      //     type: 'time',
      //   }
      // }
    }}/>
  );
};

export default LineChart;