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
    // const [buttonIsActive, setButtonIsActive] = useState(false);
    // const [buttonState, setButtonState] = useState({
    //   activeObject: null,
    //   objects: functionsList,
    // });
    const [selectedTimeButton, setSelectedTimeButton] = (0, react_1.useState)('30d');
    const [selectedLogsButton, setSelectedLogsButton] = (0, react_1.useState)('All logs');
    const [selectedFunctionButton, setSelectedFunctionButton] = (0, react_1.useState)('');
    const routes = {
        functions: '/dashboard/functions',
        logs: '/dashboard/filteredLogs',
    };
    // Change period
    const changePeriod = (e) => {
        if (e.target.value !== period) {
            setPeriod(e.target.value);
        }
    };
    // Change search keyword
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
                },
            });
            // convert response to JS object
            res = yield res.json();
            console.log('RES.FUNCTIONS', res.functions);
            // func arr is an array of strings (function names)
            const funcArr = res.functions || ['unable to fetch lambda functions'];
            // change functions to be array with all function names
            setFunctions(funcArr);
            //
            setSelectedFunc(funcArr[0]);
            setSelectedFunctionButton(funcArr[0]);
        }
        catch (err) {
            console.log('ERROR FROM GET FUNCTIONS', err);
        }
    });
    // Fetch logs for the selectedFunc in a string[] and setLogs
    const getLogs = () => __awaiter(void 0, void 0, void 0, function* () {
        let res;
        const reqBody = {
            functionName: selectedFunc,
            filterPattern: search,
            period: period,
        };
        console.log(reqBody);
        try {
            res = yield fetch(`${routes.logs}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/JSON',
                    authorization: `BEARER ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify(reqBody),
            });
            // convert response to JS object
            res = yield res.json();
            let logsArr = res.filteredLogs || ['Logs not found'];
            console.log('LOGS ARRAY', logsArr);
            setLogs(logsArr);
        }
        catch (err) {
            console.log('ERROR FROM GET LOGS', err);
        }
    });
    // On component mount: get all lambda functions
    (0, react_1.useEffect)(() => {
        console.log('first useEffect');
        getFunctions();
        //setSelectedFunctionButton(functions[0]);
    }, []);
    // On state change selectedFunc, period, search: get logs based on selected lambda func and options
    (0, react_1.useEffect)(() => {
        console.log('second useEffect');
        console.log('PERIOD', period);
        if (selectedFunc !== '') {
            getLogs();
        }
    }, [selectedFunc, period, search]);
    const logsList = logs.map((log, i) => (react_1.default.createElement("tr", null,
        react_1.default.createElement("th", null, i + 1),
        react_1.default.createElement("td", { className: 'whitespace-nowrap text-ellipsis max-w-7xl' }, log))
    // overflow-hidden
    ));
    /* <div key={`log-${i}`} className='logs-log-event overflow-x-auto'>
    <table className='table table-compact w-full'>
    <thead>
      <tr>
        <th></th>
        <th>Logs</th>
      </tr>
    </thead>
    <tbody>
      
    </tbody>
  </table>
  </div> */
    // ['func1', 'func2, 'func3']
    const functionsList = functions.map((funcStr, i) => (react_1.default.createElement("option", null, funcStr)));
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: 'logs-logs flex flex-col space-y-8 w-full px-8' },
            react_1.default.createElement("div", { className: 'logs-filters flex justify-between gap-8 w-full' },
                react_1.default.createElement("select", { className: 'select select-primary w-full max-w-fit', onChange: changeSelectedFunc }, functionsList),
                react_1.default.createElement("div", { className: 'btn-group' },
                    react_1.default.createElement("button", { className: selectedTimeButton === '30d' ? 'btn btn-active' : 'btn', id: '30d', value: '30d', onClick: (e) => {
                            changePeriod(e);
                            setSelectedTimeButton('30d');
                        } }, "30D"),
                    react_1.default.createElement("button", { className: selectedTimeButton === '14d' ? 'btn btn-active' : 'btn', id: '14d', value: '14d', onClick: (e) => {
                            changePeriod(e);
                            setSelectedTimeButton('14d');
                        } }, "14D"),
                    react_1.default.createElement("button", { className: selectedTimeButton === '7d' ? 'btn btn-active' : 'btn', id: '7d', value: '7d', onClick: (e) => {
                            changePeriod(e);
                            setSelectedTimeButton('7d');
                        } }, "7D"),
                    react_1.default.createElement("button", { className: selectedTimeButton === '1d' ? 'btn btn-active' : 'btn', id: '1d', value: '1d', onClick: (e) => {
                            changePeriod(e);
                            setSelectedTimeButton('1d');
                        } }, "1D"),
                    react_1.default.createElement("button", { className: selectedTimeButton === '1hr' ? 'btn btn-active' : 'btn', id: '1hr', value: '1hr', onClick: (e) => {
                            changePeriod(e);
                            setSelectedTimeButton('1hr');
                        } }, "1H")),
                react_1.default.createElement("div", { className: 'btn-group' },
                    react_1.default.createElement("button", { className: selectedLogsButton === 'All logs' ? 'btn btn-active' : 'btn', value: 'allLogs', onClick: (e) => {
                            changeSearch(e);
                            setSelectedLogsButton('All logs');
                        } }, "All Logs"),
                    react_1.default.createElement("button", { className: selectedLogsButton === 'Reports' ? 'btn btn-active' : 'btn', value: 'reports', onClick: (e) => {
                            changeSearch(e);
                            setSelectedLogsButton('Reports');
                        } }, "Reports"),
                    react_1.default.createElement("button", { className: selectedLogsButton === 'Errors' ? 'btn btn-active' : 'btn', value: 'errors', onClick: (e) => {
                            changeSearch(e);
                            setSelectedLogsButton('Errors');
                        } }, "Errors")),
                react_1.default.createElement("div", { className: 'form-control' },
                    react_1.default.createElement("div", { className: 'input-group' },
                        react_1.default.createElement("input", { type: 'text', placeholder: 'Search\u2026', className: 'input input-bordered', onChange: changeSearch }),
                        react_1.default.createElement("button", { className: 'btn btn-square', onClick: getLogs },
                            react_1.default.createElement("svg", { xmlns: 'http://www.w3.org/2000/svg', className: 'h-6 w-6', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' },
                                react_1.default.createElement("path", { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' })))))),
            react_1.default.createElement("div", { className: 'flex flex-row justify-center gap-8 w-full' },
                react_1.default.createElement("div", { className: 'logs-log-event overflow-x-auto w-full' },
                    react_1.default.createElement("table", { className: 'table table-compact w-full' },
                        react_1.default.createElement("thead", { className: 'w-full' },
                            react_1.default.createElement("tr", { className: 'w-full' },
                                react_1.default.createElement("th", { className: 'bg-primary w-[5%]' }),
                                react_1.default.createElement("th", { className: 'bg-primary w-[95%]' }, "Logs"))),
                        react_1.default.createElement("tbody", null, logsList)))))));
};
exports.default = Logs;
