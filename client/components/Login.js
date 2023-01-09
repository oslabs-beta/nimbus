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
// Login component
const Login = ({ swapAuthView, handleUserLogin }) => {
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
    // Send user credentials to server and receive access and refresh tokens
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
                // Save tokens to local storage
                localStorage.setItem("accessToken", result.accessToken);
                localStorage.setItem("refreshToken", result.refreshToken);
            }
        });
    };
    return (react_1.default.createElement("div", { className: "hero-content flex-col lg:flex-row-reverse px-12" },
        react_1.default.createElement("div", { className: "text-center lg:text-left lg:ml-5" },
            react_1.default.createElement("h1", { className: "text-5xl font-bold" }, "Login now!"),
            react_1.default.createElement("p", { className: "py-6" }, "Welcome to nimbus, the ultimate monitoring and visualization tool for AWS Lambda.")),
        react_1.default.createElement("div", { className: "card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100" },
            react_1.default.createElement("div", { className: "card-body" },
                react_1.default.createElement("form", { onSubmit: submitForm },
                    react_1.default.createElement("div", { className: "form-control" },
                        react_1.default.createElement("label", { htmlFor: "email", className: "label" },
                            react_1.default.createElement("span", { className: "label-text" }, "Email")),
                        react_1.default.createElement("input", { type: "text", id: "email", name: "email", onChange: updateEmail, className: "input input-bordered" })),
                    react_1.default.createElement("div", { className: "form-control" },
                        react_1.default.createElement("label", { htmlFor: "password", className: "label" },
                            react_1.default.createElement("span", { className: "label-text" }, "Password")),
                        react_1.default.createElement("input", { type: "password", id: "password", name: "password", onChange: updatePassword, className: "input input-bordered" })),
                    react_1.default.createElement("div", { className: "form-control" },
                        react_1.default.createElement("input", { type: "submit", value: "Submit", className: "btn btn-primary mt-5" }))),
                react_1.default.createElement("button", { className: "btn btn-outline btn-secondary", onClick: swapAuthView }, "Register"))),
        (errorMessage !== '')
            &&
                react_1.default.createElement("div", { className: "alert alert-error shadow-lg fixed bottom-0 mt-1" },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "stroke-current flex-shrink-0 h-6 w-6", fill: "none", viewBox: "0 0 24 24" },
                            react_1.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" })),
                        react_1.default.createElement("span", null, errorMessage)))));
};
exports.default = Login;
