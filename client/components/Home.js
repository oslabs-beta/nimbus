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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const emptyData = {
    values: undefined,
    timestamp: undefined,
};
const Home = () => {
    // Initialize a variable in state to hold D3 data
    // to do invocations only for now
    const [d3Data, setD3Data] = (0, react_1.useState)([]);
    // const [invocationsData, setInvocations] = useState(emptyData);
    // const [errorsData, setErrors] = useState<subMetrics>(emptyData);
    // const [throttlesData, setThrottles] = useState<subMetrics>(emptyData);
    // const [durationData, setDurations] = useState<subMetrics>(emptyData);
    const [invocationsData, setInvocations] = (0, react_1.useState)({});
    const [errorsData, setErrors] = (0, react_1.useState)({});
    const [throttlesData, setThrottles] = (0, react_1.useState)({});
    const [durationData, setDurations] = (0, react_1.useState)({});
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
    const convertToD3Structure = (rawData) => {
        const output = [];
        for (let key of rawData.values) {
            const subElement = {
                values: rawData.values[key],
                timestamp: rawData.timestamp[key],
            };
            output.push(subElement);
        }
        return output;
    };
    // Invokes the getMetrics function
    (0, react_1.useEffect)(() => {
        getMetrics();
    }, []);
    // useEffect(() => {
    //   setD3Data(convertToD3Structure(invocationsData));
    // }, [invocationsData]);
    console.log(invocationsData, "INVOCATIONS");
    console.log(errorsData, "ERRORS");
    console.log(throttlesData, "THROTTLES");
    console.log(durationData, "DURATION");
    return (react_1.default.createElement("div", null, "Home"));
};
exports.default = Home;
// Declare dimensions for the graphs
const width = 600;
const height = 400;
const margin = { top: 20, right: 30, bottom: 30, left: 40 };
