"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const LineChart_1 = __importDefault(require("./LineChart"));
const ApiMetrics = ({ selectedApi, apiMetrics }) => {
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
    };
    const makeCharts = (selectedApiMetrics) => {
        if (!selectedApiMetrics)
            return;
        const lineChartElements = [];
        for (let metric in selectedApiMetrics) {
            const timeValArr = [];
            const currMetricsObj = selectedApiMetrics[metric];
            for (let i in currMetricsObj.values) {
                const subElement = {
                    y: currMetricsObj.values[i],
                    x: new Date(currMetricsObj.timestamps[i]).toLocaleString([], { year: "numeric", month: "numeric", day: "numeric", hour: '2-digit', minute: '2-digit' }),
                };
                timeValArr.push(subElement);
            }
            lineChartElements.push(react_1.default.createElement(LineChart_1.default, { key: Math.floor(Math.random() * 1000), rawData: timeValArr, label: metric }));
        }
        return lineChartElements;
    };
    let chartElements;
    if (selectedApi) {
        console.log("apiMetrics.selectedApi", apiMetrics[selectedApi]);
        chartElements = makeCharts(apiMetrics[selectedApi]);
    }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", null, "Apis Metrics"),
        react_1.default.createElement("div", null, chartElements ? chartElements : 'unable to fetch data')));
};
exports.default = ApiMetrics;
