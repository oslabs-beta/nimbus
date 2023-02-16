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
const Register = ({ swapAuthView, handleUserLogin }) => {
    const [email, setEmail] = (0, react_1.useState)('');
    const [firstName, setFirstName] = (0, react_1.useState)('');
    const [lastName, setLastName] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [confirmation, setConfirmation] = (0, react_1.useState)('');
    const [arn, setArn] = (0, react_1.useState)('');
    const [region, setRegion] = (0, react_1.useState)('');
    const [errorMessage, setErrorMessage] = (0, react_1.useState)('');
    const [errors, setErrors] = (0, react_1.useState)({ email: false, firstName: false, lastName: false, password: false, confirmation: false, arn: false });
    // Update state when user types email, password etc.
    const updateEmail = (e) => {
        setEmail(e.target.value);
    };
    const updateFirstName = (e) => {
        setFirstName(e.target.value);
    };
    const updateLastName = (e) => {
        setLastName(e.target.value);
    };
    const updatePassword = (e) => {
        setPassword(e.target.value);
    };
    const updateConfirmation = (e) => {
        setConfirmation(e.target.value);
    };
    const updateArn = (e) => {
        setArn(e.target.value);
    };
    const updateRegion = (e) => {
        setRegion(e.target.value);
    };
    // Hnadle wrong user input
    const handleError = () => {
        setErrorMessage('Some information is missing or incorrect');
    };
    // Update errors object
    const updateErrors = (errors) => {
        const errorObj = { email: false, firstName: false, lastName: false, password: false, confirmation: false, arn: false };
        errors.forEach((el) => {
            errorObj[el] = true;
        });
        setErrors(errorObj);
    };
    // Send user credentials to server and receive access and refresh tokens
    const submitForm = (e) => {
        e.preventDefault();
        const userData = {
            email,
            firstName,
            lastName,
            password,
            confirmation,
            arn,
            region,
        };
        console.log('user data from front end ', userData);
        fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'Application/JSON' },
            body: JSON.stringify(userData),
        })
            .then((res) => res.json())
            .then((result) => {
            console.log('email form login:', result);
            if (result.errMessage) {
                handleError();
                updateErrors(result.errors);
            }
            else {
                console.log('user info:', result);
                handleUserLogin();
                // Save access token to local storage
                localStorage.setItem('accessToken', result.accessToken);
            }
        });
    };
    // List of AWS regions
    const regionsOptions = [
        'us-east-2',
        'us-east-1',
        'us-west-1',
        'us-west-2',
        'af-south-1',
        'ap-east-1',
        'ap-south-2',
        'ap-southeast-3',
        'ap-south-1',
        'ap-northeast-3',
        'ap-northeast-2',
        'ap-southeast-1',
        'ap-southeast-2',
        'ap-northeast-1',
        'ca-central-1',
        'eu-central-1',
        'eu-west-1',
        'eu-west-2',
        'eu-south-1',
        'eu-west-3',
        'eu-south-2',
        'eu-north-1',
        'eu-central-2',
        'me-south-1',
        'me-central-1',
        'sa-east-1',
        'us-gov-east-1',
        'us-gov-west-1',
    ];
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("form", { onSubmit: submitForm },
            react_1.default.createElement("div", { className: "hero-content items-stretch flex-col lg:flex-row px-12 py-12" },
                react_1.default.createElement("div", { className: "card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100" },
                    react_1.default.createElement("div", { className: 'card-body' },
                        react_1.default.createElement("h3", { className: "text-center font-bold text-primary text-xl mb-1" }, "Register"),
                        react_1.default.createElement("div", { className: "form-control" },
                            react_1.default.createElement("label", { htmlFor: 'email', className: "label" },
                                react_1.default.createElement("span", { className: "label-text" }, "Email")),
                            react_1.default.createElement("input", { type: 'text', id: 'email', name: 'email', onChange: updateEmail, className: errors.email ? "input input-bordered input-error" : "input input-bordered" })),
                        react_1.default.createElement("div", { className: "form-control" },
                            react_1.default.createElement("label", { htmlFor: 'firstName', className: "label" },
                                react_1.default.createElement("span", { className: "label-text" }, "First Name")),
                            react_1.default.createElement("input", { type: 'text', id: 'firstName', name: 'firstName', onChange: updateFirstName, className: errors.firstName ? "input input-bordered input-error" : "input input-bordered" })),
                        react_1.default.createElement("div", { className: "form-control" },
                            react_1.default.createElement("label", { htmlFor: 'lastName', className: "label" },
                                react_1.default.createElement("span", { className: "label-text" }, "Last Name")),
                            react_1.default.createElement("input", { type: 'text', id: 'lastName', name: 'lastName', onChange: updateLastName, className: errors.lastName ? "input input-bordered input-error" : "input input-bordered" })),
                        react_1.default.createElement("div", { className: "form-control" },
                            react_1.default.createElement("label", { htmlFor: 'password', className: "label" },
                                react_1.default.createElement("span", { className: "label-text" }, "Password")),
                            react_1.default.createElement("input", { type: 'password', id: 'password', name: 'password', onChange: updatePassword, className: errors.password ? "input input-bordered input-error" : "input input-bordered" })),
                        react_1.default.createElement("div", { className: "form-control" },
                            react_1.default.createElement("label", { htmlFor: 'confirmation', className: "label" },
                                react_1.default.createElement("span", { className: "label-text" }, "Confirm Password")),
                            react_1.default.createElement("input", { type: 'password', id: 'confirmation', name: 'confirmation', onChange: updateConfirmation, className: errors.confirmation ? "input input-bordered input-error" : "input input-bordered" })))),
                react_1.default.createElement("div", { className: 'card flex-shrink-0 w-full max-w-md lg:max-w-xl shadow-2xl bg-base-100' },
                    react_1.default.createElement("div", { className: 'card-body' },
                        react_1.default.createElement("div", { className: '' },
                            react_1.default.createElement("h3", { className: "text-center font-bold text-primary text-xl mb-3" }, "Connect Your AWS Account"),
                            react_1.default.createElement("p", { className: "mb-2" },
                                "Please follow the steps below to set up the connection to your AWS account. Click",
                                ' ',
                                react_1.default.createElement("a", { target: '_blank', href: 'https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?templateURL=https://cf-templates-htl66jverox0-us-east-1.s3.amazonaws.com/2023-01-03T001457.540Zd6i-nimbus-new.yaml&stackName=Nimbus-Stack', className: 'text-accent underline underline-offset-2 hover:text-secondary' }, "HERE"),
                                ' ',
                                "to start the process."),
                            react_1.default.createElement("ul", { className: 'list-decimal px-5' },
                                react_1.default.createElement("li", { className: "text-sm" }, "Log into your AWS account."),
                                react_1.default.createElement("li", { className: "text-sm" }, "You will be directed to a Create Stack page with a pre-populated Nimbus stack template and details."),
                                react_1.default.createElement("li", { className: "text-sm" }, "At the bottom of the page, please make sure you check \u201CI acknowledge that AWS CloudFormation might create IAM resources with custom names.\u201D"),
                                react_1.default.createElement("li", { className: "text-sm" }, "Click \u201CCreate Stack\u201D to generate a Nimbus stack under your AWS CloudFormation."),
                                react_1.default.createElement("li", { className: "text-sm" }, "When the stack creation completes, navigate to the \u201COutputs\u201D tab and copy the Nimbus ARN value (e.g. arn:aws:iam::00000000000:role/NimbusDelegationRole)."),
                                react_1.default.createElement("li", { className: "text-sm" }, "Paste the ARN value onto the corresponding sign-up field."))),
                        react_1.default.createElement("div", { className: "form-control" },
                            react_1.default.createElement("label", { htmlFor: 'arn', className: 'label' },
                                react_1.default.createElement("span", { className: "label-text" }, "ARN")),
                            react_1.default.createElement("input", { type: 'text', id: 'arn', name: 'arn', onChange: updateArn, className: errors.email ? "input input-bordered input-secondary input-error" : "input input-bordered input-secondary " })),
                        react_1.default.createElement("div", { className: "form-control" },
                            react_1.default.createElement("select", { onChange: updateRegion, value: region, className: "select select-secondary w-full" },
                                react_1.default.createElement("option", { value: '' }, "Select AWS region"),
                                regionsOptions.map((item, idx) => (react_1.default.createElement("option", { key: `region-${idx}`, value: item }, item))))),
                        react_1.default.createElement("div", { className: "form-control" },
                            react_1.default.createElement("input", { type: 'submit', value: 'Submit', className: "btn btn-primary" })),
                        react_1.default.createElement("button", { onClick: swapAuthView, className: "underline underline-offset-2 text-base-300" }, "Switch to Login"))),
                (errorMessage !== '')
                    &&
                        react_1.default.createElement("div", { className: "alert alert-error shadow-lg fixed bottom-0 mt-1" },
                            react_1.default.createElement("div", null,
                                react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "stroke-current flex-shrink-0 h-6 w-6", fill: "none", viewBox: "0 0 24 24" },
                                    react_1.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" })),
                                react_1.default.createElement("span", null, errorMessage)))))));
};
exports.default = Register;
