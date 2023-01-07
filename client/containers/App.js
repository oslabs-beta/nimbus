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
const react_daisyui_1 = require("react-daisyui");
const UserAuth_1 = __importDefault(require("./UserAuth"));
const UserDashboard_1 = __importDefault(require("./UserDashboard"));
const HeadBar_1 = __importDefault(require("../components/HeadBar"));
// App (root) component
const App = () => {
    const [userLoggedIn, setUserLoggedIn] = (0, react_1.useState)(false);
    const [theme, setTheme] = react_1.default.useState('myThemeDark');
    const handleUserLogin = () => {
        setUserLoggedIn((userLoggedIn) => !userLoggedIn);
    };
    const toggleTheme = () => {
        setTheme(theme === 'myThemeDark' ? 'myThemeLight' : 'myThemeDark');
    };
    // If user is logged in, render UserDashboard component, otherwise render UserAuth component
    return (react_1.default.createElement(react_daisyui_1.Theme, { dataTheme: theme },
        react_1.default.createElement(HeadBar_1.default, { toggleTheme: toggleTheme, theme: theme }),
        react_1.default.createElement("div", { className: 'app' }, userLoggedIn ? (react_1.default.createElement(UserDashboard_1.default, { handleUserLogin: handleUserLogin, toggleTheme: toggleTheme })) : (react_1.default.createElement(UserAuth_1.default, { handleUserLogin: handleUserLogin, toggleTheme: toggleTheme })))));
};
exports.default = App;
