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
const Login = ({ swapAuthView, handleUserLogin }) => {
    // const [username, setUsername] = useState("");
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [errorMessage, setErrorMessage] = (0, react_1.useState)("");
    // Update state when user types email or password
    const updateEmail = (e) => {
        setEmail(e.target.value);
    };
    const updatePassword = (e) => {
        setPassword(e.target.value);
    };
    // Hnadle wrong user input
    const handleError = (err) => {
        setErrorMessage(err);
    };
    const submitForm = (e) => {
        e.preventDefault();
        const credentials = {
            email,
            password
        };
        console.log(credentials);
        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'Application/JSON' },
            body: JSON.stringify(credentials),
        })
            .then(res => res.json())
            .then((result) => {
            if (result.err) {
                handleError('Wrong username or password');
            }
            else {
                console.log('user info:', result);
                handleUserLogin();
                localStorage.setItem("accessToken", result.accessToken);
                localStorage.setItem("refreshToken", result.refreshToken);
            }
        });
    };
    return (react_1.default.createElement("div", null,
        "Login",
        react_1.default.createElement("form", { onSubmit: submitForm },
            react_1.default.createElement("label", { htmlFor: "email" }, "Email"),
            react_1.default.createElement("br", null),
            react_1.default.createElement("input", { type: "text", id: "email", name: "email", onChange: updateEmail }),
            react_1.default.createElement("br", null),
            react_1.default.createElement("label", { htmlFor: "password" }, "Password"),
            react_1.default.createElement("br", null),
            react_1.default.createElement("input", { type: "password", id: "password", name: "password", onChange: updatePassword }),
            react_1.default.createElement("br", null),
            react_1.default.createElement("input", { type: "submit", value: "Submit" })),
        react_1.default.createElement("div", { className: "errorMessage" }, errorMessage),
        react_1.default.createElement("button", { onClick: swapAuthView }, "Register")));
};
exports.default = Login;
