import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import LineChart from "./LineChart";

type Props = {
  selectedApi: string
  apiMetrics: any;
};

const ApiMetrics: React.FC<Props> = ({ selectedApi, apiMetrics }: Props) => {

  // const selectedApiMetrics = selectedApi ? apiMetrics.selectedApi : null;
  const data = {
    "Latency": {
        "timestamps": [
            "2023-01-02T19:25:00.000Z"
        ],
        "values": [
            299
        ]
    },
    "Count": {
        "timestamps": [
            "2023-01-02T19:25:00.000Z"
        ],
        "values": [
            5
        ]
    },
    "5XXError": {
        "timestamps": [
            "2023-01-02T19:25:00.000Z"
        ],
        "values": [
            0
        ]
    },
    "4XXError": {
        "timestamps": [
            "2023-01-02T19:25:00.000Z"
        ],
        "values": [
            0
        ]
    }
}

  const makeCharts = (selectedApiMetrics: any) => {
    if (!selectedApiMetrics) return;
    const lineChartElements = [];
    for (let metric in selectedApiMetrics) {
      const timeValArr = [];
      const currMetricsObj = selectedApiMetrics[metric];
      for (let i in currMetricsObj.values) {
        const subElement: any = {
          y: currMetricsObj.values[i],
          x: new Date(currMetricsObj.timestamps[i]).toLocaleString([], {year: "numeric", month: "numeric", day: "numeric", hour: '2-digit', minute:'2-digit'}),
        };
        timeValArr.push(subElement);
      }
      lineChartElements.push(<LineChart key={Math.floor(Math.random()*1000)} rawData={timeValArr} label={metric} />)
    }
    
    return lineChartElements;
  }

  

  let chartElements;
  if (selectedApi) {
    console.log("apiMetrics.selectedApi", apiMetrics[selectedApi])
    chartElements = makeCharts(apiMetrics[selectedApi]);
  }


  return (
    <div>
      <div>Apis Metrics</div> 
      <div>
      {chartElements ? chartElements : 'unable to fetch data'}
      </div>
    </div>
  );
};

export default ApiMetrics;
