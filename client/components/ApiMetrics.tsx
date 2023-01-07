import React, { useState, useEffect } from 'react';
import LineChart from "./LineChart";

type Props = {
  selectedApi: string
  apiMetrics: any;
};

interface SelectedApiMetrics {
  Latency: { timestamps: Date[], values: number[] },
  Count: { timestamps: Date[], values: number[] },
  '5XXError': { timestamps: Date[], values: number[] },
  '4XXError': { timestamps: Date[], values: number[] }
}

type Metric = 'Latency' | 'Count' | '5XXError' | '4XXError';

type Message = 'fetching data...' | 'data not found';

// Display the metrics for the selected API
const ApiMetrics: React.FC<Props> = ({ selectedApi, apiMetrics }: Props) => {
  const [message, setMessage] = useState<Message>('fetching data...');
  
  // If data not found, set message
  if (apiMetrics === undefined) {
    if (message !== 'data not found') {
      setMessage('data not found')
    }
  }

  // Make chart for each metric for the selected API
  const makeCharts = (selectedApiMetrics: SelectedApiMetrics) => {
    if (!selectedApiMetrics) return;
    // Declare array to store the LineChart elements
    const lineChartElements = [];
    // Loop over each metric 
    for (let metric in selectedApiMetrics) {
      const timeValArr = [];
      const currMetricsObj = selectedApiMetrics[metric as Metric];
      // Loop over data points: value and timestamp
      for (let i in currMetricsObj.values) {
        const subElement: any = {
          y: currMetricsObj.values[i],
          x: new Date(currMetricsObj.timestamps[i]).toLocaleString([], {year: "2-digit", month: "numeric", day: "numeric"}),
        };
        timeValArr.push(subElement);
      }
      // Add lineChart element to array
      lineChartElements.push(
        <div key={metric} className="card w-72 bg-neutral shadow-xl">
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
      <div className='flex justify-center flex-wrap gap-3'>
        {chartElements ? chartElements : message}
      </div>
    </div>
  );
};

export default ApiMetrics;
