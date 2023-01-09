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
const Settings = (props) => {
    const [errorMessage, setErrorMessage] = (0, react_1.useState)('');
    const [successMessage, setSuccessMessage] = (0, react_1.useState)('');
    // Create refs for password and confirmation
    const passwordRef = (0, react_1.useRef)();
    const confirmationRef = (0, react_1.useRef)();
    // Store routes in object
    const routes = {
        updateProfile: '/dashboard/updateProfile',
        updatePassword: '/dashboard/updatePassword'
    };
    // Update state on change
    const updateFirstName = (e) => {
        props.setFirstName(e.target.value);
    };
    const updateLastName = (e) => {
        props.setLastName(e.target.value);
    };
    const updatePassword = (e) => {
        props.setPassword(e.target.value);
    };
    const updateConfirmation = (e) => {
        props.setConfirmation(e.target.value);
    };
    const updateArn = (e) => {
        props.setArn(e.target.value);
    };
    const updateRegion = (e) => {
        props.setRegion(e.target.value);
    };
    // Reset password fields
    const resetPasswords = () => {
        passwordRef.current.value = "";
        confirmationRef.current.value = "";
    };
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
    const filteredRegionsOptions = regionsOptions.filter(r => r !== props.region);
    // Set error and success messages
    const handleError = () => {
        setErrorMessage('Some information is missing or incorrect!');
    };
    const handleSuccess = () => {
        setSuccessMessage('Your profile details are updated successfully!');
    };
    const handlePasswordSuccess = () => {
        setSuccessMessage('Password updated successfully');
    };
    // Highlight erroneusly filled fields in red
    const highlightInput = (errors) => {
        errors.forEach((el) => {
            const input = document.querySelector(`#${el}`);
            if (input) {
                input.style.borderColor = 'red';
            }
        });
    };
    // Update profile
    const submitProfileForm = (e) => {
        e.preventDefault();
        const updatedProfileData = {
            firstName: props.firstName,
            lastName: props.lastName,
            arn: props.arn,
            region: props.region,
        };
        fetch(routes.updateProfile, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON',
                authorization: `BEARER ${localStorage.getItem('accessToken')}`,
                // refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
            },
            body: JSON.stringify(updatedProfileData),
        }).then(res => res.json())
            .then((result) => {
            if (result.errMessage) {
                handleError();
                highlightInput(result.errors);
            }
            else {
                handleSuccess();
                props.setFirstName(result.firstName);
                props.setLastName(result.lastName);
                props.setArn(result.arn);
                props.setRegion(result.region);
            }
        });
    };
    // Update password
    const submitPasswordForm = (e) => {
        e.preventDefault();
        const updatedPasswordData = {
            password: props.password,
            confirmation: props.confirmation
        };
        fetch(routes.updatePassword, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON',
                authorization: `BEARER ${localStorage.getItem('accessToken')}`,
                // refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
            },
            body: JSON.stringify(updatedPasswordData),
        }).then(res => res.json())
            .then((result) => {
            if (result.errMessage) {
                handleError();
                highlightInput(result.errors);
            }
            else if (result.successMessage) {
                handlePasswordSuccess();
                props.setPassword('');
                props.setConfirmation('');
                resetPasswords();
            }
        });
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: 'flex flex-col lg:flex-row w-full mb-24' },
            react_1.default.createElement("div", { className: "lg:basis-1/2 lg:pl-20 lg:pr-8 px-20 mb-8" },
                react_1.default.createElement("h3", { className: "text-xl text-base-300 text-center font-bold" }, "Profile"),
                react_1.default.createElement("form", { onSubmit: submitProfileForm },
                    react_1.default.createElement("div", { className: "form-control" },
                        react_1.default.createElement("label", { htmlFor: 'firstName', className: "label" },
                            react_1.default.createElement("span", { className: "label-text" }, "First Name")),
                        react_1.default.createElement("input", { type: 'text', id: 'firstName', name: 'firstName', onChange: updateFirstName, value: props.firstName, className: "input input-bordered" })),
                    react_1.default.createElement("div", { className: "form-control" },
                        react_1.default.createElement("label", { htmlFor: 'lastName', className: "label" },
                            react_1.default.createElement("span", { className: "label-text" }, "Last Name")),
                        react_1.default.createElement("input", { type: 'text', id: 'lastName', name: 'lastName', onChange: updateLastName, value: props.lastName, className: "input input-bordered" })),
                    react_1.default.createElement("div", { className: "form-control" },
                        react_1.default.createElement("label", { htmlFor: 'arn', className: "label" },
                            react_1.default.createElement("span", { className: "label-text" }, "ARN")),
                        react_1.default.createElement("input", { type: 'text', id: 'arn', name: 'arn', onChange: updateArn, value: props.arn, className: "input input-bordered" })),
                    react_1.default.createElement("div", { className: 'form-control' },
                        react_1.default.createElement("label", { htmlFor: 'region', className: "label" },
                            react_1.default.createElement("span", { className: "label-text" }, "Region")),
                        react_1.default.createElement("select", { onChange: updateRegion, value: props.region, className: "select select-secondary w-full" },
                            react_1.default.createElement("option", { value: props.region }, props.region),
                            filteredRegionsOptions.map((item, idx) => (react_1.default.createElement("option", { key: `region-${idx}`, value: item }, item))))),
                    react_1.default.createElement("div", { className: "form-control" },
                        react_1.default.createElement("input", { type: 'submit', value: 'Save', className: "btn btn-primary mt-4" })))),
            react_1.default.createElement("div", { className: "lg:basis-1/2 lg:pl-8 lg:pr-20 px-20" },
                react_1.default.createElement("h3", { className: "text-xl text-base-300 text-center font-bold" }, "Login Details"),
                react_1.default.createElement("form", { onSubmit: submitPasswordForm },
                    react_1.default.createElement("div", { className: 'form-control' },
                        react_1.default.createElement("label", { htmlFor: 'email', className: "label" },
                            react_1.default.createElement("span", { className: "label-text" }, "Email")),
                        react_1.default.createElement("input", { type: 'text', id: 'email', name: 'email', value: props.email, disabled: true, className: "input input-bordered disabled:bg-neutral-800 disabled:text-slate-400" })),
                    react_1.default.createElement("div", { className: 'form-control' },
                        react_1.default.createElement("label", { htmlFor: 'password', className: "label" },
                            react_1.default.createElement("span", { className: "label-text" }, "Update Password")),
                        react_1.default.createElement("input", { type: 'password', id: 'password', name: 'password', onChange: updatePassword, ref: passwordRef, className: "input input-bordered" })),
                    react_1.default.createElement("div", { className: 'form-control' },
                        react_1.default.createElement("label", { htmlFor: 'confirmation', className: "label" },
                            react_1.default.createElement("span", { className: "label-text" }, "Confirm Password")),
                        react_1.default.createElement("input", { type: 'password', id: 'confirmation', name: 'confirmation', onChange: updateConfirmation, ref: confirmationRef, className: "input input-bordered" })),
                    react_1.default.createElement("div", { className: 'form-control' },
                        react_1.default.createElement("input", { type: 'submit', value: 'Save', className: "btn btn-primary mt-4" }))))),
        successMessage !== ''
            &&
                react_1.default.createElement("div", { className: "alert alert-success shadow-lg fixed bottom-0 mt-1 self-start w-full" },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "stroke-current flex-shrink-0 h-6 w-6", fill: "none", viewBox: "0 0 24 24" },
                            react_1.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" })),
                        react_1.default.createElement("span", null, successMessage))),
        (errorMessage !== '' && successMessage === '')
            &&
                react_1.default.createElement("div", { className: "alert alert-error shadow-lg fixed bottom-0 mt-1 self-start w-full" },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "stroke-current flex-shrink-0 h-6 w-6", fill: "none", viewBox: "0 0 24 24" },
                            react_1.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" })),
                        react_1.default.createElement("span", null, errorMessage)))));
};
exports.default = Settings;
