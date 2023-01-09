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
const uuid_1 = require("uuid");
const ApiMetrics_1 = __importDefault(require("./ApiMetrics"));
const ApiRelations_1 = __importDefault(require("./ApiRelations"));
const Apis = () => {
    const [apiRelations, setApiRelations] = (0, react_1.useState)(null);
    const [apiMetrics, setApiMetrics] = (0, react_1.useState)(null);
    const [selectedApi, setSelectedApi] = (0, react_1.useState)('');
    const [showInfo, setShowInfo] = (0, react_1.useState)('metrics');
    // Switch between metrics and relations
    const toggleDisplay = (e) => {
        if (e.target.value !== showInfo) {
            setShowInfo(e.target.value);
        }
    };
    // Change the selected api
    const handleSelectedApi = (e) => {
        setSelectedApi(() => e.target.value);
    };
    // Fetch Api relations data and set apiRelation state 
    const getApiRelations = (signal) => __awaiter(void 0, void 0, void 0, function* () {
        let res;
        try {
            res = yield fetch('/dashboard/apiRelations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/JSON',
                    authorization: `BEARER ${localStorage.getItem('accessToken')}`,
                },
                signal
            });
            res = yield res.json();
            // const apiRel = res.apiRelations || ['unable to fetch api relations'];
            const apiRel = res.apiRelations || undefined;
            setApiRelations(apiRel);
        }
        catch (err) {
            console.log("Error occurred grabbing API Relations: ", err);
        }
    });
    // Get api metrics and setApiMetrics
    // setSelectedApi to the first api in the metrics object
    const getApiMetrics = (signal) => __awaiter(void 0, void 0, void 0, function* () {
        let res;
        try {
            res = yield fetch('/dashboard/apiMetrics', {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/JSON',
                    authorization: `BEARER ${localStorage.getItem('accessToken')}`,
                },
                signal
            });
            res = yield res.json();
            let metrics;
            if (res.allApiMetrics) {
                metrics = res.allApiMetrics;
                setSelectedApi(Object.keys(metrics)[0]);
            }
            setApiMetrics(metrics);
        }
        catch (err) {
            console.log("Error occurred grabbing API Metrics: ", err);
        }
    });
    // Invoke getApiRelations if apiRelations if falsy
    (0, react_1.useEffect)(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        if (!apiRelations) {
            getApiRelations(signal);
        }
        return () => {
            controller.abort();
        };
    }, []);
    // Invoke getApiMetrics if apiMetrics if falsy
    (0, react_1.useEffect)(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        if (!apiMetrics) {
            getApiMetrics(signal);
        }
        return () => {
            controller.abort();
        };
    }, []);
    // Get API names and create and array of button elements
    const getApiNames = () => {
        return Object.keys(apiMetrics).map((el) => {
            return (react_1.default.createElement("li", { key: (0, uuid_1.v4)() },
                react_1.default.createElement("button", { value: el, className: selectedApi === el ? 'active' : '', onClick: handleSelectedApi }, el)));
        });
    };
    return (react_1.default.createElement("div", { className: 'w-full' },
        react_1.default.createElement("div", { className: 'flex flex-row' },
            react_1.default.createElement("ul", { className: 'menu mt-4 lg:mt-0 bg-base-100 w-3/12 p-2 rounded-box' },
                react_1.default.createElement("li", { key: 'menu-title', className: 'menu-title' },
                    react_1.default.createElement("span", { className: 'text-lg' }, "API list")),
                apiMetrics ? getApiNames() : ''),
            react_1.default.createElement("div", { className: 'flex flex-col w-9/12 justify-center gap-y-6' },
                react_1.default.createElement("div", { className: 'flex flex-row w-full justify-center gap-x-4' },
                    react_1.default.createElement("button", { className: `btn ${showInfo === 'metrics' ? 'btn-active' : ''} btn-ghost`, value: 'metrics', onClick: toggleDisplay }, "Metrics"),
                    react_1.default.createElement("button", { className: `btn ${showInfo === 'metrics' ? '' : 'btn-active'} btn-ghost`, value: 'relations', onClick: toggleDisplay }, "Relations")),
                react_1.default.createElement("div", { className: 'flex justify-center' }, showInfo === 'metrics' ? react_1.default.createElement(ApiMetrics_1.default, { selectedApi: selectedApi, apiMetrics: apiMetrics })
                    : react_1.default.createElement(ApiRelations_1.default, { selectedApi: selectedApi, apiRelations: apiRelations }))))));
};
exports.default = Apis;
