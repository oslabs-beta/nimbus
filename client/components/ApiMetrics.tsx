import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import LineChart from "./LineChart";

type Props = {
  selectedApi: string
  apiMetrics: any;
};

// interface SelectedApiMetrics {
//   Latency: { timestamps: Date[], values: number[] },
//   Count: { timestamps: Date[], values: number[] },
//   '5XXError': { timestamps: Date[], values: number[] },
//   '4XXError': { timestamps: Date[], values: number[] }
// }

type Message = 'fetching data...' | 'data not found';

const ApiMetrics: React.FC<Props> = ({ selectedApi, apiMetrics }: Props) => {
  const [message, setMessage] = useState<Message>('fetching data...');
  
  // If data not found, set message
  if (apiMetrics === undefined) {
    if (message !== 'data not found') {
      setMessage('data not found')
    }
  }

  // Make chart for each metric for the selected API
  const makeCharts = (selectedApiMetrics: any) => {
    if (!selectedApiMetrics) return;
    // Declare array to store the LineChart elements
    const lineChartElements = [];
    // Loop over each metric 
    for (let metric in selectedApiMetrics) {
      const timeValArr = [];
      const currMetricsObj = selectedApiMetrics[metric];
      // Loop over data points: value and timestamp
      for (let i in currMetricsObj.values) {
        const subElement: any = {
          y: currMetricsObj.values[i],
          x: new Date(currMetricsObj.timestamps[i]).toLocaleString([], {year: "numeric", month: "numeric", day: "numeric", hour: '2-digit', minute:'2-digit'}),
        };
        timeValArr.push(subElement);
      }
      // Add lineChart element to array
      lineChartElements.push(
        <div key={metric} className="card w-76 bg-gray-800 shadow-xl">
          <div className="card-body">
            <LineChart key={`${metric}-chart`} rawData={timeValArr} label={metric} />
           </div>
        </div> 
      )
    }
    return lineChartElements;
  }

  

  let chartElements;
  // Make chart if there is a selected API
  if (selectedApi) {
    console.log("apiMetrics.selectedApi", apiMetrics[selectedApi])
    chartElements = makeCharts(apiMetrics[selectedApi]);
  }


  return (
    <div>
      {/* <div>Apis Metrics</div>  */}
      <div className='flex justify-center flex-wrap gap-3'>
        {chartElements ? chartElements : message}
      </div>
    </div>
  );
};

export default ApiMetrics;
