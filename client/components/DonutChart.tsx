import React from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2'
import chroma from "chroma-js"

type DonutChartProps = {
    rawData: {labels?: string[], data?: number[]}
}

const DonutChart = (props: DonutChartProps) => {

    Chart.register(ArcElement, Tooltip, Legend);

    const colors = chroma.scale(['#623cad','#fb9ce5']).mode('lch').colors(props.rawData.data?.length);

    return (
        <Doughnut
        data={{
            labels: props.rawData.labels,
            datasets: [
                {
                    data: props.rawData.data,
                    borderWidth: [0],
                    // borderColor: ['#828DF8'],
                    backgroundColor: colors,
                }
        
            ]
        }}
        options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        boxWidth: 20,
                        padding: 5
                    },
                    position: 'right'
                }
            }
        }}
    />
  );
}

export default DonutChart;