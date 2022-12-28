"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
// import Link component from react router here
const Layout = () => {
    return (react_1.default.createElement("div", { className: 'dashboard-layout' },
        react_1.default.createElement("div", { className: 'dashboard-nav' },
            react_1.default.createElement("nav", { className: 'dashboard-nav-list' },
                react_1.default.createElement("ul", { className: 'menu bg-base-100 w-56 rounded-box' },
                    react_1.default.createElement("li", null,
                        react_1.default.createElement(react_router_dom_1.Link, { to: '/' }, "Home")),
                    react_1.default.createElement("li", null,
                        react_1.default.createElement(react_router_dom_1.Link, { to: '/functions' }, "Functions")),
                    react_1.default.createElement("li", null,
                        react_1.default.createElement(react_router_dom_1.Link, { to: '/logs' }, "Logs")),
                    react_1.default.createElement("li", null,
                        react_1.default.createElement(react_router_dom_1.Link, { to: '/apis' }, "APIs")),
                    react_1.default.createElement("li", null,
                        react_1.default.createElement(react_router_dom_1.Link, { to: '/settings' }, "Settings")))))));
};
exports.default = Layout;
