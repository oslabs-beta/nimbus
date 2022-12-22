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
    const [functions, setFunctions] = (0, react_1.useState)([]);
    const [selectedFunc, setSelectedFunc] = (0, react_1.useState)('');
    const [logs, setLogs] = (0, react_1.useState)(['Fetching logs...']);
    const [period, setPeriod] = (0, react_1.useState)('30d');
    const [search, setSearch] = (0, react_1.useState)('');
    const routes = {
        functions: '/dashboard/functions',
        logs: '/dashboard/filteredLogs'
    };
    // Change options
    const changePeriod = (e) => {
        if (e.target.value !== period) {
            setPeriod(e.target.value);
        }
    };
    const changeSearch = (e) => {
        if (e.target.value === 'allLogs') {
            setSearch('');
        }
        else if (e.target.value === 'reports') {
            setSearch('REPORT');
        }
        else if (e.target.value === 'errors') {
            setSearch('ERROR');
        }
        else {
            setSearch(e.target.value);
        }
    };
    const changeSelectedFunc = (e) => {
        if (e.target.value !== selectedFunc) {
            setSelectedFunc(e.target.value);
        }
    };
    // Get the names of Lambda functions in a string[], setFunctions to result and setSelectedFunc to first function
    const getFunctions = () => __awaiter(void 0, void 0, void 0, function* () {
        let res;
        try {
            res = yield fetch(`${routes.functions}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/JSON',
                    authorization: `BEARER ${localStorage.getItem('accessToken')}`,
                    refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
                },
            });
            // convert response to JS object
            res = yield res.json();
            const funcArr = res.functions || ['unable to fetch lambda functions'];
            setFunctions(funcArr);
            setSelectedFunc(funcArr[0]);
        }
        catch (err) {
            console.log("ERROR FROM GET FUNCTIONS", err);
        }
    });
    // Fetch logs for the selectedFunc in a string[] and setLogs
    const getLogs = () => __awaiter(void 0, void 0, void 0, function* () {
        let res;
        const reqBody = { functionName: selectedFunc, filterPattern: search, period: period };
        console.log(reqBody);
        try {
            res = yield fetch(`${routes.logs}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/JSON',
                    authorization: `BEARER ${localStorage.getItem('accessToken')}`,
                    refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
                },
                body: JSON.stringify(reqBody),
            });
            // convert response to JS object
            res = yield res.json();
            let logsArr = res.filteredLogs || ['Logs not found'];
            console.log("LOGS ARRAY", logsArr);
            setLogs(logsArr);
        }
        catch (err) {
            console.log("ERROR FROM GET LOGS", err);
        }
    });
    // On component mount: get all lambda functions
    (0, react_1.useEffect)(() => {
        console.log("first useEffct");
        getFunctions();
    }, []);
    // On state change selectedFunc, period, search: get logs based on selected lambda func and options
    (0, react_1.useEffect)(() => {
        console.log("second useEffct");
        console.log("PERIOD", period);
        if (selectedFunc !== '') {
            getLogs();
        }
    }, [selectedFunc, period, search]);
    const logsList = logs.map((log, i) => react_1.default.createElement("div", { key: `log-${i}`, className: 'logs-log-event' }, log));
    const functionsList = functions.map((func, i) => react_1.default.createElement("button", { key: `func-${i}`, onClick: changeSelectedFunc, value: func, className: 'logs-function-name' }, func));
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", null, "Logs"),
        react_1.default.createElement("div", { className: 'logs-container', style: { display: 'flex', gap: '2rem' } },
            react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'column' }, className: 'logs-functions' },
                "functions",
                functionsList),
            react_1.default.createElement("div", { className: 'logs-logs' },
                react_1.default.createElement("div", { className: 'logs-filters' },
                    react_1.default.createElement("div", { className: 'logs-options-period', style: { display: 'flex', gap: '1rem' } },
                        react_1.default.createElement("button", { id: '30d', value: '30d', onClick: changePeriod }, "30D"),
                        react_1.default.createElement("button", { id: '14d', value: '14d', onClick: changePeriod }, "14D"),
                        react_1.default.createElement("button", { id: '7d', value: '7d', onClick: changePeriod }, "7D"),
                        react_1.default.createElement("button", { id: '1d', value: '1d', onClick: changePeriod }, "1D"),
                        react_1.default.createElement("button", { id: '1hr', value: '1hr', onClick: changePeriod }, "1H")),
                    react_1.default.createElement("div", { className: 'logs-options-filters' },
                        react_1.default.createElement("button", { value: 'allLogs', onClick: changeSearch }, "All logs"),
                        react_1.default.createElement("button", { value: 'reports', onClick: changeSearch }, "Reports"),
                        react_1.default.createElement("button", { value: 'errors', onClick: changeSearch }, "Errors")),
                    react_1.default.createElement("div", { className: 'logs-options-search' },
                        react_1.default.createElement("input", { onChange: changeSearch }),
                        react_1.default.createElement("button", { onClick: getLogs }, "Search"))),
                "logs",
                logsList))));
};
exports.default = Logs;
