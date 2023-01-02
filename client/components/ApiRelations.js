"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ApiRelations = ({ selectedApi, apiRelations }) => {
    // "apiName": "nimbusTest2",
    //           "endpoints": {
    //               "/": [
    //                   {
    //                       "method": "POST",
    //                       "func": "myNextFunc"
    //                   },
    //                   {
    //                       "method": "DELETE",
    //                       "func": "myNewFunc2"
    //                   },
    //                   {
    //                       "method": "GET",
    //                       "func": "myGegeFunc"
    //                   }
    //               ]
    //           }
    const selectedApiRelations = typeof apiRelations[0] !== 'string' && selectedApi ?
        apiRelations.filter((apiRel) => apiRel.apiName === selectedApi)
        : null;
    console.log("selectedApiRelations", selectedApiRelations);
    const endpoints = selectedApiRelations[0].endpoints || null;
    console.log("endpoints", endpoints);
    // const displayRelations = () => {
    //   let rels;
    //   if (!selectedApiRelations) {
    //     rels = null;
    //   }
    //   else {
    //     rels = [];
    //     selectedApiRelations.forEach((el:any) => {
    //       rels.push(<div key={uuidv4()}>el</div>)
    //     })
    //   }
    // }
    // get endpoints 
    // for each key in endpoints
    // create a div
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
                null));
};
exports.default = ApiRelations;
