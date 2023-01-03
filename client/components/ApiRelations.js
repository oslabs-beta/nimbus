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
    if (Array.isArray(apiRelations) && typeof apiRelations[0] === 'string') {
        setMessage('data not found');
    }
    // Grab data for the selected API
    const selectedApiRelations = apiRelations
        && selectedApi
        ?
            apiRelations.filter((apiRel) => apiRel.apiName === selectedApi)
        : null;
    console.log("selectedApiRelations", selectedApiRelations);
    // Get endpoints data
    const endpoints = selectedApiRelations && selectedApiRelations.length > 0 ? selectedApiRelations[0].endpoints : null;
    console.log("endpoints", endpoints);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", null, "Apis Relations"),
        endpoints ?
            react_1.default.createElement("div", null,
                react_1.default.createElement("div", null, "Endpoints"),
                Object.keys(endpoints).map((key) => {
                    return (react_1.default.createElement("div", { key: key },
                        react_1.default.createElement("b", null,
                            "'",
                            key,
                            "'"),
                        react_1.default.createElement("ul", null, endpoints[key].map((item) => {
                            return (react_1.default.createElement("li", { key: item.method },
                                react_1.default.createElement("div", null,
                                    "Method: ",
                                    item.method),
                                react_1.default.createElement("div", null,
                                    "Function: ",
                                    item.func)));
                        }))));
                }))
            :
                message));
};
exports.default = ApiRelations;
