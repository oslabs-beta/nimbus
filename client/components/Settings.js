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
    const routes = {
        userDetails: '/dashboard/userDetails',
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
    const submitForm = () => {
    };
    return (react_1.default.createElement("div", null,
        "Settings",
        react_1.default.createElement("form", { onSubmit: submitForm },
            react_1.default.createElement("label", { htmlFor: 'email' }, "Email"),
            react_1.default.createElement("br", null),
            react_1.default.createElement("input", { type: 'text', id: 'email', name: 'email', onChange: updateEmail, value: email }),
            react_1.default.createElement("br", null),
            react_1.default.createElement("label", { htmlFor: 'firstName' }, "First name"),
            react_1.default.createElement("br", null),
            react_1.default.createElement("input", { type: 'text', id: 'firstName', name: 'firstName', onChange: updateFirstName, value: firstName }),
            react_1.default.createElement("br", null),
            react_1.default.createElement("label", { htmlFor: 'lastName' }, "Last name"),
            react_1.default.createElement("br", null),
            react_1.default.createElement("input", { type: 'text', id: 'lastName', name: 'lastName', onChange: updateLastName, value: lastName }),
            react_1.default.createElement("br", null),
            react_1.default.createElement("label", { htmlFor: 'password' }, "Update Password"),
            react_1.default.createElement("br", null),
            react_1.default.createElement("input", { type: 'password', id: 'password', name: 'password', onChange: updatePassword }),
            react_1.default.createElement("br", null),
            react_1.default.createElement("label", { htmlFor: 'confirmation' }, "Confirm password"),
            react_1.default.createElement("br", null),
            react_1.default.createElement("input", { type: 'password', id: 'confirmation', name: 'confirmation', onChange: updateConfirmation }),
            react_1.default.createElement("br", null),
            react_1.default.createElement("div", null,
                react_1.default.createElement("label", { htmlFor: 'arn' }, "ARN"),
                react_1.default.createElement("br", null),
                react_1.default.createElement("input", { type: 'text', id: 'arn', name: 'arn', onChange: updateArn, value: arn }),
                react_1.default.createElement("br", null),
                react_1.default.createElement("select", { onChange: updateRegion, value: region },
                    react_1.default.createElement("option", { value: '' }, region),
                    filteredRegionsOptions.map((item, idx) => (react_1.default.createElement("option", { key: `region-${idx}`, value: item }, item))))),
            react_1.default.createElement("br", null),
            react_1.default.createElement("input", { type: 'submit', value: 'Save' })),
        react_1.default.createElement("div", { className: 'errorMessage' }, errorMessage)));
};
exports.default = Settings;
