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
const ApiRelations = ({ selectedApi, apiRelations }) => {
    const [message, setMessage] = (0, react_1.useState)('fetching data...');
    // If data not found, set message
    if (apiRelations === undefined || selectedApi === '') {
        if (message !== 'data not found') {
            setMessage('data not found');
        }
    }
    // Grab data for the selected API; if not found set to null
    const selectedApiRelations = apiRelations
        && selectedApi
        ?
            apiRelations.filter((apiRel) => apiRel.apiName === selectedApi)
        : null;
    // Get endpoints data
    const endpoints = selectedApiRelations && selectedApiRelations.length > 0 ? selectedApiRelations[0].endpoints : null;
    console.log("endpoints", endpoints);
    return (react_1.default.createElement("div", null, endpoints ?
        react_1.default.createElement("div", { className: 'flex flex-col gap-y-4' }, Object.keys(endpoints).map((key) => {
            return (react_1.default.createElement("div", { className: 'card w-96 bg-gray-800 shadow-xl', key: key },
                react_1.default.createElement("div", { className: "card-body" },
                    react_1.default.createElement("h2", { className: "card-title text-accent text-lg font-bold" }, key),
                    react_1.default.createElement("ul", { className: '' }, endpoints[key].map((item) => {
                        return (react_1.default.createElement("li", { key: item.method, className: 'my-2' },
                            react_1.default.createElement("div", { className: 'bg-gray-700 py-2 px-4 rounded-lg border-0' },
                                react_1.default.createElement("div", null,
                                    "Method: ",
                                    item.method,
                                    react_1.default.createElement("svg", { className: "inline", style: { width: '1.5rem', fill: '#9ca3af', margin: '0rem .5rem' }, focusable: "false", "aria-hidden": "true", viewBox: "0 0 24 24", "data-testid": "ArrowForwardIcon", "aria-label": "fontSize large" },
                                        react_1.default.createElement("path", { d: "m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" })),
                                    "Function: ",
                                    item.func))));
                    })))));
        }))
        :
            message));
};
exports.default = ApiRelations;
