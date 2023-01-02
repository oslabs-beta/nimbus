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
const Function_1 = __importDefault(require("./Function"));
const uuid_1 = require("uuid");
const Functions = () => {
    const [funcMetrics, setFuncMetrics] = (0, react_1.useState)({});
    // Grab each functions metrics when the component mounts
    const grabFuncsMetrics = () => __awaiter(void 0, void 0, void 0, function* () {
        let response;
        response = yield fetch('/dashboard/funcmetrics', {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/JSON',
                authorization: `BEARER ${localStorage.getItem('accessToken')}`,
                refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
            },
        });
        response = yield response.json();
        setFuncMetrics(response.metrics);
    });
    (0, react_1.useEffect)(() => {
        grabFuncsMetrics();
    }, []);
    // Update to generate 4 charts of each metric
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("table", { className: "table" },
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { className: "bg-primary text-center" }, "Lambda Function"),
                    react_1.default.createElement("th", { className: "bg-primary text-center" }, "Invocations"),
                    react_1.default.createElement("th", { className: "bg-primary text-center" }, "Errors"),
                    react_1.default.createElement("th", { className: "bg-primary text-center" }, "Throttles"),
                    react_1.default.createElement("th", { className: "bg-primary text-center" }, "Duration (ms)"))),
            react_1.default.createElement("tbody", null, Object.entries(funcMetrics).map((funcMetric) => (react_1.default.createElement(Function_1.default, { key: (0, uuid_1.v4)(), funcName: funcMetric[0], invocations: funcMetric[1].invocations, errors: funcMetric[1].errors, throttles: funcMetric[1].throttles, duration: funcMetric[1].duration })))))));
};
exports.default = Functions;
