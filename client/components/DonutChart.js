"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const chart_js_1 = require("chart.js");
const react_chartjs_2_1 = require("react-chartjs-2");
const DonutChart = (props) => {
    chart_js_1.Chart.register(chart_js_1.ArcElement, chart_js_1.Tooltip, chart_js_1.Legend);
    console.log(props.rawData);
    return (react_1.default.createElement(react_chartjs_2_1.Doughnut, { data: {
            labels: props.rawData.labels,
            datasets: [
                {
                    data: props.rawData.data,
                    borderColor: ['rgb(130,141,248,0.2)'],
                    backgroundColor: ['rgba(232,99,132,1)',
                        'rgba(232,211,6,1)',
                        'rgba(54,162,235,1)',
                        'rgba(255,159,64,1)',
                        'rgba(153,102,255,1)'],
                }
            ]
        }, options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        } }));
};
exports.default = DonutChart;
