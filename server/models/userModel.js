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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
// load any environment variables from a .env file 
dotenv.config();
// const { MONGO_URI } = process.env
// access mongoURI from our secure file 
const mongoURI = process.env.MONGO_URI;
// check if mongoose is connected to MongoDB
mongoose_1.default.connect(mongoURI)
    .then(() => console.log('Connected to Mongo DB.'))
    .catch(err => console.log(err));
// extract out Schema constructor from mongoose so we can create a new instance of a Schema
const Schema = mongoose_1.default.Schema;
// Create a new instance of a User Schema
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    ssid: {
        type: String,
        // Probably won't be required
        // required: true
    },
    arn: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    }
});
// create a User model constructor using the UserSchmea we defined above 
const User = mongoose_1.default.model('User', UserSchema);
// make User model constructor public to all files in our app
module.exports = User;
