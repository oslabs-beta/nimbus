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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Settings = () => {
    const [email, setEmail] = (0, react_1.useState)('');
    const [firstName, setFirstName] = (0, react_1.useState)('AAA');
    const [lastName, setLastName] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [confirmation, setConfirmation] = (0, react_1.useState)('');
    const [arn, setArn] = (0, react_1.useState)('');
    const [region, setRegion] = (0, react_1.useState)('');
    const [errorMessage, setErrorMessage] = (0, react_1.useState)('');
    const [successMessage, setSuccessMessage] = (0, react_1.useState)('');
    const passwordRef = (0, react_1.useRef)();
    const confirmationRef = (0, react_1.useRef)();
    const routes = {
        userDetails: '/dashboard/userDetails',
        updateProfile: '/dashboard/updateProfile',
        updatePassword: '/dashboard/updatePassword'
    };
    const getUserDetails = () => __awaiter(void 0, void 0, void 0, function* () {
        let res;
        try {
            res = yield fetch(`${routes.userDetails}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/JSON',
                    authorization: `BEARER ${localStorage.getItem('accessToken')}`,
                    refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
                },
            });
            // convert response to JS object
            res = yield res.json();
            setEmail(res.email);
            setFirstName(res.firstName);
            setLastName(res.lastName);
            setArn(res.arn);
            setRegion(res.region);
        }
        catch (err) {
            console.log(err);
        }
    });
    (0, react_1.useEffect)(() => {
        getUserDetails();
    }, []);
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
    const filteredRegionsOptions = regionsOptions.filter(r => r !== region);
    const handleError = () => {
        setErrorMessage('Some information is missing or incorrect');
    };
    const handleSuccess = () => {
        setSuccessMessage('Your profile details are updated successfully');
    };
    const handlePasswordSuccess = () => {
        setSuccessMessage('Password updated successfully');
    };
    const highlightInput = (errors) => {
        errors.forEach((el) => {
            const input = document.querySelector(`#${el}`);
            if (input) {
                input.style.borderColor = 'red';
            }
        });
    };
    const submitProfileForm = (e) => {
        e.preventDefault();
        const updatedProfileData = {
            firstName,
            lastName,
            arn,
            region,
        };
        fetch(routes.updateProfile, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON',
                authorization: `BEARER ${localStorage.getItem('accessToken')}`,
                refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
            },
            body: JSON.stringify(updatedProfileData),
        }).then(res => res.json())
            .then((result) => {
            console.log('email form login:', result);
            if (result.errMessage) {
                handleError();
                highlightInput(result.errors);
            }
            else {
                console.log('user info:', result);
                handleSuccess();
                setFirstName(result.firstName);
                setLastName(result.lastName);
                setArn(result.arn);
                setRegion(result.region);
            }
        });
    };
    const submitPasswordForm = (e) => {
        e.preventDefault();
        const updatedPasswordData = {
            password,
            confirmation
        };
        fetch(routes.updatePassword, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON',
                authorization: `BEARER ${localStorage.getItem('accessToken')}`,
                refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
            },
            body: JSON.stringify(updatedPasswordData),
        }).then(res => res.json())
            .then((result) => {
            console.log('email form login:', result);
            if (result.errMessage) {
                handleError();
                highlightInput(result.errors);
            }
            else if (result.successMessage) {
                handlePasswordSuccess();
                setPassword('');
                setConfirmation('');
                resetPasswords();
            }
        });
    };
    return (react_1.default.createElement("div", null,
        "Settings",
        react_1.default.createElement("h3", null, "Profile"),
        react_1.default.createElement("form", { onSubmit: submitProfileForm },
            react_1.default.createElement("label", { htmlFor: 'firstName' }, "First name"),
            react_1.default.createElement("br", null),
            react_1.default.createElement("input", { type: 'text', id: 'firstName', name: 'firstName', onChange: updateFirstName, value: firstName }),
            react_1.default.createElement("br", null),
            react_1.default.createElement("label", { htmlFor: 'lastName' }, "Last name"),
            react_1.default.createElement("br", null),
            react_1.default.createElement("input", { type: 'text', id: 'lastName', name: 'lastName', onChange: updateLastName, value: lastName }),
            react_1.default.createElement("br", null),
            react_1.default.createElement("div", null,
                react_1.default.createElement("label", { htmlFor: 'arn' }, "ARN"),
                react_1.default.createElement("br", null),
                react_1.default.createElement("input", { type: 'text', id: 'arn', name: 'arn', onChange: updateArn, value: arn }),
                react_1.default.createElement("br", null),
                react_1.default.createElement("select", { onChange: updateRegion, value: region },
                    react_1.default.createElement("option", { value: region }, region),
                    filteredRegionsOptions.map((item, idx) => (react_1.default.createElement("option", { key: `region-${idx}`, value: item }, item))))),
            react_1.default.createElement("br", null),
            react_1.default.createElement("input", { type: 'submit', value: 'Save' })),
        react_1.default.createElement("h3", null, "Login Details"),
        react_1.default.createElement("form", { onSubmit: submitPasswordForm },
            react_1.default.createElement("label", { htmlFor: 'email' }, "Email"),
            react_1.default.createElement("br", null),
            react_1.default.createElement("input", { type: 'text', id: 'email', name: 'email', value: email, disabled: true }),
            react_1.default.createElement("br", null),
            react_1.default.createElement("label", { htmlFor: 'password' }, "Update Password"),
            react_1.default.createElement("br", null),
            react_1.default.createElement("input", { type: 'password', id: 'password', name: 'password', onChange: updatePassword, ref: passwordRef }),
            react_1.default.createElement("br", null),
            react_1.default.createElement("label", { htmlFor: 'confirmation' }, "Confirm Password"),
            react_1.default.createElement("br", null),
            react_1.default.createElement("input", { type: 'password', id: 'confirmation', name: 'confirmation', onChange: updateConfirmation, ref: confirmationRef }),
            react_1.default.createElement("br", null),
            react_1.default.createElement("br", null),
            react_1.default.createElement("input", { type: 'submit', value: 'Save' })),
        react_1.default.createElement("div", { className: 'errorMessage' }, errorMessage),
        react_1.default.createElement("div", { className: 'errorMessage' }, successMessage)));
};
exports.default = Settings;
