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
const Logs = () => {
    // use context from userContext
    // States: functions, logs, FILTERS: period (string)
    const [functions, setFunctions] = (0, react_1.useState)([]);
    const [selectedFunc, setSelectedFunc] = (0, react_1.useState)('');
    const [logs, setLogs] = (0, react_1.useState)([]);
    const [period, setPeriod] = (0, react_1.useState)('30d');
    const [filter, setFilter] = (0, react_1.useState)('allLogs');
    const [search, setSearch] = (0, react_1.useState)('');
    const changePeriod = (e) => {
        setPeriod(e.target.value);
        console.log(period);
    };
    const changeFilter = (e) => {
        setFilter(e.target.value);
        console.log(filter);
    };
    const changeSearch = (e) => {
        setSearch(e.target.value);
        console.log(search);
    };
    // get function names
    const getFunctions = () => __awaiter(void 0, void 0, void 0, function* () {
        // const accessToken = localStorage.getItem('accessToken');
        // const refreshToken = localStorage.getItem('refreshToken');
        const res = yield fetch('/dashboard/functions', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON',
                authorization: `BEARER ${localStorage.getItem('accessToken')}`,
                refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
            },
            body: JSON.stringify({}),
        });
        const funcArr = yield res.json();
        console.log('FUNC ARRAY', funcArr);
        // setFunctions(funcArr)
    });
    // useEffect
    (0, react_1.useEffect)(() => {
        getFunctions();
    }, []);
    // get logs based on the function that's clicked
    // Get function
    // Get logs
    const getLogs = () => {
        // const logs = fetch('/POST');
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", null, "Logs"),
        react_1.default.createElement("div", { className: 'logs-container', style: { display: 'flex', gap: '2rem' } },
            react_1.default.createElement("div", { className: 'logs-functions' }, "functions"),
            react_1.default.createElement("div", { className: 'logs-logs' },
                react_1.default.createElement("div", { className: 'logs-filters' },
                    react_1.default.createElement("div", { className: 'logs-options-period', style: { display: 'flex', gap: '1rem' } },
                        react_1.default.createElement("button", { value: '30d', onClick: changePeriod }, "30D"),
                        react_1.default.createElement("button", { value: '14d', onClick: changePeriod }, "14D"),
                        react_1.default.createElement("button", { value: '7d', onClick: changePeriod }, "7D"),
                        react_1.default.createElement("button", { value: '1d', onClick: changePeriod }, "1D"),
                        react_1.default.createElement("button", { value: '1h', onClick: changePeriod }, "1H")),
                    react_1.default.createElement("div", { className: 'logs-options-filters' },
                        react_1.default.createElement("button", { value: 'allLogs', onClick: changeFilter }, "All logs"),
                        react_1.default.createElement("button", { value: 'reports', onClick: changeFilter }, "Reports"),
                        react_1.default.createElement("button", { value: 'errors', onClick: changeFilter }, "Errors")),
                    react_1.default.createElement("div", { className: 'logs-options-search' },
                        react_1.default.createElement("input", { onChange: changeSearch }),
                        react_1.default.createElement("button", { onClick: getLogs }, "Search"))),
                "logs"))));
};
exports.default = Logs;
