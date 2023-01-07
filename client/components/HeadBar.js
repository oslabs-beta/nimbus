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
// HeadBar component
const HeadBar = ({ toggleTheme, theme }) => {
    const [checked, setChecked] = (0, react_1.useState)(false);
    // Toggle theme (light/dark)
    const handleToggle = () => {
        toggleTheme();
        setChecked(prev => !prev);
    };
    return (react_1.default.createElement("div", { className: "navbar bg-secondary flex-row justify-between shadow-inner shadow-md" },
        react_1.default.createElement("a", { className: "btn btn-ghost normal-case text-xl" }, "nimbus"),
        react_1.default.createElement("div", { className: "form-control" },
            react_1.default.createElement("label", { className: "label cursor-pointer" },
                react_1.default.createElement("span", { className: "label-text" }, theme === 'myThemeDark' ? 'Light' : 'Dark'),
                react_1.default.createElement("input", { type: "checkbox", className: "toggle ml-2", checked: checked, onClick: handleToggle })))));
};
exports.default = HeadBar;
