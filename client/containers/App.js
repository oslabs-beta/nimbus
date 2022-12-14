"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const UserAuth_1 = __importDefault(require("./UserAuth"));
const App = () => {
    return (react_1.default.createElement("div", { className: 'app' },
        react_1.default.createElement(UserAuth_1.default, null)));
};
exports.default = App;
