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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const LineChart_1 = __importDefault(require("./LineChart"));
const Home = () => {
    const [invocationsData, setInvocations] = (0, react_1.useState)([]);
    const [errorsData, setErrors] = (0, react_1.useState)([]);
    const [throttlesData, setThrottles] = (0, react_1.useState)([]);
    const [durationData, setDurations] = (0, react_1.useState)([]);
    const route = '/dashboard/allMetrics';
    // Sends a GET request to the '/dashboard/allMetrics' route
    // Uses ReactHooks in order to change the states based on data received from AWS
    const getMetrics = () => __awaiter(void 0, void 0, void 0, function* () {
        let res;
        try {
            res = yield fetch(route, {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/JSON',
                    authorization: `BEARER ${localStorage.getItem('accessToken')}`,
                    refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
                },
            });
            res = yield res.json();
            setInvocations(convertToD3Structure({
                values: res.metrics.invocations.values,
                timestamp: res.metrics.invocations.timestamp
            }));
            setErrors(convertToD3Structure({
                values: res.metrics.errors.values,
                timestamp: res.metrics.errors.timestamp
            }));
            setThrottles(convertToD3Structure({
                values: res.metrics.throttles.values,
                timestamp: res.metrics.throttles.timestamp
            }));
            setDurations(convertToD3Structure({
                values: res.metrics.duration.values,
                timestamp: res.metrics.duration.timestamp
            }));
        }
        catch (error) {
            console.log(error);
        }
    });
    // The data retrieved from the back end is converted to an array of objects to be compatible with D3
    const convertToD3Structure = (rawData) => {
        const output = [];
        for (let key in rawData.values) {
            const subElement = {
                y: rawData.values[key],
                x: new Date(rawData.timestamp[key]).toLocaleString([], { year: "numeric", month: "numeric", day: "numeric", hour: '2-digit', minute: '2-digit' }),
            };
            output.push(subElement);
        }
        return output;
    };
    // Invokes the getMetrics function
    (0, react_1.useEffect)(() => {
        getMetrics();
    }, []);
    return (react_1.default.createElement("div", { className: 'grid grid-cols-1 grid-rows-4 lg:grid-cols-2 lg:grid-rows-2 w-full' },
        react_1.default.createElement(LineChart_1.default, { rawData: invocationsData, label: 'Invocations' }),
        react_1.default.createElement(LineChart_1.default, { rawData: errorsData, label: 'Errors' }),
        react_1.default.createElement(LineChart_1.default, { rawData: throttlesData, label: 'Throttles' }),
        react_1.default.createElement(LineChart_1.default, { rawData: durationData, label: 'Duration' })));
};
exports.default = Home;
