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
const react_router_dom_1 = require("react-router-dom");
const Layout_1 = __importDefault(require("./Layout"));
const Home_1 = __importDefault(require("../components/Home"));
const Functions_1 = __importDefault(require("../components/Functions"));
const Logs_1 = __importDefault(require("../components/Logs"));
const Apis_1 = __importDefault(require("../components/Apis"));
const Settings_1 = __importDefault(require("../components/Settings"));
const UserDashboard = ({ handleUserLogin, toggleTheme }) => {
    const [data, setData] = (0, react_1.useState)([]);
    //   const swapAuthView = () => {
    //     setShowLogin((showLogin) => !showLogin);
    //   }
    const getData = () => __awaiter(void 0, void 0, void 0, function* () {
        // const refreshToken = localStorage.getItem('refreshToken')
        // if (refreshToken) request.setHeader('refresh', `BEARER ${refreshToken}`);
        const data = yield fetch('/verifyToken', {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/JSON',
                authorization: `BEARER ${localStorage.getItem('accessToken')}`,
                refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
            },
        });
        const res = yield data.json();
        console.log(res, 'RESPONSE FROM VERIFYING');
        if (!res.accessToken) {
            handleUserLogin();
        }
        console.log(res);
        setData(res);
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement("div", { className: "drawer drawer-mobile" },
                react_1.default.createElement("input", { id: "my-drawer-2", type: "checkbox", className: "drawer-toggle" }),
                react_1.default.createElement("div", { className: "drawer-content flex flex-col items-center justify-center" },
                    react_1.default.createElement(react_router_dom_1.Routes, null,
                        react_1.default.createElement(react_router_dom_1.Route, { path: '/', element: react_1.default.createElement(Home_1.default, null) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: 'functions', element: react_1.default.createElement(Functions_1.default, null) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: 'logs', element: react_1.default.createElement(Logs_1.default, null) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: 'apis', element: react_1.default.createElement(Apis_1.default, null) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: 'settings', element: react_1.default.createElement(Settings_1.default, null) })),
                    react_1.default.createElement("label", { htmlFor: "my-drawer-2", className: "btn btn-primary drawer-button lg:hidden" }, "Open drawer")),
                react_1.default.createElement("div", { className: "drawer-side" },
                    react_1.default.createElement("label", { htmlFor: "my-drawer-2", className: "drawer-overlay" }),
                    react_1.default.createElement(Layout_1.default, null))))));
};
exports.default = UserDashboard;
