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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Login_js_1 = __importDefault(require("../components/Login.js"));
const Register_js_1 = __importDefault(require("../components/Register.js"));
// UserAuth component, displays login or register component depending on state
const UserAuth = ({ handleUserLogin, toggleTheme }) => {
    const [showLogin, setShowLogin] = (0, react_1.useState)(true);
    // Swap between login and register views
    const swapAuthView = () => {
        setShowLogin((showLogin) => !showLogin);
    };
    return (react_1.default.createElement("div", { className: "user-auth hero min-h-screen bg-base-150" }, showLogin === true ? react_1.default.createElement(Login_js_1.default, { handleUserLogin: handleUserLogin, swapAuthView: swapAuthView }) : react_1.default.createElement(Register_js_1.default, { handleUserLogin: handleUserLogin, swapAuthView: swapAuthView })));
};
exports.default = UserAuth;
