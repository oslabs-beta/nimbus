"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Layout_1 = __importDefault(require("./Layout"));
const Home_1 = __importDefault(require("../components/Home"));
const Functions_1 = __importDefault(require("../components/Functions"));
const Logs_1 = __importDefault(require("../components/Logs"));
const Apis_1 = __importDefault(require("../components/Apis"));
const Settings_1 = __importDefault(require("../components/Settings"));
// Conditional rendering of components: Home, Functions, Logs, APIs, Settings
const UserDashboard = () => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement("div", { className: "drawer drawer-mobile" },
                react_1.default.createElement("input", { id: "my-drawer-2", type: "checkbox", className: "drawer-toggle" }),
                react_1.default.createElement("div", { className: "drawer-content flex flex-col items-center py-12 relative" },
                    react_1.default.createElement(react_router_dom_1.Routes, null,
                        react_1.default.createElement(react_router_dom_1.Route, { path: '/', element: react_1.default.createElement(Home_1.default, null) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: 'functions', element: react_1.default.createElement(Functions_1.default, null) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: 'logs', element: react_1.default.createElement(Logs_1.default, null) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: 'apis', element: react_1.default.createElement(Apis_1.default, null) }),
                        react_1.default.createElement(react_router_dom_1.Route, { path: 'settings', element: react_1.default.createElement(Settings_1.default, null) })),
                    react_1.default.createElement("label", { htmlFor: "my-drawer-2", className: "btn btn-ghost btn-circle drawer-button lg:hidden absolute left-2 top-2" },
                        react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                            react_1.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 6h16M4 12h16M4 18h7" })))),
                react_1.default.createElement("div", { className: "drawer-side lg:bg-gray-800" },
                    react_1.default.createElement("label", { htmlFor: "my-drawer-2", className: "drawer-overlay" }),
                    react_1.default.createElement(Layout_1.default, null))))));
};
exports.default = UserDashboard;
