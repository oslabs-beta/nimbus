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
const react_router_dom_1 = require("react-router-dom");
// import Link component from react router here
const Layout = () => {
    const [selectedTab, setSelectedTab] = (0, react_1.useState)('Home');
    return (react_1.default.createElement("ul", { className: 'menu bg-gray-800 w-56 rounded-box lg:rounded-none h-fit lg:h-full' },
        react_1.default.createElement("li", { onClick: () => setSelectedTab('Home') },
            react_1.default.createElement(react_router_dom_1.Link, { to: '/', className: selectedTab === 'Home' ? 'active' : '' }, "Home")),
        react_1.default.createElement("li", { onClick: () => setSelectedTab('Functions') },
            react_1.default.createElement(react_router_dom_1.Link, { to: '/functions', className: selectedTab === 'Functions' ? 'active' : '' }, "Functions")),
        react_1.default.createElement("li", { onClick: () => setSelectedTab('Logs') },
            react_1.default.createElement(react_router_dom_1.Link, { to: '/logs', className: selectedTab === 'Logs' ? 'active' : '' }, "Logs")),
        react_1.default.createElement("li", { onClick: () => setSelectedTab('APIs') },
            react_1.default.createElement(react_router_dom_1.Link, { to: '/apis', className: selectedTab === 'APIs' ? 'active' : '' }, "APIs")),
        react_1.default.createElement("li", { onClick: () => setSelectedTab('Settings') },
            react_1.default.createElement(react_router_dom_1.Link, { to: '/settings', className: selectedTab === 'Settings' ? 'active' : '' }, "Settings"))));
};
exports.default = Layout;
