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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Function = (props) => {
    const [totalInvocations, setTotalInvocations] = (0, react_1.useState)(0);
    const [totalErrors, setTotalErrors] = (0, react_1.useState)(0);
    const [totalThrottles, setTotalThrottles] = (0, react_1.useState)(0);
    const [totalDuration, setTotalDuration] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        // If our metric array has at least one value, accumulate the values
        if (props.invocations.values[0])
            setTotalInvocations(props.invocations.values.reduce((acc, curr) => acc + curr));
        if (props.errors.values[0])
            setTotalErrors(props.errors.values.reduce((acc, curr) => acc + curr));
        if (props.throttles.values[0])
            setTotalThrottles(props.throttles.values.reduce((acc, curr) => acc + curr));
        if (props.duration.values[0])
            setTotalDuration(Math.ceil(props.duration.values.reduce((acc, curr) => acc + curr)));
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
<<<<<<< HEAD
        react_1.default.createElement("tr", { onClick: generateChart },
            react_1.default.createElement("td", { className: "bg-neutral text-center" }, props.funcName),
            react_1.default.createElement("td", { className: "bg-neutral text-center" }, totalInvocations),
            react_1.default.createElement("td", { className: "bg-neutral text-center" }, totalErrors),
            react_1.default.createElement("td", { className: "bg-neutral text-center" }, totalThrottles),
            react_1.default.createElement("td", { className: "bg-neutral text-center" }, totalDuration)),
        isClicked &&
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", { className: "bg-neutral" }),
                react_1.default.createElement("td", { className: "bg-neutral" },
                    react_1.default.createElement(LineChart_1.default, { rawData: invocations, label: 'Invocations' })),
                react_1.default.createElement("td", { className: "bg-neutral" },
                    react_1.default.createElement(LineChart_1.default, { rawData: errors, label: 'Errors' })),
                react_1.default.createElement("td", { className: "bg-neutral" },
                    react_1.default.createElement(LineChart_1.default, { rawData: throttles, label: 'Throttles' })),
                react_1.default.createElement("td", { className: "bg-neutral" },
                    react_1.default.createElement(LineChart_1.default, { rawData: duration, label: 'Duration' })))));
=======
        react_1.default.createElement("td", null, props.funcName),
        react_1.default.createElement("td", null, totalInvocations),
        react_1.default.createElement("td", null, totalErrors),
        react_1.default.createElement("td", null, totalThrottles),
        react_1.default.createElement("td", null, totalDuration)));
>>>>>>> dev
};
exports.default = Function;
