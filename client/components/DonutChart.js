"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const chart_js_1 = require("chart.js");
const react_chartjs_2_1 = require("react-chartjs-2");
const chroma_js_1 = __importDefault(require("chroma-js"));
const DonutChart = (props) => {
    var _a;
    chart_js_1.Chart.register(chart_js_1.ArcElement, chart_js_1.Tooltip, chart_js_1.Legend);
    const colors = chroma_js_1.default.scale(['#4f46e5', '#F471B5']).mode('lch').colors((_a = props.rawData.data) === null || _a === void 0 ? void 0 : _a.length);
    return (react_1.default.createElement(react_chartjs_2_1.Doughnut, { data: {
            labels: props.rawData.labels,
            datasets: [
                {
                    data: props.rawData.data,
                    borderWidth: [0],
                    // borderColor: ['#828DF8'],
                    backgroundColor: colors,
                }
            ]
        }, options: {
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
        } }));
};
exports.default = DonutChart;
