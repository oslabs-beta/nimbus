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
    const toggleDisplay = (e) => {
        if (e.target.value !== showInfo) {
            setShowInfo(e.target.value);
        }
    };
    const handleSelectedApi = (e) => {
        setSelectedApi(() => e.target.value);
        console.log(selectedApi);
    };
    const getApiRelations = (signal) => __awaiter(void 0, void 0, void 0, function* () {
        let res;
        try {
            res = yield fetch('/dashboard/apiRelations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/JSON',
                    authorization: `BEARER ${localStorage.getItem('accessToken')}`,
                    refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
                },
                signal
            });
            res = yield res.json();
            const apiRel = res.apiRelations || ['unable to fetch api relations'];
            setApiRelations(apiRel);
        }
        catch (err) {
            console.log("ERROR FROM GET API RELATIONS", err);
        }
    });
    const getApiMetrics = (signal) => __awaiter(void 0, void 0, void 0, function* () {
        let res;
        try {
            res = yield fetch('/dashboard/apiMetrics', {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/JSON',
                    authorization: `BEARER ${localStorage.getItem('accessToken')}`,
                    refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
                },
                signal
            });
            res = yield res.json();
            let metrics;
            if (res.allApiMetrics) {
                metrics = res.allApiMetrics;
                setSelectedApi(Object.keys(metrics)[0]);
            }
            else {
                metrics = ['unable to fetch api metrics'];
            }
            setApiMetrics(metrics);
        }
        catch (err) {
            console.log("ERROR FROM GET API METRICS", err);
        }
    });
    (0, react_1.useEffect)(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        if (!apiRelations) {
            getApiRelations(signal);
            console.log("getApiRelations invoked");
        }
        return () => {
            controller.abort();
        };
    }, []);
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
    (0, react_1.useEffect)(() => {
        console.log("API METRICS", apiMetrics);
        console.log("API RELATIONS", apiRelations);
        console.log("showInfo", showInfo);
    });
    const getApiNames = () => {
        return apiRelations.map((el) => {
            const currDivId = (0, uuid_1.v4)();
            return (react_1.default.createElement("button", { key: currDivId, id: currDivId, value: el.apiName, style: { fontWeight: selectedApi === el.apiName ? 'bold' : 'normal' }, onClick: handleSelectedApi }, el.apiName));
        });
    };
    return (react_1.default.createElement("div", null,
        "Apis",
        react_1.default.createElement("div", { style: { display: 'flex' } },
            react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'column', flexGrow: '1' } }, apiRelations ? getApiNames() : 'fetching apis'),
            react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: '3' } },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("button", { value: 'metrics', onClick: toggleDisplay }, "Metrics"),
                    react_1.default.createElement("button", { value: 'relations', onClick: toggleDisplay }, "Relations")),
                react_1.default.createElement("div", null, showInfo === 'metrics' ? react_1.default.createElement(ApiMetrics_1.default, { selectedApi: selectedApi, apiMetrics: apiMetrics })
                    : react_1.default.createElement(ApiRelations_1.default, { selectedApi: selectedApi, apiRelations: apiRelations }))))));
};
exports.default = Apis;
