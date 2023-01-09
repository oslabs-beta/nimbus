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
// Component to display a single function's metrics
const Function = (props) => {
    const [isClicked, setIsClicked] = (0, react_1.useState)(false);
    const [totalInvocations, setTotalInvocations] = (0, react_1.useState)(0);
    const [totalErrors, setTotalErrors] = (0, react_1.useState)(0);
    const [totalThrottles, setTotalThrottles] = (0, react_1.useState)(0);
    const [totalDuration, setTotalDuration] = (0, react_1.useState)(0);
    const [invocations, setInvocations] = (0, react_1.useState)([]);
    const [errors, setErrors] = (0, react_1.useState)([]);
    const [throttles, setThrottles] = (0, react_1.useState)([]);
    const [duration, setDuration] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        // If our metric array has at least one value, accumulate the values
        if (props.invocations.values.length > 0)
            setTotalInvocations(props.invocations.values.reduce((acc, curr) => acc + curr));
        if (props.errors.values.length > 0)
            setTotalErrors(props.errors.values.reduce((acc, curr) => acc + curr));
        if (props.throttles.values.length > 0)
            setTotalThrottles(props.throttles.values.reduce((acc, curr) => acc + curr));
        if (props.duration.values.length > 0)
            setTotalDuration(Math.ceil(props.duration.values.reduce((acc, curr) => acc + curr) / props.duration.values.length));
    }, []);
    // Create a function to convert our raw data into a format that ChartJS can use
    const convertToChartJSStructure = (rawData) => {
        const output = [];
        for (let i = rawData.values.length - 1; i >= 0; i--) {
            const subElement = {
                y: rawData.values[i],
                x: new Date(rawData.timestamp[i]).toLocaleString([], { year: "2-digit", month: "numeric", day: "numeric" })
            };
            output.push(subElement);
            // Get the date of the current iteration
            let date = new Date(rawData.timestamp[i]);
            // If the next day is less than the next date in our iteration push a value of 0 and the next day into our object
            if ((date.getTime() + 1) < (new Date(rawData.timestamp[i - 1])).getTime()) {
                date.setDate(date.getDate() + 1);
                while (date.getTime() < (new Date(rawData.timestamp[i - 1])).getTime()) {
                    const subElement = {
                        y: 0,
                        x: new Date(date).toLocaleString([], { year: "2-digit", month: "numeric", day: "numeric" })
                    };
                    output.push(subElement);
                    date.setDate(date.getDate() + 1);
                }
            }
        }
        return output;
    };
    // Generate the chart when the user clicks on the row
    const generateChart = () => {
        if (!isClicked) {
            setInvocations(convertToChartJSStructure(props.invocations));
            setErrors(convertToChartJSStructure(props.errors));
            setThrottles(convertToChartJSStructure(props.throttles));
            setDuration(convertToChartJSStructure(props.duration));
            setIsClicked(true);
        }
        else {
            setIsClicked(false);
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("tr", { className: "hover:brightness-90 w-[100%]", onClick: generateChart },
            react_1.default.createElement("td", { className: "bg-neutral text-center w-[20%]" }, props.funcName),
            react_1.default.createElement("td", { className: "bg-neutral text-center w-[20%]" }, totalInvocations),
            react_1.default.createElement("td", { className: "bg-neutral text-center w-[20%]" }, totalErrors),
            react_1.default.createElement("td", { className: "bg-neutral text-center w-[20%]" }, totalThrottles),
            react_1.default.createElement("td", { className: "bg-neutral text-center w-[20%]" }, totalDuration)),
        isClicked &&
            react_1.default.createElement("tr", { className: "w-[100%]" },
                react_1.default.createElement("td", { className: "bg-neutral w-[20%]" }),
                react_1.default.createElement("td", { className: "bg-neutral w-[20%]" },
                    react_1.default.createElement(LineChart_1.default, { rawData: invocations, label: 'Invocations' })),
                react_1.default.createElement("td", { className: "bg-neutral w-[20%]" },
                    react_1.default.createElement(LineChart_1.default, { rawData: errors, label: 'Errors' })),
                react_1.default.createElement("td", { className: "bg-neutral w-[20%]" },
                    react_1.default.createElement(LineChart_1.default, { rawData: throttles, label: 'Throttles' })),
                react_1.default.createElement("td", { className: "bg-neutral w-[20%]" },
                    react_1.default.createElement(LineChart_1.default, { rawData: duration, label: 'Duration' })))));
};
exports.default = Function;
