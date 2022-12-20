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
const filters = ['allLogs', 'reports', 'errors'];
const Logs = () => {
    // use context from userContext
    // States: functions, logs, FILTERS: period (string)
    const [functions, setFunctions] = (0, react_1.useState)([]);
    const [selectedFunc, setSelectedFunc] = (0, react_1.useState)('');
    const [logs, setLogs] = (0, react_1.useState)(['Fetching logs...']);
    const [period, setPeriod] = (0, react_1.useState)('30d');
    // const [filter, setFilter] = useState<Filter>('allLogs');
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
    // const changeFilter = (e: any) => {
    //   setFilter(e.target.value);
    // };
    const changeSearch = (e) => {
        setSearch(e.target.value);
        if (filters.includes(e.target.value)) {
            console.log("filter works");
            getLogs();
        }
    };
    const changeSelectedFunc = (e) => {
        setSelectedFunc(e.target.value);
    };
    const getFunctions = () => __awaiter(void 0, void 0, void 0, function* () {
        let res;
        try {
            res = yield fetch(`${routes.functions}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/JSON',
                    authorization: `BEARER ${localStorage.getItem('accessToken')}`,
                    refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
                },
                body: JSON.stringify({}),
            });
            // convert response to JS object
            res = yield res.json();
        }
        catch (err) {
            console.log(err);
        }
        const funcArr = res.functions || ['unable to fetch lambda functions'];
        setFunctions(funcArr);
        setSelectedFunc(funcArr[0]);
    });
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
        }
        catch (err) {
            console.log(err);
        }
        // let logsArr;
        // if (logs[0] === 'Fetching logs...' && !res.logs) {
        //   logsArr = ['No logs found'];
        // }
        // else if (logs.length === 0 && !res.logs) {
        //   logsArr = ['Fetching logs...'];
        // }
        // else if (res.logs) {
        //   logsArr = res.logs;
        // }
        // console.log("LOGS ARRAY", logsArr);
        // let logsArr = res.logs || ['Fetching logs...']
        let logsArr = res.filteredLogs || ['Logs not found'];
        console.log("LOGS ARRAY", logsArr);
        setLogs(logsArr);
    });
    // On component mount: get all lambda functions
    (0, react_1.useEffect)(() => {
        getFunctions();
    }, []);
    // On state change selectedFunc, period, filter: get logs based on selected lambda func and options
    (0, react_1.useEffect)(() => {
        console.log("PERIOD", period);
        getLogs();
    }, [selectedFunc, period]);
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
                        react_1.default.createElement("button", { value: '30d', onClick: changePeriod }, "30D"),
                        react_1.default.createElement("button", { value: '14d', onClick: changePeriod }, "14D"),
                        react_1.default.createElement("button", { value: '7d', onClick: changePeriod }, "7D"),
                        react_1.default.createElement("button", { value: '1d', onClick: changePeriod }, "1D"),
                        react_1.default.createElement("button", { value: '1hr', onClick: changePeriod }, "1H")),
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
