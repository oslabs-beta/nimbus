"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("chartjs-adapter-moment");
const chart_js_1 = require("chart.js");
const react_chartjs_2_1 = require("react-chartjs-2");
// props: LineChartProps
const LineChart = (props) => {
    // const rawdata = [
    //   { 'x': 'Mon', 'y': 1 }, 
    //   { 'x': 'Tue', 'y': 2 }, 
    //   { 'x': 'Wed', 'y': 3 }, 
    //   { 'x': 'Thur', 'y': 4 }, 
    //   { 'x': 'Fri', 'y': 5 }
    // ];
    chart_js_1.Chart.register(chart_js_1.CategoryScale, chart_js_1.TimeScale, chart_js_1.LinearScale, chart_js_1.PointElement, chart_js_1.LineElement, chart_js_1.Title, chart_js_1.Tooltip, chart_js_1.Legend);
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
    };
    return (react_1.default.createElement("div", null,
        " Line Chart",
        react_1.default.createElement("div", null,
            react_1.default.createElement(react_chartjs_2_1.Line, { data: data }))));
};
exports.default = LineChart;
