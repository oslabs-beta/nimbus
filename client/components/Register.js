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
const Register = ({ swapAuthView }) => {
    // const [username, setUsername] = useState("");
    const [email, setEmail] = (0, react_1.useState)("");
    const [firstName, setFirstName] = (0, react_1.useState)("");
    const [lastName, setLastName] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [confirmation, setConfirmation] = (0, react_1.useState)("");
    const [errorMessage, setErrorMessage] = (0, react_1.useState)("");
    // Update state when user types email, password etc.
    const updateEmail = (e) => {
        setEmail(e.target.value);
        console.log(email);
    };
    const updateFirstName = (e) => {
        setFirstName(e.target.value);
        console.log(email);
    };
    const updateLastName = (e) => {
        setLastName(e.target.value);
        console.log(password);
    };
    const updatePassword = (e) => {
        setPassword(e.target.value);
        console.log(password);
    };
    const updateConfirmation = (e) => {
        setConfirmation(e.target.value);
        console.log(password);
    };
    // Hnadle wrong user input
    const handleError = () => {
        setErrorMessage("Some information is missing or incorrect");
    };
    const highlightInput = (errors) => {
        errors.forEach(el => {
            const input = document.querySelector(`#${el}`);
            if (input) {
                input.style.borderColor = 'red';
            }
        });
    };
    // Handle form sumbission
    const submitForm = (e) => {
        e.preventDefault();
        const userData = {
            email,
            firstName,
            lastName,
            password,
            confirmation
        };
        console.log("user data from front end ", userData);
        const errors = [];
        // for (const el in userData){
        //   if (userData[el as keyof UserData].length === 0) {
        //     errors.push(el)
        //   }
        // }
        // if (errors.length > 0) {
        //   handleError();
        //   highlightInput(errors);
        // }
        fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'Application/JSON' },
            body: JSON.stringify(userData),
        })
            .then(res => res.json())
            .then((result) => {
            console.log('email form login:', result);
            if (result.errMessage) {
                handleError();
                highlightInput(result.errors);
            }
            else {
                console.log('user info:', result);
            }
        });
    };
    return (react_1.default.createElement("div", null,
        "Register",
        react_1.default.createElement("form", { onSubmit: submitForm },
            react_1.default.createElement("label", { htmlFor: "email" }, "Email"),
            react_1.default.createElement("br", null),
            react_1.default.createElement("input", { type: "text", id: "email", name: "email", onChange: updateEmail }),
            react_1.default.createElement("br", null),
            react_1.default.createElement("label", { htmlFor: "firstName" }, "First name"),
            react_1.default.createElement("br", null),
            react_1.default.createElement("input", { type: "text", id: "firstName", name: "firstName", onChange: updateFirstName }),
            react_1.default.createElement("br", null),
            react_1.default.createElement("label", { htmlFor: "lastName" }, "Last name"),
            react_1.default.createElement("br", null),
            react_1.default.createElement("input", { type: "text", id: "lastName", name: "lastName", onChange: updateLastName }),
            react_1.default.createElement("br", null),
            react_1.default.createElement("label", { htmlFor: "password" }, "Password"),
            react_1.default.createElement("br", null),
            react_1.default.createElement("input", { type: "text", id: "password", name: "password", onChange: updatePassword }),
            react_1.default.createElement("br", null),
            react_1.default.createElement("label", { htmlFor: "confirmation" }, "Confirm password"),
            react_1.default.createElement("br", null),
            react_1.default.createElement("input", { type: "text", id: "confirmation", name: "confirmation", onChange: updateConfirmation }),
            react_1.default.createElement("br", null),
            react_1.default.createElement("input", { type: "submit", value: "Submit" })),
        react_1.default.createElement("div", { className: "errorMessage" }, errorMessage),
        react_1.default.createElement("button", { onClick: swapAuthView }, "Login")));
};
exports.default = Register;
