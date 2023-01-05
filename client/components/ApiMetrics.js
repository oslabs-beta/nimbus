"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const LineChart_1 = __importDefault(require("./LineChart"));
const ApiMetrics = ({ selectedApi, apiMetrics }) => {
    const [message, setMessage] = (0, react_1.useState)('fetching data...');
    // If data not found, set message
    if (Array.isArray(apiMetrics) && typeof apiMetrics[0] === 'string') {
        setMessage('data not found');
    }
    // Make chart for each metric for the selected API
    const makeCharts = (selectedApiMetrics) => {
        if (!selectedApiMetrics)
            return;
        // Declare array to store the LineChart elements
        const lineChartElements = [];
        // Loop over each metric 
        for (let metric in selectedApiMetrics) {
            const timeValArr = [];
            const currMetricsObj = selectedApiMetrics[metric];
            // Loop over data points: value and timestamp
            for (let i in currMetricsObj.values) {
                const subElement = {
                    y: currMetricsObj.values[i],
                    x: new Date(currMetricsObj.timestamps[i]).toLocaleString([], { year: "numeric", month: "numeric", day: "numeric", hour: '2-digit', minute: '2-digit' }),
                };
                timeValArr.push(subElement);
            }
            // Add lineChart element to array
            lineChartElements.push(
            // <div className="card w-full bg-gray-800 shadow-xl">
            //   <div className="card-body">
            react_1.default.createElement(LineChart_1.default, { key: metric, rawData: timeValArr, label: metric })
            //* </div>
            //</div> *
            );
        }
        return lineChartElements;
    };
    let chartElements;
    // Make chart if there is a selected API
    if (selectedApi) {
        console.log("apiMetrics.selectedApi", apiMetrics[selectedApi]);
        chartElements = makeCharts(apiMetrics[selectedApi]);
    }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: 'flex justify-center flex-wrap' }, chartElements ? chartElements : message)));
};
exports.default = ApiMetrics;
