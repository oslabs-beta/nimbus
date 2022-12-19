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
    // const [username, setUsername] = useState("");
    const [email, setEmail] = (0, react_1.useState)("");
    const [firstName, setFirstName] = (0, react_1.useState)("");
    const [lastName, setLastName] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [confirmation, setConfirmation] = (0, react_1.useState)("");
    const [arn, setArn] = (0, react_1.useState)("");
    const [region, setRegion] = (0, react_1.useState)("");
    const [errorMessage, setErrorMessage] = (0, react_1.useState)("");
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
            confirmation,
            arn,
            region
        };
        console.log("user data from front end ", userData);
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
                handleUserLogin();
                localStorage.setItem("accessToken", result.accessToken);
                localStorage.setItem("refreshToken", result.refreshToken);
            }
        });
    };
    const regionsOptions = ["us-east-2", "us-east-1", "us-west-1", "us-west-2", "af-south-1", "ap-east-1", "ap-south-2", "ap-southeast-3", "ap-south-1", "ap-northeast-3", "ap-northeast-2", "ap-southeast-1", "ap-southeast-2", "ap-northeast-1", "ca-central-1", "eu-central-1", "eu-west-1", "eu-west-2", "eu-south-1", "eu-west-3", "eu-south-2", "eu-north-1", "eu-central-2", "me-south-1", "me-central-1", "sa-east-1", "us-gov-east-1", "us-gov-west-1"];
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
            react_1.default.createElement("input", { type: "password", id: "password", name: "password", onChange: updatePassword }),
            react_1.default.createElement("br", null),
            react_1.default.createElement("label", { htmlFor: "confirmation" }, "Confirm password"),
            react_1.default.createElement("br", null),
            react_1.default.createElement("input", { type: "password", id: "confirmation", name: "confirmation", onChange: updateConfirmation }),
            react_1.default.createElement("br", null),
            react_1.default.createElement("div", null,
                react_1.default.createElement("div", null,
                    react_1.default.createElement("b", null, "Connect Your AWS Account"),
                    react_1.default.createElement("br", null),
                    "Please follow the steps below to set up the connection to your AWS account. Click ",
                    react_1.default.createElement("a", { target: "_blank", href: "https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?templateURL=https://cf-templates-fo1de99kotoi-us-east-1.s3.amazonaws.com/2022347I7Q-nimbus.yaml&stackName=NimbusStack" }, "HERE"),
                    " to start the process. Log into your AWS account.",
                    react_1.default.createElement("br", null),
                    "You will be directed to a Create Stack page with a pre-populated Nimbus stack template and details.",
                    react_1.default.createElement("br", null),
                    "At the bottom of the page, please make sure you check \u201CI acknowledge that AWS CloudFormation might create IAM resources with custom names.\u201D",
                    react_1.default.createElement("br", null),
                    "Click \u201CCreate Stack\u201D to generate a Nimbus stack under your AWS CloudFormation.",
                    react_1.default.createElement("br", null),
                    "When the stack creation completes, navigate to the \u201COutputs\u201D tab and copy the Nimbus ARN value (e.g. arn:aws:iam::00000000000:role/NimbusDelegationRole).",
                    react_1.default.createElement("br", null),
                    "Paste the ARN value onto the corresponding sign-up field."),
                react_1.default.createElement("label", { htmlFor: "arn" }, "ARN"),
                react_1.default.createElement("br", null),
                react_1.default.createElement("input", { type: "text", id: "arn", name: "arn", onChange: updateArn }),
                react_1.default.createElement("br", null),
                react_1.default.createElement("select", { onChange: updateRegion, value: region },
                    react_1.default.createElement("option", { value: "" }, "Select AWS region"),
                    regionsOptions.map((item, idx) => (react_1.default.createElement("option", { key: `region-${idx}`, value: item }, item))))),
            react_1.default.createElement("br", null),
            react_1.default.createElement("input", { type: "submit", value: "Submit" })),
        react_1.default.createElement("div", { className: "errorMessage" }, errorMessage),
        react_1.default.createElement("button", { onClick: swapAuthView }, "Login")));
};
exports.default = Register;
